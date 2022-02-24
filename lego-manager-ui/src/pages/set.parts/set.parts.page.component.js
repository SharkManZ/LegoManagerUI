import {Box, Button, Grid, Paper, Stack, TextField, Typography} from "@mui/material";
import MainTable from "../../components/table/main.table.component";
import React, {useEffect, useState} from "react";
import {SET_PARTS_BRANCH} from "../../constants/pages/page.constants";
import {useParams} from "react-router-dom";
import useCrudActions from "../../components/action/crud.actions";
import SetPartsForm from "./set.parts.form.component";
import SetSummary from "./set.summary.component";
import AutocompleteControl from "../../components/fields/autocomplete.control.component";
import {getAllCategories} from "../../service/part.categories.service";
import {useDispatch} from "react-redux";
import {setErrorAction} from "../../store/reducer/app.actions";
import {getAllColors} from "../../service/colors.service";
import {setFiltersAction} from "../../store/reducer/crud.actions";
import {transformFilters} from "../../utils/object.utils";
import ColorAutocompleteControl from "../../components/fields/color.autocomplete.control.component";

const initFilters = {
    color: {
        operator: '=',
        value: ''
    },
    partCategory: {
        operator: '=',
        value: null
    }
}

const branch = SET_PARTS_BRANCH;

function SetPartsPage() {
    const dispatch = useDispatch();
    const {setId} = useParams();
    const {editAction, deleteAction} = useCrudActions(branch);
    const [filterFields, setFilterFields] = useState(initFilters);
    const [filterCategory, setFilterCategory] = useState({});
    const [filterColor, setFilterColor] = useState({});
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);

    useEffect(() => {
        getAllCategories()
            .then(res => {
                setCategories(res);
            })
            .catch(error => {
                dispatch(setErrorAction(error));
            });
        getAllColors()
            .then(res => {
                setColors(res);
            })
            .catch(error => {
                dispatch(setErrorAction(error));
            });
    }, [])

    // добавляем к фильтрам категорию, при выборе из списка
    useEffect(() => {
        const value = filterCategory ? filterCategory.id : null;
        const newValue = Object.assign({}, filterFields.partCategory, {value: value});
        setFilterFields({
            ...filterFields,
            partCategory: newValue
        })
    }, [filterCategory])

    // добавляем к фильтрам категорию, при выборе из списка
    useEffect(() => {
        const value = filterColor ? filterColor.id : null;
        const newValue = Object.assign({}, filterFields.color, {value: value});
        setFilterFields({
            ...filterFields,
            color: newValue
        })
    }, [filterColor])

    const onFilterApply = () => {
        dispatch(setFiltersAction(transformFilters(filterFields), branch));
    }

    const clearFilters = () => {
        setFilterFields(initFilters);
        setFilterCategory({});
        setFilterColor({});
        dispatch(setFiltersAction([], branch));
    }

    return (
        <Box>
            <SetSummary setId={setId}/>
            <Grid container>
                <Grid container item xs={3} width="100%" pt={2} pb={2}>
                    <Paper style={{width: "100%", textAlign: "center", padding: 10}}>
                        <Typography color={"deepskyblue"} variant="h5">Фильтры</Typography>
                        <Stack direction="column" mt={2} spacing={3}>
                            <AutocompleteControl options={categories} selectedValue={filterCategory}
                                                 label="Категория детали" setOption={setFilterCategory}/>
                            <ColorAutocompleteControl options={colors} selectedValue={filterColor}
                                                      label="Цвет" setOption={setFilterColor}/>
                        </Stack>
                        <Stack direction="row" mt={2} spacing={2} justifyContent="center">
                            <Button variant="contained" onClick={onFilterApply}>Применить</Button>
                            <Button variant="contained" onClick={clearFilters}>Очистить</Button>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid container item xs={9}>
                    <MainTable branch={branch}
                               fetchRequest={{setId: setId}}
                               rowActions={[editAction, deleteAction]}
                               noPagination={true}>
                        <SetPartsForm setId={setId}/>
                    </MainTable>

                </Grid>
            </Grid>
        </Box>
    )
}

export default SetPartsPage;