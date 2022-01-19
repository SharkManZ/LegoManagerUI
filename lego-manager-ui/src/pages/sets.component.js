import {Box, Button, Grid, Paper, Stack, TextField, Typography} from "@mui/material";
import MainTable from "../components/table/main.table.component";
import {useDispatch, useSelector} from "react-redux";
import {saveRequestAction, setActionAnchorElAction, setFiltersAction} from "../store/reducer/crud.actions";
import {SETS_BRANCH} from "../constants/pages/page.constants";
import {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {getAllSeries} from "../service/series.service";
import AutocompleteControl from "../components/fields/autocomplete.control.component";
import {useHistory, useParams} from "react-router-dom";
import {useFormik} from "formik";
import {transformFilters} from "../utils/object.utils";
import useCrudActions from "../components/action/crud.actions";
import {ADD_FORM_ACTION, SUBMIT_FORM_ACTION} from "../constants/crud.constants";

const initFilters = {
    year: {
        operator: '=',
        value: ''
    },
    series: {
        field: 'series.id',
        operator: '=',
        value: null
    }
}

const branch = SETS_BRANCH;

function SetsPage() {
    const {seriesId} = useParams();
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const history = useHistory();

    const [series, setSeries] = useState([]);

    // filters
    const [filterFields, setFilterFields] = useState(initFilters);
    const [filterSeries, setFilterSeries] = useState({});

    // crud
    const [selectedSeries, setSelectedSeries] = useState();
    const formAction = useSelector(state => state[branch].formAction);

    const formik = useFormik({
        initialValues: {
            id: null,
            name: '',
            number: '',
            year: null
        },
        onSubmit: values => {
            dispatch(saveRequestAction({
                id: values.id,
                name: values.name,
                number: values.number,
                year: values.year,
                series: selectedSeries
            }, branch));
        }
    })

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
        const value = filterSeries ? filterSeries.id : null;
        const newValue = Object.assign({}, filterFields.series, {value: value});
        setFilterFields({
            ...filterFields,
            series: newValue
        })
    }, [filterSeries])

    // сбрасываем фильтр по сериям и обновляем данные при изменении входного параметра серии
    useEffect(() => {
        if (seriesId === undefined || seriesId === null) {
            setFilterSeries({});
        }
    }, [seriesId])

    const onFilterInput = (event) => {
        const {name, value} = event.target;
        const newValue = Object.assign({}, filterFields[name], {value: value});
        setFilterFields({
            ...filterFields,
            [name]: newValue
        })
    }

    const onFilterApply = () => {
        dispatch(setFiltersAction(transformFilters(filterFields), branch));
    }

    const clearFilters = () => {
        if (seriesId === undefined || seriesId === null) {
            setFilterFields(initFilters);
            setFilterSeries(null);
            dispatch(setFiltersAction([], branch));
        } else {
            const clearedFilters = Object.assign({}, filterFields, {year: initFilters.year});
            setFilterFields(clearedFilters);
            dispatch(setFiltersAction(transformFilters(clearedFilters), branch));
        }
    }

    useEffect(() => {
        if (formAction === ADD_FORM_ACTION) {
            setSelectedSeries(null);
            formik.resetForm();
        } else if (formAction === SUBMIT_FORM_ACTION) {
            formik.submitForm();
        }
    }, [formAction])

    const additionalEditAction = (currentRow) => {
        setSelectedSeries(series.find(item => item.id === currentRow.series.id));
    }
    const {currentRow, editAction, deleteAction} = useCrudActions({
        branch: branch,
        formik: formik,
        additionalEditAction: additionalEditAction
    });
    const onPartsAction = (event) => {
        history.push(`/set/${currentRow.id}/parts`);
        dispatch(setActionAnchorElAction(null, branch));
    }

    const rowActions = [
        {
            title: 'Детали',
            onClick: onPartsAction
        },
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
                            <TextField name="year" fullWidth type="number" label="Год выпуска"
                                       value={filterFields.year.value}
                                       onChange={onFilterInput}/>
                        </Stack>
                        <Stack direction="row" mt={2} spacing={2} justifyContent="center">
                            <Button variant="contained" onClick={onFilterApply}>Применить</Button>
                            <Button variant="contained" onClick={clearFilters}>Очистить</Button>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid container item xs={9}>
                    <MainTable rowActions={rowActions}
                               branch={branch}
                               fetchRequest={{seriesId: seriesId}}
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