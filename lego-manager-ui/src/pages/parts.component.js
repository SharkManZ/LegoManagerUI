import {Box, Button, Grid, Paper, Stack, TextField, Typography} from "@mui/material";
import MainTable from "../components/table/main.table.component";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchDataAction,
    setActionAnchorElAction,
    setDeleteConfirmOpenAction,
    setFormOpenAction,
    setLoadingAction,
    setPageAction,
    setTotalCountAction
} from "../store/crud.actions";
import {PAGE_CRUD_CONSTANTS, PARTS_BRANCH, SETS_BRANCH} from "../constants/pages/page.constants";
import {useEffect, useState} from "react";
import {deleteSet, getSets, saveSet} from "../service/sets.service";
import {useSnackbar} from "notistack";
import {getAllSeries} from "../service/series.service";
import AutocompleteControl from "../components/fields/autocomplete.control.component";
import {useParams} from "react-router-dom";
import {deletePart, getParts, savePart} from "../service/parts.service";
import {getAllCategories} from "../service/part.categories.service";

const initFormValues = {
    id: null,
    name: '',
    number: ''
}
const initFilters = {
    category: {
        id: null,
        name: ""
    }
}
const columns = [
    {
        title: 'Категория',
        field: 'category.name',
        sortable: false
    },
    {
        title: 'Номер',
        field: 'number',
        sortable: true
    },
    {
        title: 'Название',
        field: 'name',
        sortable: true
    }
]
const branch = PARTS_BRANCH;

function PartsPage() {
    const {categoryId} = useParams();
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    // grid
    const currentRow = useSelector(state => state[branch].currentRow);
    const search = useSelector(state => state[branch].search);
    const page = useSelector(state => state[branch].page);
    const rowsPerPage = useSelector(state => state[branch].rowsPerPage);
    const orderBy = useSelector(state => state[branch].orderBy);
    const orderDirection = useSelector(state => state[branch].orderDirection);

    const [categories, setCategories] = useState([]);

    // crud
    const [formValues, setFormValues] = useState(initFormValues);
    const [selectedCategory, setSelectedCategory] = useState();

    // filters
    const [filters, setFilters] = useState();
    const [filterFields, setFilterFields] = useState(initFilters);
    const [filterCategories, setFilterCategories] = useState({});

    const fetchData = () => {
        const currentFilters = (categoryId !== undefined && categoryId !== null) ? {...filters, ...{category: {id: categoryId}}} : filters;
        getParts({
            page: page,
            rowsPerPage: rowsPerPage,
            search: search,
            orderBy: orderBy,
            orderDirection: orderDirection,
            filters: currentFilters,
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

    // запрос данных при изменении поиска, страницы, кол-ва элементов на странице, сортировки, фильтров
    useEffect(() => {
        fetchData();
    }, [search, page, rowsPerPage, orderBy, orderDirection, JSON.stringify(filters)])

    // запрос всех серий - один раз
    useEffect(() => {
        getAllCategories({enqueueSnackbar})
            .then(res => {
                setCategories(res);
            })
    }, [])

    // когда загрузили все серии, выставляем фильтр, если пришли со страницы серий
    useEffect(() => {
        if (categoryId !== undefined && categoryId !== null) {
            setFilterCategories(categories.find(item => item.id == categoryId));
        }
    }, [categories])

    // добавляем к фильтрам серию, при выборе из списка
    useEffect(() => {
        setFilterFields({
            ...filterFields,
            category: filterCategories
        })
    }, [filterCategories])

    // сбрасываем фильтр по сериям и обновляем данные при изменении входного параметра серии
    useEffect(() => {
        if (categoryId === undefined || categoryId === null) {
            setFilterCategories({});
            fetchData();
        }
    }, [categoryId])

    const onAdd = (event) => {
        setFormValues(initFormValues);
        setSelectedCategory(null);
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].addFormTitle, branch));
    }

    const onDelete = (id) => {
        deletePart({id}).then(res => {
            fetchData();
            dispatch(setDeleteConfirmOpenAction(false, branch));
        }).catch(error => {
            enqueueSnackbar(error, {variant: 'error'});
        });
    }

    const onSave = () => {
        savePart({
            id: formValues.id,
            name: formValues.name,
            number: formValues.number,
            category: selectedCategory
        }).then(res => {
            dispatch(setPageAction(0, branch));
            dispatch(setFormOpenAction(false, null, branch));
            fetchData();
        }).catch(error => {
            enqueueSnackbar(error, {variant: 'error'});
        });
    }

    const onEditAction = (event) => {
        setFormValues(currentRow);
        setSelectedCategory(categories.find(item => item.id === currentRow.category.id));
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

    const onFilterInput = (event) => {
        const {name, value} = event.target;
        setFilterFields({
            ...filters,
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
                <Typography variant="h4">Виды деталей</Typography>
            </Grid>
            <Grid container>
                <Grid container item xs={3} width="100%" pt={2} pb={2}>
                    <Paper style={{width: "100%", textAlign: "center", padding: 10}}>
                        <Typography color={"deepskyblue"} variant="h5">Фильтры</Typography>
                        <Stack direction="column" mt={2} spacing={3}>
                            <AutocompleteControl options={categories} selectedValue={filterCategories}
                                                 disabled={categoryId !== undefined}
                                                 label="Серия" setOption={setFilterCategories}/>
                        </Stack>
                        <Stack direction="row" mt={2} spacing={2} justifyContent="center">
                            <Button variant="contained" onClick={() => setFilters(filterFields)}>Применить</Button>
                            <Button variant="contained" onClick={() => {
                                setFilters({});
                                setFilterFields(initFilters)
                            }}>Очистить</Button>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid container item xs={9}>
                    <MainTable rowActions={rowActions}
                               columns={columns}
                               branch={branch}
                               onAdd={onAdd}
                               onDelete={onDelete}
                               onSave={onSave}
                    >
                        <Box>
                            <Stack direction="column" spacing={2} mt={2}>
                                <AutocompleteControl options={categories} selectedValue={selectedCategory}
                                                     label="Категория" setOption={setSelectedCategory}/>
                                <TextField required name="number" fullWidth label="Номер" onChange={onFormInput}
                                           value={formValues.number}/>
                                <TextField required name="name" fullWidth label="Название" onChange={onFormInput}
                                           value={formValues.name}/>
                            </Stack>
                        </Box>
                    </MainTable>
                </Grid>
            </Grid>
        </Box>
    )
}

export default PartsPage;