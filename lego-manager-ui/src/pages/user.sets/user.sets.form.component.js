import {Box, Stack, TextField} from "@mui/material";
import FindTextField from "../../components/fields/find.text.field.component";
import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import {ADD_FORM_ACTION, EDIT_FORM_ACTION, SUBMIT_FORM_ACTION} from "../../constants/crud.constants";
import {searchSet} from "../../service/sets.service";
import {userSetApi} from "../../api/user.sets.api";
import {useSelector} from "react-redux";

function UserSetForm({currentRow, formAction, setDialogOpen, saveCallback}) {
    const [saveUserSetQuery] = userSetApi.useSaveUserSetMutation();
    const [currentSetNumber, setCurrentSetNumber] = useState();
    const userId = useSelector(state => state.app.userId);

    const formik = useFormik({
        initialValues: {
            id: null,
            set: {
                id: null,
                name: ""
            },
            count: 0
        },
        onSubmit: values => {
            saveUserSetQuery({
                id: values.id,
                count: values.count,
                set: {id: values.set.id},
                user: {id: userId}
            })
                .unwrap()
                .then(() => {
                    formik.setSubmitting(false);
                    setDialogOpen(false);
                    saveCallback(true);
                })
        }
    })

    useEffect(() => {
        if (formAction === ADD_FORM_ACTION) {
            formik.resetForm();
        } else if (formAction === EDIT_FORM_ACTION) {
            formik.resetForm();
            formik.setValues({
                id: currentRow.id,
                count: currentRow.count,
                set: {
                    id: currentRow.set.id,
                    name: currentRow.set.name
                }
            })
            setCurrentSetNumber(currentRow.set.number);
        } else if (formAction === SUBMIT_FORM_ACTION) {
            formik.submitForm();
        }
    }, [formAction])

    const onSelectSet = (id) => {
        formik.setValues({
            ...formik.values,
            set: {
                ...formik.values.set,
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
                <FindTextField label="Набор" name="set"
                               searchFunc={searchSet}
                               searchParam="searchValue"
                               evalName={(res) =>
                                   res.name
                               }
                               itemId={formik.values.set.id}
                               itemName={formik.values.set.name}
                               onSelectItem={onSelectSet}
                               textValue={currentSetNumber}
                               afterSearchSuccess={afterSearchSuccess}
                               imgPath="sets"
                               autoFocus
                />
                <TextField id="setCountField" required name="count" fullWidth label="Количество"
                           onChange={formik.handleChange}
                           value={formik.values.count}/>
            </Stack>
        </Box>
    )
}

export default UserSetForm;