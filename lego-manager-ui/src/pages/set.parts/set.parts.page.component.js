import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import MainTable from "../../components/table/main.table.component";
import React, {useEffect, useState} from "react";
import {SET_PARTS_BRANCH} from "../../constants/pages/page.constants";
import {useParams} from "react-router-dom";
import useCrudActions from "../../components/action/crud.actions";
import SetPartsForm from "./set.parts.form.component";
import SetSummary from "./set.summary.component";
import AutocompleteControl from "../../components/fields/autocomplete.control.component";
import {useDispatch, useSelector} from "react-redux";
import {setFiltersAction} from "../../store/reducer/crud.actions";
import {transformFilters} from "../../utils/object.utils";
import ColorAutocompleteControl from "../../components/fields/color.autocomplete.control.component";
import {getSetColors, getSetPartCategories} from "../../service/sets.service";
import {appSlice} from "../../store/reducer/app.reducer";

const initFilters = {
    "colorId": {
        operator: '=',
        value: ''
    },
    "categoryId": {
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
    const [missingParts, setMissingParts] = useState([]);
    const needRefresh = useSelector(state => state[branch].needRefresh);

    const reloadFiltersData = () => {
        getSetPartCategories(setId)
            .then(res => {
                setCategories(res);
            })
            .catch(error => {
                dispatch(appSlice.actions.setError(error));
            });
        getSetColors(setId)
            .then(res => {
                setColors(res);
            })
            .catch(error => {
                dispatch(appSlice.actions.setError(error));
            });
    }

    useEffect(() => {
        reloadFiltersData();
    }, [])

    useEffect(() => {
        if (needRefresh === false) {
            return;
        }
        console.log('needRefresh ' + needRefresh);
        reloadFiltersData();
    }, [needRefresh])

    // добавляем к фильтрам категорию, при выборе из списка
    useEffect(() => {
        const value = filterCategory ? filterCategory.id : null;
        const newValue = Object.assign({}, filterFields["categoryId"], {value: value});
        setFilterFields({
            ...filterFields,
            "categoryId": newValue
        })
    }, [filterCategory])

    // добавляем к фильтрам категорию, при выборе из списка
    useEffect(() => {
        const value = filterColor ? filterColor.id : null;
        const newValue = Object.assign({}, filterFields["colorId"], {value: value});
        setFilterFields({
            ...filterFields,
            "colorId": newValue
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

    const missingPartsLoaded = (data) => {
        setMissingParts(data);
    }

    const closeMissingParts = () => {
        setMissingParts([]);
    }

    return (
        <Box>
            <SetSummary setId={setId} missingPartsLoaded={missingPartsLoaded}/>
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
                               rowActions={[editAction, deleteAction]}>
                        <SetPartsForm setId={setId}/>
                    </MainTable>
                </Grid>
                <Dialog open={missingParts.length > 0} fullWidth onClose={closeMissingParts}>
                    <DialogTitle>Не найденные детали набора</DialogTitle>
                    <DialogContent>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Изображение</TableCell>
                                        <TableCell>Количество</TableCell>
                                        <TableCell>Номер</TableCell>
                                        <TableCell>Название</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {missingParts !== undefined ? missingParts.map((row) => (
                                        <TableRow>
                                            <TableCell><img src={"http://" + row.imgUrl}/></TableCell>
                                            <TableCell>{row.count}</TableCell>
                                            <TableCell>{row.number}</TableCell>
                                            <TableCell>
                                                <Stack direction="column">
                                                    {row.name}
                                                    <Divider/>
                                                    {row.colorNumber}
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    )) : []}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={closeMissingParts}>Закрыть</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Box>
    )
}

export default SetPartsPage;