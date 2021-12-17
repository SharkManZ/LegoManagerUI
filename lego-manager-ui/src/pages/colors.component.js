import {Box, Grid, Stack, TextField, Typography} from "@mui/material";
import MainTable from "../components/table/main.table.component";
import {
    fetchDataRequestAction,
    setActionAnchorElAction,
    setDeleteConfirmOpenAction,
    setFormOpenAction,
    setPageAction
} from "../store/reducer/crud.actions";
import {COLORS_BRANCH, PAGE_CRUD_CONSTANTS} from "../constants/pages/page.constants";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import {deleteColor, saveColor} from "../service/colors.service";
import {useFormik} from "formik";

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

    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    // grid
    const currentRow = useSelector(state => state[branch].currentRow);
    const search = useSelector(state => state[branch].search);
    const page = useSelector(state => state[branch].page);
    const rowsPerPage = useSelector(state => state[branch].rowsPerPage);
    const orderBy = useSelector(state => state[branch].orderBy);
    const orderDirection = useSelector(state => state[branch].orderDirection);

    // crud
    const formik = useFormik({
        initialValues: {
            id: null,
            name: '',
            hexColor: ''
        },
        onSubmit: values => {
            saveColor({
                id: values.id,
                name: values.name,
                hexColor: values.hexColor
            }).then(res => {
                dispatch(setPageAction(0, branch));
                dispatch(setFormOpenAction(false, null, branch));
                fetchData();
            }).catch(error => {
                enqueueSnackbar(error, {variant: 'error'});
            });
        }
    })

    // запрос данных при изменении поиска, страницы, кол-ва элементов на странице, сортировки
    useEffect(() => {
        fetchData();
    }, [search, page, rowsPerPage, orderBy, orderDirection])

    const fetchData = () => {
        dispatch(fetchDataRequestAction({
            page: page,
            rowsPerPage: rowsPerPage,
            search: search,
            orderBy: orderBy,
            orderDirection: orderDirection,
            enqueueSnackbar,
            listError: PAGE_CRUD_CONSTANTS[branch].listError
        }, branch));
    }

    const onAdd = (event) => {
        formik.resetForm();
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].addFormTitle, branch));
    }

    const onDelete = (id) => {
        deleteColor({id}).then(res => {
            fetchData();
            dispatch(setDeleteConfirmOpenAction(false, branch));
        }).catch(error => {
            enqueueSnackbar(error, {variant: 'error'});
        });
    }

    const onEditAction = (event) => {
        formik.setValues(currentRow);
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].editFormTitle, branch));
        dispatch(setActionAnchorElAction(null, branch));
    }

    const onDeleteAction = (event) => {
        dispatch(setActionAnchorElAction(null, branch));
        dispatch(setDeleteConfirmOpenAction(true, branch));
    }

    const rowActions = [
        {
            title: 'Редактировать',
            onClick: onEditAction
        },
        {
            title: 'Удалить',
            onClick: onDeleteAction
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
                       onAdd={onAdd}
                       onDelete={onDelete}
                       onSave={formik.submitForm}
            >
                <Box>
                    <Stack direction="column" spacing={2} mt={2}>
                        <TextField required name="name" fullWidth label="Название" onChange={formik.handleChange}
                                   value={formik.values.name}/>
                        <TextField required name="hexColor" fullWidth label="Цвет" onChange={formik.handleChange}
                                   value={formik.values.hexColor}/>
                    </Stack>
                </Box>
            </MainTable>
        </Box>
    )
}

export default ColorsPage;