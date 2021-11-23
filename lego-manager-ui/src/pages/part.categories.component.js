import {Box, Grid, Stack, TextField, Typography} from "@mui/material";
import MainTable from "../components/table/main.table.component";
import {
    fetchDataAction,
    setActionAnchorElAction,
    setDeleteConfirmOpenAction,
    setFormOpenAction,
    setLoadingAction,
    setPageAction,
    setTotalCountAction
} from "../store/crud.actions";
import {PAGE_CRUD_CONSTANTS, PART_CATEGORIES_BRANCH} from "../constants/pages/page.constants";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import {deletePartCategory, getPartCategories, savePartCategory} from "../service/part.categories.service";

const initFormValues = {
    id: null,
    name: ''
}
const columns = [
    {
        title: 'Название',
        field: 'name',
        sortable: true
    }
]
const branch = PART_CATEGORIES_BRANCH;

function PartCategoriesPage() {
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
    const [formValues, setFormValues] = useState(initFormValues);

    // запрос данных при изменении поиска, страницы, кол-ва элементов на странице, сортировки
    useEffect(() => {
        fetchData();
    }, [search, page, rowsPerPage, orderBy, orderDirection])

    const fetchData = () => {
        getPartCategories({
            page: page,
            rowsPerPage: rowsPerPage,
            search: search,
            orderBy: orderBy,
            orderDirection: orderDirection,
            enqueueSnackbar,
            listError: PAGE_CRUD_CONSTANTS[branch].listError
        })
            .then(res => {
                dispatch(fetchDataAction(res.data, branch));
                dispatch(setTotalCountAction(res.totalCount, branch));
                dispatch(setLoadingAction(false, branch));
            })
            .catch(error => {
                dispatch(setLoadingAction(false, branch));
            });
    }

    const onSave = () => {
        savePartCategory({
            id: formValues.id,
            name: formValues.name
        }).then(res => {
            dispatch(setPageAction(0, branch));
            dispatch(setFormOpenAction(false, null, branch));
            fetchData();
        }).catch(error => {
            enqueueSnackbar(error, {variant: 'error'});
        });
    }

    const onAdd = (event) => {
        setFormValues(initFormValues);
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].addFormTitle, branch));
    }

    const onDelete = (id) => {
        deletePartCategory({id}).then(res => {
            fetchData();
            dispatch(setDeleteConfirmOpenAction(false, branch));
        }).catch(error => {
            enqueueSnackbar(error, {variant: 'error'});
        });
    }

    const onEditAction = (event) => {
        setFormValues(currentRow);
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].editFormTitle, branch));
        dispatch(setActionAnchorElAction(null, branch));
    }

    const onDeleteAction = (event) => {
        dispatch(setActionAnchorElAction(null, branch));
        dispatch(setDeleteConfirmOpenAction(true, branch));
    }

    const onFormInput = (event) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
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
                       onSave={onSave}
            >
                <Box>
                    <Stack direction="column" spacing={2} mt={2}>
                        <TextField required name="name" fullWidth label="Название" onChange={onFormInput}
                                   value={formValues.name}/>
                    </Stack>
                </Box>
            </MainTable>
        </Box>
    )
}

export default PartCategoriesPage;