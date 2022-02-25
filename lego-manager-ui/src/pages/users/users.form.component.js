import {useFormik} from "formik";
import {saveRequestAction} from "../../store/reducer/crud.actions";
import {useEffect} from "react";
import {ADD_FORM_ACTION, EDIT_FORM_ACTION, SUBMIT_FORM_ACTION} from "../../constants/crud.constants";
import {useDispatch, useSelector} from "react-redux";
import {Box, Stack, TextField} from "@mui/material";
import {COLORS_BRANCH, USERS_BRANCH} from "../../constants/pages/page.constants";

const branch = USERS_BRANCH;

function UsersForm() {
    const dispatch = useDispatch();
    const formAction = useSelector(state => state[branch].formAction);
    const currentRow = useSelector(state => state[branch].currentRow);

    // crud
    const formik = useFormik({
        initialValues: {
            id: null,
            name: ''
        },
        onSubmit: values => {
            dispatch(saveRequestAction({
                id: values.id,
                name: values.name
            }, branch));
            formik.setSubmitting(false);
        }
    })

    useEffect(() => {
        if (formAction === ADD_FORM_ACTION) {
            formik.resetForm();
        } else if (formAction === EDIT_FORM_ACTION) {
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