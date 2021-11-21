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
import {PAGE_CRUD_CONSTANTS} from "../constants/pages/page.constants";
import {useEffect, useState} from "react";
import {deleteSet, getSets, saveSet} from "../service/sets.service";
import {useSnackbar} from "notistack";
import {getAllSeries} from "../service/series.service";
import AutocompleteControl from "../components/fields/autocomplete.control.component";
import {useParams} from "react-router-dom";

const initFormValues = {
    id: null,
    name: '',
    number: '',
    year: null
}
const initFilters = {
    year: "",
    series: {
        id: null,
        name: ""
    }
}
const columns = [
    {
        title: 'Серия',
        field: 'series.name',
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
    },
    {
        title: 'Год выпуска',
        field: 'year',
        sortable: true
    }
]
const branch = 'sets';

function SetsPage() {
    const {seriesId} = useParams();
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    // grid
    const currentRow = useSelector(state => state[branch].currentRow);
    const search = useSelector(state => state[branch].search);
    const page = useSelector(state => state[branch].page);
    const rowsPerPage = useSelector(state => state[branch].rowsPerPage);
    const orderBy = useSelector(state => state[branch].orderBy);
    const orderDirection = useSelector(state => state[branch].orderDirection);

    const [series, setSeries] = useState([]);

    // crud
    const [formValues, setFormValues] = useState(initFormValues);
    const [selectedSeries, setSelectedSeries] = useState();

    // filters
    const [filters, setFilters] = useState();
    const [filterFields, setFilterFields] = useState(initFilters);
    const [filterSeries, setFilterSeries] = useState({});

    const fetchData = () => {
        const currentFilters = (seriesId !== undefined && seriesId !== null) ? {...filters, ...{series: {id: seriesId}}} : filters;
        console.log(currentFilters);
        getSets({
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
        getAllSeries({enqueueSnackbar})
            .then(res => {
                setSeries(res);
            })
    }, [])

    // когда загрузили все серии, выставляем фильтр, если пришли со страницы серий
    useEffect(() => {
        if (seriesId !== undefined && seriesId !== null) {
            setFilterSeries(series.find(item => item.id == seriesId));
        }
    }, [series])

    // добавляем к фильтрам серию, при выборе из списка
    useEffect(() => {
        setFilterFields({
            ...filterFields,
            series: filterSeries
        })
    }, [filterSeries])

    // сбрасываем фильтр по сериям и обновляем данные при изменении входного параметра серии
    useEffect(() => {
        if (seriesId === undefined || seriesId === null) {
            setFilterSeries({});
            fetchData();
        }
    }, [seriesId])

    const onAdd = (event) => {
        setFormValues(initFormValues);
        setSelectedSeries(null);
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].addFormTitle, branch));
    }

    const onDelete = (id) => {
        deleteSet({id}).then(res => {
            fetchData();
            dispatch(setDeleteConfirmOpenAction(false, branch));
        }).catch(error => {
            enqueueSnackbar(error, {variant: 'error'});
        });
    }

    const onSave = () => {
        saveSet({
            id: formValues.id,
            name: formValues.name,
            number: formValues.number,
            year: formValues.year,
            series: selectedSeries
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
        setSelectedSeries(series.find(item => item.id === currentRow.series.id));
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
                <Typography variant="h4">Наборы</Typography>
            </Grid>
            <Grid container>
                <Grid container item xs={3} width="100%" pt={2} pb={2}>
                    <Paper style={{width: "100%", textAlign: "center", padding: 10}}>
                        <Typography color={"deepskyblue"} variant="h5">Фильтры</Typography>
                        <Stack direction="column" mt={2} spacing={3}>
                            <AutocompleteControl options={series} selectedValue={filterSeries}
                                                 disabled={seriesId !== undefined}
                                                 label="Серия" setOption={setFilterSeries}/>
                            <TextField name="year" fullWidth type="number" label="Год выпуска" value={filterFields.year}
                                       onChange={onFilterInput}/>
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
                                <AutocompleteControl options={series} selectedValue={selectedSeries}
                                                     label="Серия" setOption={setSelectedSeries}/>
                                <TextField required name="number" fullWidth label="Номер" onChange={onFormInput}
                                           value={formValues.number}/>
                                <TextField required name="name" fullWidth label="Название" onChange={onFormInput}
                                           value={formValues.name}/>
                                <TextField required name="year" fullWidth label="Год выпуска" onChange={onFormInput}
                                           type="number" value={formValues.year}/>
                            </Stack>
                        </Box>
                    </MainTable>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SetsPage;