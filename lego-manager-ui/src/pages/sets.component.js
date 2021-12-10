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
import {PAGE_CRUD_CONSTANTS, SETS_BRANCH} from "../constants/pages/page.constants";
import {useEffect, useState} from "react";
import {deleteSet, getSets, saveSet} from "../service/sets.service";
import {useSnackbar} from "notistack";
import {getAllSeries} from "../service/series.service";
import AutocompleteControl from "../components/fields/autocomplete.control.component";
import {useHistory, useParams} from "react-router-dom";
import {useFormik} from "formik";

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
    },
    {
        title: 'Кол-во деталей',
        field: 'partsCount',
        sortable: false
    }
]
const branch = SETS_BRANCH;

function SetsPage() {
    const {seriesId} = useParams();
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const history = useHistory();

    // grid
    const currentRow = useSelector(state => state[branch].currentRow);
    const search = useSelector(state => state[branch].search);
    const page = useSelector(state => state[branch].page);
    const rowsPerPage = useSelector(state => state[branch].rowsPerPage);
    const orderBy = useSelector(state => state[branch].orderBy);
    const orderDirection = useSelector(state => state[branch].orderDirection);

    const [series, setSeries] = useState([]);

    // crud
    const [selectedSeries, setSelectedSeries] = useState();
    const formik = useFormik({
        initialValues: {
            id: null,
            name: '',
            number: '',
            year: null
        },
        onSubmit: values => {
            saveSet({
                id: values.id,
                name: values.name,
                number: values.number,
                year: values.year,
                series: selectedSeries
            }).then(res => {
                dispatch(setPageAction(0, branch));
                dispatch(setFormOpenAction(false, null, branch));
                fetchData();
            }).catch(error => {
                enqueueSnackbar(error, {variant: 'error'});
            });
        }
    })

    // filters
    const [filters, setFilters] = useState();
    const [filterFields, setFilterFields] = useState(initFilters);
    const [filterSeries, setFilterSeries] = useState({});

    const fetchData = () => {
        const currentFilters = (seriesId !== undefined && seriesId !== null) ? {...filters, ...{series: {id: seriesId}}} : filters;
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
        formik.resetForm();
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

    const onEditAction = (event) => {
        formik.setValues(currentRow);
        setSelectedSeries(series.find(item => item.id === currentRow.series.id));
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].editFormTitle, branch));
        dispatch(setActionAnchorElAction(null, branch));
    }

    const onDeleteAction = (event) => {
        dispatch(setActionAnchorElAction(null, branch));
        dispatch(setDeleteConfirmOpenAction(true, branch));
    }

    const onPartsAction = (event) => {
        history.push(`/set/${currentRow.id}/parts`);
        dispatch(setActionAnchorElAction(null, branch));
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
            title: 'Детали',
            onClick: onPartsAction
        },
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
                               onSave={formik.submitForm}
                    >
                        <Box>
                            <Stack direction="column" spacing={2} mt={2}>
                                <AutocompleteControl options={series} selectedValue={selectedSeries}
                                                     label="Серия" setOption={setSelectedSeries}/>
                                <TextField required name="number" fullWidth label="Номер" onChange={formik.handleChange}
                                           value={formik.values.number}/>
                                <TextField required name="name" fullWidth label="Название"
                                           onChange={formik.handleChange}
                                           value={formik.values.name}/>
                                <TextField required name="year" fullWidth label="Год выпуска"
                                           onChange={formik.handleChange}
                                           type="number" value={formik.values.year}/>
                            </Stack>
                        </Box>
                    </MainTable>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SetsPage;