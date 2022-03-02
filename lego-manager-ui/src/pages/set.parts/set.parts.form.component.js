import {useFormik} from "formik";
import {saveRequestAction} from "../../store/reducer/crud.actions";
import React, {useEffect, useState} from "react";
import {ADD_FORM_ACTION, EDIT_FORM_ACTION, SUBMIT_FORM_ACTION} from "../../constants/crud.constants";
import {Box, Stack, TextField} from "@mui/material";
import FindTextField from "../../components/fields/find.text.field.component";
import {searchPartColor} from "../../service/part.colors.service";
import {useDispatch, useSelector} from "react-redux";
import {SET_PARTS_BRANCH} from "../../constants/pages/page.constants";

const branch = SET_PARTS_BRANCH;

function SetPartsForm({setId}) {
    const dispatch = useDispatch();
    const formAction = useSelector(state => state[branch].formAction);
    const currentRow = useSelector(state => state[branch].currentRow);
    const [currentPartColorNumber, setCurrentPartColorNumber] = useState();

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

    useEffect(() => {
        if (formAction === ADD_FORM_ACTION) {
            formik.resetForm();
        } else if (formAction === EDIT_FORM_ACTION) {
            formik.setValues({
                id: currentRow.id,
                count: currentRow.count,
                partColor: {
                    id: currentRow.partColorId,
                    part: {
                        name: currentRow.partName + '(' + currentRow.colorNumber + ')'
                    }
                }
            })
            setCurrentPartColorNumber(currentRow.colorNumber);
        } else if (formAction === SUBMIT_FORM_ACTION) {
            formik.submitForm();
        }
    }, [formAction])

    const afterSearchSuccess = () => {
        document.getElementById("partsCountField").focus();
    }

    return (
        <Box>
            <Stack direction="column" spacing={2} mt={2}>
                <FindTextField label="Цвет детали" name="partColor"
                               searchFunc={searchPartColor}
                               searchParam="searchValue"
                               evalName={(res) =>
                                   res.part.name + ' (' + res.number +
                                   (res.alternateNumber ? ", " + res.alternateNumber : "")
                                   + ')'
                               }
                               itemId={formik.values.partColor.id}
                               itemName={formik.values.partColor.part.name}
                               onSelectItem={onSelectPartColor}
                               textValue={currentPartColorNumber}
                               afterSearchSuccess={afterSearchSuccess}
                               imgPath="parts"
                               autoFocus
                />
                <TextField id="partsCountField" required name="count" fullWidth label="Количество" onChange={formik.handleChange}
                           value={formik.values.count}/>
            </Stack>
        </Box>
    )
}

export default SetPartsForm;