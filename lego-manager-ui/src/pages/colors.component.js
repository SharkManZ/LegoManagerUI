import {Box, Grid, Stack, TextField, Typography} from "@mui/material";
import MainTable from "../components/table/main.table.component";
import {
    saveRequestAction,
    setActionAnchorElAction,
    setDeleteConfirmOpenAction,
    setFormOpenAction
} from "../store/reducer/crud.actions";
import {COLORS_BRANCH, PAGE_CRUD_CONSTANTS} from "../constants/pages/page.constants";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import useActions from "../components/action/CrudActions";

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
    const {deleteAction} = useActions(branch);

    // grid
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

    const onEditAction = (event) => {
        formik.setValues(currentRow);
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].editFormTitle, branch));
        dispatch(setActionAnchorElAction(null, branch));
    }

    const rowActions = [
        {
            title: 'Редактировать',
            onClick: onEditAction
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