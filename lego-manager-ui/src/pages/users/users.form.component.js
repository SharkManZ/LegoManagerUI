import React, {useEffect} from 'react';
import {useFormik} from "formik";
import {ADD_FORM_ACTION, EDIT_FORM_ACTION, SUBMIT_FORM_ACTION} from "../../constants/crud.constants";
import {Box, Stack, TextField} from "@mui/material";
import {userApi} from "../../api/user.api";

function UsersForm({currentRow, formAction, setDialogOpen, saveCallback}) {
    const [saveUserQuery] = userApi.useSaveUserMutation();

    // crud
    const formik = useFormik({
        initialValues: {
            id: null,
            name: ''
        },
        onSubmit: values => {
            saveUserQuery({
                id: values.id,
                name: values.name
            })
                .unwrap()
                .then(() => {
                    formik.setSubmitting(false);
                    setDialogOpen(false);
                    saveCallback(true);
                });
        }
    })

    useEffect(() => {
        if (formAction === ADD_FORM_ACTION) {
            formik.resetForm();
        } else if (formAction === EDIT_FORM_ACTION) {
            formik.resetForm();
            formik.setValues(currentRow);
        } else if (formAction === SUBMIT_FORM_ACTION) {
            formik.submitForm();
        }
    }, [formAction])

    return (
        <Box>
            <Stack direction="column" spacing={2} mt={2}>
                <TextField required name="name" fullWidth label="Название" onChange={formik.handleChange}
                           value={formik.values.name} autoFocus/>
            </Stack>
        </Box>
    )
}

export default UsersForm;