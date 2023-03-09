import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {USER_PARTS_BRANCH} from "../../constants/pages/page.constants";
import {Box, Stack, TextField} from "@mui/material";
import FindTextField from "../../components/fields/find.text.field.component";
import {useFormik} from "formik";
import {saveRequestAction} from "../../store/reducer/crud.actions";
import {ADD_FORM_ACTION, EDIT_FORM_ACTION, SUBMIT_FORM_ACTION} from "../../constants/crud.constants";
import {searchPartColor} from "../../service/part.colors.service";

const branch = USER_PARTS_BRANCH;

function UserPartForm() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.app.userId);
    const formAction = useSelector(state => state[branch].formAction);
    const currentRow = useSelector(state => state[branch].currentRow);
    const [currentPartNumber, setCurrentPartNumber] = useState();

    // crud
    const formik = useFormik({
        initialValues: {
            id: null,
            set: {
                id: null,
                name: ""
            },
            partColor: {
                id: null,
                name: ""
            },
            count: 0
        },
        onSubmit: values => {
            dispatch(saveRequestAction({
                id: values.id,
                count: values.count,
                partColor: {id: values.partColor.id},
                user: {id: currentUser}
            }, branch));
        }
    })

    useEffect(() => {
        if (formAction === ADD_FORM_ACTION) {
            formik.resetForm();
        } else if (formAction === EDIT_FORM_ACTION) {
            formik.setValues({
                id: currentRow.id,
                count: currentRow.userCount,
                partColor: {
                    id: currentRow.partColorId,
                    name: currentRow.partName
                }
            })
            setCurrentPartNumber(currentRow.colorNumber);
        } else if (formAction === SUBMIT_FORM_ACTION) {
            formik.submitForm();
        }
    }, [formAction])

    const onSelectSet = (id) => {
        formik.setValues({
            ...formik.values,
            partColor: {
                ...formik.values.partColor,
                id: id
            }
        })
    }

    const afterSearchSuccess = () => {
        document.getElementById("setCountField").focus();
    }

    return (
        <Box>
            <Stack direction="column" spacing={2} mt={2}>
                <FindTextField label="Деталь" name="set"
                               searchFunc={searchPartColor}
                               searchParam="searchValue"
                               evalName={(res) =>
                                   res.name
                               }
                               itemId={formik.values.partColor.id}
                               itemName={formik.values.partColor.name}
                               onSelectItem={onSelectSet}
                               textValue={currentPartNumber}
                               afterSearchSuccess={afterSearchSuccess}
                               imgPath="parts"
                               autoFocus
                />
                <TextField id="setCountField" required name="count" fullWidth label="Количество"
                           onChange={formik.handleChange}
                           value={formik.values.count}/>
            </Stack>
        </Box>
    )
}

export default UserPartForm;