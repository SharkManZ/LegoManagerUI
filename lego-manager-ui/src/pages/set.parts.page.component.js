import {Box, Stack, TextField} from "@mui/material";
import MainTable from "../components/table/main.table.component";
import React from "react";
import {LEGO_IMG_ROOT, SET_PARTS_BRANCH} from "../constants/pages/page.constants";
import {useParams} from "react-router-dom";
import {saveRequestAction} from "../store/reducer/crud.actions";
import {useSnackbar} from "notistack";
import {useDispatch} from "react-redux";
import FindTextField from "../components/fields/find.text.field.component";
import {searchPartColor} from "../service/part.colors.service";
import {useFormik} from "formik";
import useCrudActions from "../components/action/crud.actions";

const branch = SET_PARTS_BRANCH;

function SetPartsPage() {
    const {setId} = useParams();
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();

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
            dispatch(saveRequestAction({
                id: values.id,
                count: values.count,
                set: {id: setId},
                partColor: {id: values.partColor.id}
            }, branch));
        }
    })

    const onSelectPartColor = (id) => {
        formik.setValues({
            ...formik.values,
            partColor: {
                ...formik.values.partColor,
                id: id
            }
        })
    }

    const getValues = (currentRow) => {
        return {
            id: currentRow.id,
            count: currentRow.count,
            partColor: {
                id: currentRow.partColorId,
                part: {
                    name: currentRow.partName + '(' + currentRow.colorNumber + ')'
                }
            }
        };
    }
    const {editAction, deleteAction} = useCrudActions({branch: branch, formik: formik, getValues: getValues});

    const rowActions = [
        {
            title: 'Редактировать',
            onClick: editAction
        },
        {
            title: 'Удалить',
            onClick: deleteAction
        }
    ]

    return (
        <Box>
            <MainTable branch={branch}
                       formik={formik}
                       fetchRequest={{setId: setId}}
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