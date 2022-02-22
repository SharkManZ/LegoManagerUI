import {Box, Button, Dialog, DialogContent, DialogTitle, Grid, Paper, Stack, Typography} from "@mui/material";
import MainTable from "../../components/table/main.table.component";
import {useDispatch, useSelector} from "react-redux";
import {setActionAnchorElAction, setFiltersAction, setNeedRefreshAction} from "../../store/reducer/crud.actions";
import {PARTS_BRANCH} from "../../constants/pages/page.constants";
import React, {useEffect, useState} from "react";
import AutocompleteControl from "../../components/fields/autocomplete.control.component";
import {useParams} from "react-router-dom";
import {getAllCategories} from "../../service/part.categories.service";
import PartColor from "../part.colors/part.colors.page.component";
import {transformFilters} from "../../utils/object.utils";
import useCrudActions from "../../components/action/crud.actions";
import PartsForm from "./parts.form.component";

const initFilters = {
    category: {
        field: 'category.id',
        operator: '=',
        value: null
    }
}

const branch = PARTS_BRANCH;

function PartsPage() {
    const {categoryId} = useParams();
    const dispatch = useDispatch();
    const currentRow = useSelector(state => state[branch].currentRow);
    const {editAction, deleteAction} = useCrudActions(branch);

    // grid
    const [categories, setCategories] = useState([]);
    const [colorsOpen, setColorsOpen] = useState(false);
    const [categoryFetched, setCategoryFetched] = useState(false);
    const [categoryFetchByAdd, setCategoryFetchByAdd] = useState(false);
    const needManualRefresh = useSelector(state => state[branch].needManualRefresh);

    // filters
    const [filterFields, setFilterFields] = useState(initFilters);
    const [filterCategories, setFilterCategories] = useState({});

    const fetchAllCategories = (byAdd) => {
        setCategoryFetched(false);
        setCategoryFetchByAdd(byAdd);
        getAllCategories()
            .then(res => {
                setCategories(res);
            })
    }

    // запрос всех серий - один раз
    useEffect(() => {
        fetchAllCategories(false);
    }, [])

    // когда загрузили все серии, выставляем фильтр, если пришли со страницы серий
    useEffect(() => {
        if (categoryId !== undefined && categoryId !== null) {
            setFilterCategories(categories.find(item => item.id === categoryId));
        } else if (categoryFetchByAdd === true) {
            // второй вариант обновления общего списка - добавление категории из формы добавления детали
            setCategoryFetched(true);
        }
        setCategoryFetchByAdd(false);
    }, [categories])

    // добавляем к фильтрам серию, при выборе из списка
    useEffect(() => {
        const value = filterCategories ? filterCategories.id : null;
        const newValue = Object.assign({}, filterFields.category, {value: value});
        setFilterFields({
            ...filterFields,
            category: newValue
        })
    }, [filterCategories])

    // сбрасываем фильтр по сериям и обновляем данные при изменении входного параметра серии
    useEffect(() => {
        if (categoryId === undefined || categoryId === null) {
            setFilterCategories({});
        }
    }, [categoryId])

    const onColorsAction = (event) => {
        dispatch(setActionAnchorElAction(null, branch));
        setColorsOpen(true);
    }


    const onColorsClose = () => {
        setColorsOpen(false);
        if (needManualRefresh) {
            dispatch(setNeedRefreshAction(branch));
        }
    }

    const onFilterApply = () => {
        dispatch(setFiltersAction(transformFilters(filterFields), branch));
    }

    const clearFilters = () => {
        setFilterFields(initFilters);
        setFilterCategories(null);
        dispatch(setFiltersAction([], branch));
    }

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
                            <Button variant="contained" onClick={onFilterApply}>Применить</Button>
                            <Button variant="contained" onClick={clearFilters}>Очистить</Button>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid container item xs={9}>
                    <MainTable rowActions={[{title: 'Цвета', onClick: onColorsAction}, editAction, deleteAction]}
                               branch={branch}
                               fetchRequest={{categoryId: categoryId}}
                    >
                        <PartsForm categories={categories} fetchAllCategories={fetchAllCategories}
                                   categoryFetched={categoryFetched}/>
                    </MainTable>
                </Grid>
            </Grid>
            <Dialog open={colorsOpen} onClose={onColorsClose} maxWidth="xl">
                <DialogTitle>Цвета детали</DialogTitle>
                <DialogContent>
                    <PartColor partId={currentRow !== null ? currentRow.id : 0}/>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default PartsPage;