import {Box, Grid, Stack, TextField, Typography} from "@mui/material";
import MainTable from "../components/table/main.table.component";
import {saveRequestAction} from "../store/reducer/crud.actions";
import {COLORS_BRANCH} from "../constants/pages/page.constants";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import useCrudActions from "../components/action/crud.actions";

const columns = [
    {
        title: 'Название',
        field: 'name',
        sortable: true
    },
    {
        title: 'Цвет',
        field: 'hexColor',
        type: 'color',
        sortable: false
    }
]
const branch = COLORS_BRANCH;

function ColorsPage() {
    const dispatch = useDispatch();

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
    const {editAction, deleteAction} = useCrudActions({branch: branch, formik: formik});

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
                <Typography variant="h4">Цвета</Typography>
            </Grid>
            <MainTable rowActions={rowActions}
                       columns={columns}
                       branch={branch}
                       formik={formik}
            >
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