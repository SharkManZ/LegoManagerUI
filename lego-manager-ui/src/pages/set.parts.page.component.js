import {Box, Stack, TextField} from "@mui/material";
import MainTable from "../components/table/main.table.component";
import React, {useEffect} from "react";
import {LEGO_IMG_ROOT, PAGE_CRUD_CONSTANTS, SET_PARTS_BRANCH} from "../constants/pages/page.constants";
import {useParams} from "react-router-dom";
import {
    fetchDataRequestAction,
    setActionAnchorElAction,
    setDeleteConfirmOpenAction,
    setFormOpenAction
} from "../store/reducer/crud.actions";
import {useSnackbar} from "notistack";
import {useDispatch, useSelector} from "react-redux";
import FindTextField from "../components/fields/find.text.field.component";
import {searchPartColor} from "../service/part.colors.service";
import {deleteSetPart, saveSetPart} from "../service/set.parts.service";
import {useFormik} from "formik";

const columns = [
    {
        title: '',
        field: 'colorNumber',
        imageSource: `${LEGO_IMG_ROOT}/parts`,
        key: 'imgKey',
        isImage: true,
        sortable: false
    },
    {
        title: 'Номер цвета детали',
        field: 'colorNumber',
        sortable: false
    },
    {
        title: 'Номер детали',
        field: 'number',
        sortable: false
    },
    {
        title: 'Название',
        field: 'partName',
        sortable: false
    },
    {
        title: 'Количество',
        field: 'count',
        sortable: false
    },
    {
        title: 'Цвет',
        field: 'hexColor',
        type: 'color',
        sortable: false
    }
]
const branch = SET_PARTS_BRANCH;

function SetPartsPage() {
    const {setId} = useParams();
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const search = useSelector(state => state[branch].search);

    // grid
    const currentRow = useSelector(state => state[branch].currentRow);

    // crud
    const formik = useFormik({
        initialValues: {
            id: null,
            partColor: {
                id: null,
                part: {
                    name: ""
                }
            },
            count: 0
        },
        onSubmit: values => {
            saveSetPart({
                id: values.id,
                count: values.count,
                set: {id: setId},
                partColor: {id: values.partColor.id}
            }).then(res => {
                dispatch(setFormOpenAction(false, null, branch));
                fetchData();
            }).catch(error => {
                enqueueSnackbar(error, {variant: 'error'});
            });
        }
    })

    const fetchData = () => {
        dispatch(fetchDataRequestAction({
            setId: setId,
            search: search,
            enqueueSnackbar,
            listError: PAGE_CRUD_CONSTANTS[branch].listError
        }, branch));
    }

    useEffect(() => {
        fetchData();
    }, [search])

    const onSelectPartColor = (id) => {
        formik.setValues({
            ...formik.values,
            partColor: {
                ...formik.values.partColor,
                id: id
            }
        })
    }

    const onEditAction = (event) => {
        formik.setValues({
            id: currentRow.id,
            count: currentRow.count,
            partColor: {
                id: currentRow.partColorId,
                part: {
                    name: currentRow.partName + '(' + currentRow.colorNumber + ')'
                }
            }
        });
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].editFormTitle, branch));
        dispatch(setActionAnchorElAction(null, branch));
    }

    const onDeleteAction = (event) => {
        dispatch(setActionAnchorElAction(null, branch));
        dispatch(setDeleteConfirmOpenAction(true, branch));
    }

    const onAdd = (event) => {
        formik.resetForm();
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].addFormTitle, branch));
    }

    const onDelete = (id) => {
        deleteSetPart({id}).then(res => {
            fetchData();
            dispatch(setDeleteConfirmOpenAction(false, branch));
        }).catch(error => {
            enqueueSnackbar(error, {variant: 'error'});
        });
    }

    const rowActions = [
        {
            title: 'Редактировать',
            onClick: onEditAction
        },
        {
            title: 'Удалить',
            onClick: onDeleteAction
        }
    ]

    return (
        <Box>
            <MainTable columns={columns} branch={branch}
                       onAdd={onAdd}
                       onSave={formik.submitForm}
                       onDelete={onDelete}
                       rowActions={rowActions}
                       noPagination={true}>
                <Box>
                    <Stack direction="column" spacing={2} mt={2}>
                        <FindTextField label="Цвет детали" name="partColor"
                                       searchFunc={searchPartColor}
                                       searchFuncParams={{enqueueSnackbar}}
                                       searchParam="searchValue"
                                       evalName={(res) =>
                                           res.part.name + ' (' + res.number +
                                           (res.alternateNumber ? ", " + res.alternateNumber : "")
                                           + ')'
                                       }
                                       itemId={formik.values.partColor.id}
                                       itemName={formik.values.partColor.part.name}
                                       onSelectItem={onSelectPartColor}
                                       autoFocus
                        />
                        <TextField required name="count" fullWidth label="Количество" onChange={formik.handleChange}
                                   value={formik.values.count}/>
                    </Stack>
                </Box>
            </MainTable>
        </Box>
    )
}

export default SetPartsPage;