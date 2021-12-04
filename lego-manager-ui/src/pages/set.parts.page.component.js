import {Box, Stack, TextField} from "@mui/material";
import MainTable from "../components/table/main.table.component";
import React, {useEffect, useState} from "react";
import {PAGE_CRUD_CONSTANTS, SET_PARTS_BRANCH} from "../constants/pages/page.constants";
import {useParams} from "react-router-dom";
import {
    fetchDataAction,
    setActionAnchorElAction,
    setDeleteConfirmOpenAction,
    setFormOpenAction,
    setLoadingAction
} from "../store/crud.actions";
import {getSetParts} from "../service/sets.service";
import {useSnackbar} from "notistack";
import {useDispatch, useSelector} from "react-redux";
import FindTextField from "../components/fields/find.text.field.component";
import {searchPartColor} from "../service/part.colors.service";
import {deleteSetPart, saveSetPart} from "../service/set.parts.service";

const columns = [
    {
        title: '',
        field: 'colorNumber',
        imageSource: 'parts',
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
const initFormValues = {
    id: null,
    partColor: {
        id: null,
        part: {
            name: ""
        }
    },
    count: 0
}
const branch = SET_PARTS_BRANCH;

function SetPartsPage() {
    const {setId} = useParams();
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();

    // grid
    const currentRow = useSelector(state => state[branch].currentRow);

    // crud
    const [formValues, setFormValues] = useState(initFormValues);

    const fetchData = () => {
        getSetParts({
            setId: setId,
            enqueueSnackbar,
            listError: PAGE_CRUD_CONSTANTS[branch].listError
        })
            .then(res => {
                dispatch(fetchDataAction(res, branch));
                dispatch(setLoadingAction(false, branch));
            })
            .catch(error => {
                dispatch(setLoadingAction(false, branch));
            });
    }

    useEffect(() => {
        fetchData();
    }, [])

    const onFormInput = (event) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const onSelectPartColor = (id) => {
        setFormValues({
            ...formValues,
            partColor: {
                ...formValues.partColor,
                id: id
            }
        })
    }

    const onEditAction = (event) => {
        setFormValues({
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
        setFormValues(initFormValues);
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].addFormTitle, branch));
    }

    const onSave = () => {
        saveSetPart({
            id: formValues.id,
            count: formValues.count,
            set: {id: setId},
            partColor: {id: formValues.partColor.id}
        }).then(res => {
            dispatch(setFormOpenAction(false, null, branch));
            fetchData();
        }).catch(error => {
            enqueueSnackbar(error, {variant: 'error'});
        });
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
                       onSave={onSave}
                       onDelete={onDelete}
                       rowActions={rowActions}
                       noPagination={true}>
                <Box>
                    <Stack direction="column" spacing={2} mt={2}>
                        <FindTextField label="Цвет детали" name="partColor"
                                       searchFunc={searchPartColor}
                                       searchFuncParams={{enqueueSnackbar}}
                                       searchParam="searchValue"
                                       evalName={(res) => res.part.name + '(' + res.number + ')'}
                                       itemId={formValues.partColor.id}
                                       itemName={formValues.partColor.part.name}
                                       onSelectItem={onSelectPartColor}
                        />
                        <TextField required name="count" fullWidth label="Количество" onChange={onFormInput}
                                   value={formValues.count}/>
                    </Stack>
                </Box>
            </MainTable>
        </Box>
    )
}

export default SetPartsPage;