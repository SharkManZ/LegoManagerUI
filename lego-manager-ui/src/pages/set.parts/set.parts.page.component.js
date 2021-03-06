import {Box, Button, Grid, Paper, Stack, Typography} from "@mui/material";
import MainTable from "../../components/table/main.table.component";
import React, {useEffect, useState} from "react";
import {SET_PARTS_BRANCH} from "../../constants/pages/page.constants";
import {useParams} from "react-router-dom";
import useCrudActions from "../../components/action/crud.actions";
import SetPartsForm from "./set.parts.form.component";
import SetSummary from "./set.summary.component";
import AutocompleteControl from "../../components/fields/autocomplete.control.component";
import {useDispatch, useSelector} from "react-redux";
import {setErrorAction} from "../../store/reducer/app.actions";
import {setFiltersAction} from "../../store/reducer/crud.actions";
import {transformFilters} from "../../utils/object.utils";
import ColorAutocompleteControl from "../../components/fields/color.autocomplete.control.component";
import {getSetColors, getSetPartCategories} from "../../service/sets.service";

const initFilters = {
    "partColor.color.id": {
        operator: '=',
        value: ''
    },
    "partColor.part.category.id": {
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
    const needRefresh = useSelector(state => state[branch].needRefresh);

    const reloadFiltersData = () => {
        getSetPartCategories(setId)
            .then(res => {
                setCategories(res);
            })
            .catch(error => {
                dispatch(setErrorAction(error));
            });
        getSetColors(setId)
            .then(res => {
                setColors(res);
            })
            .catch(error => {
                dispatch(setErrorAction(error));
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

    // ?????????????????? ?? ???????????????? ??????????????????, ?????? ???????????? ???? ????????????
    useEffect(() => {
        const value = filterCategory ? filterCategory.id : null;
        const newValue = Object.assign({}, filterFields["partColor.part.category.id"], {value: value});
        setFilterFields({
            ...filterFields,
            "partColor.part.category.id": newValue
        })
    }, [filterCategory])

    // ?????????????????? ?? ???????????????? ??????????????????, ?????? ???????????? ???? ????????????
    useEffect(() => {
        const value = filterColor ? filterColor.id : null;
        const newValue = Object.assign({}, filterFields["partColor.color.id"], {value: value});
        setFilterFields({
            ...filterFields,
            "partColor.color.id": newValue
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
                        <Typography color={"deepskyblue"} variant="h5">??????????????</Typography>
                        <Stack direction="column" mt={2} spacing={3}>
                            <AutocompleteControl options={categories} selectedValue={filterCategory}
                                                 label="?????????????????? ????????????" setOption={setFilterCategory}/>
                            <ColorAutocompleteControl options={colors} selectedValue={filterColor}
                                                      label="????????" setOption={setFilterColor}/>
                        </Stack>
                        <Stack direction="row" mt={2} spacing={2} justifyContent="center">
                            <Button variant="contained" onClick={onFilterApply}>??????????????????</Button>
                            <Button variant="contained" onClick={clearFilters}>????????????????</Button>
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
            </Grid>
        </Box>
    )
}

export default SetPartsPage;