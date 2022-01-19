import {Box, Grid, Stack, TextField, Typography} from "@mui/material";
import MainTable from "../components/table/main.table.component";
import {saveRequestAction} from "../store/reducer/crud.actions";
import {COLORS_BRANCH} from "../constants/pages/page.constants";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import useCrudActions from "../components/action/crud.actions";
import {useEffect} from "react";
import {ADD_FORM_ACTION, EDIT_FORM_ACTION, SUBMIT_FORM_ACTION} from "../constants/crud.constants";

const branch = COLORS_BRANCH;

function ColorsPage() {
    const dispatch = useDispatch();
    const {editAction, deleteAction} = useCrudActions(branch);
    const formAction = useSelector(state => state[branch].formAction);
    const currentRow = useSelector(state => state[branch].currentRow);

    // crud
    const formik = useFormik({
        initialValues: {
            id: null,
            name: '',
            hexColor: ''
        },
        onSubmit: values => {
            dispatch(saveRequestAction({
                id: values.id,
                name: values.name,
                hexColor: values.hexColor
            }, branch));
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
            <Grid container alignItems="center" justifyContent="center" color={"deepskyblue"} mt={3}>
                <Typography variant="h4">Цвета</Typography>
            </Grid>
            <MainTable rowActions={[editAction, deleteAction]} branch={branch}>
                <Box>
                    <Stack direction="column" spacing={2} mt={2}>
                        <TextField required name="name" fullWidth label="Название" onChange={formik.handleChange}
                                   value={formik.values.name} autoFocus/>
                        <TextField required name="hexColor" fullWidth label="Цвет" onChange={formik.handleChange}
                                   value={formik.values.hexColor}/>
                    </Stack>
                </Box>
            </MainTable>
        </Box>
    )
}

export default ColorsPage;