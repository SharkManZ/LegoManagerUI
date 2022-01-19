import {Box, Grid, Stack, TextField, Typography} from "@mui/material";
import MainTable from "../components/table/main.table.component";
import {saveRequestAction} from "../store/reducer/crud.actions";
import {PART_CATEGORIES_BRANCH} from "../constants/pages/page.constants";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import useCrudActions from "../components/action/crud.actions";
import {useEffect} from "react";
import {ADD_FORM_ACTION, SUBMIT_FORM_ACTION} from "../constants/crud.constants";

const branch = PART_CATEGORIES_BRANCH;

function PartCategoriesPage() {
    const dispatch = useDispatch();
    const formAction = useSelector(state => state[branch].formAction);

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
        }
    })
    const {editAction, deleteAction} = useCrudActions({branch: branch, formik: formik});

    useEffect(() => {
        if (formAction === ADD_FORM_ACTION) {
            formik.resetForm();
        } else if (formAction === SUBMIT_FORM_ACTION) {
            formik.submitForm();
        }
    }, [formAction])

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
            <Grid container alignItems="center" justifyContent="center" color={"deepskyblue"} mt={3}>
                <Typography variant="h4">Категории деталей</Typography>
            </Grid>
            <MainTable rowActions={rowActions}
                       branch={branch}
            >
                <Box>
                    <Stack direction="column" spacing={2} mt={2}>
                        <TextField required name="name" fullWidth label="Название" onChange={formik.handleChange}
                                   value={formik.values.name} autoFocus/>
                    </Stack>
                </Box>
            </MainTable>
        </Box>
    )
}

export default PartCategoriesPage;