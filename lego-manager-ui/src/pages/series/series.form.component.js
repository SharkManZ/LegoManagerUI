import {Box, TextField} from "@mui/material";
import {useFormik} from "formik";
import {saveRequestAction} from "../../store/reducer/crud.actions";
import {useDispatch, useSelector} from "react-redux";
import {SERIES_BRANCH} from "../../constants/pages/page.constants";
import {useEffect} from "react";
import {ADD_FORM_ACTION, EDIT_FORM_ACTION, SUBMIT_FORM_ACTION} from "../../constants/crud.constants";

const branch = SERIES_BRANCH;

function SeriesForm() {
    const dispatch = useDispatch();
    const formAction = useSelector(state => state[branch].formAction);
    const currentRow = useSelector(state => state[branch].currentRow);

    // crud
    const formik = useFormik({
        initialValues: {
            id: null,
            name: ''
        },
        onSubmit: (values => {
            console.log('saving');
            dispatch(saveRequestAction({id: values.id, name: values.name}, branch));
        })
    });

    useEffect(() => {
        if (formAction === ADD_FORM_ACTION) {
            formik.resetForm();
        } else if (formAction === EDIT_FORM_ACTION) {
            formik.setValues({
                id: currentRow.id,
                name: currentRow.name
            })
        } else if (formAction === SUBMIT_FORM_ACTION) {
            formik.submitForm();
        }
    }, [formAction])

    return (
        <Box m={2}>
            <TextField name="name" autoFocus fullWidth label="Название" onChange={formik.handleChange}
                       value={formik.values.name}/>
        </Box>
    )
}

export default SeriesForm;