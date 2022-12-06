import {
    Box,
    Button,
    FormControlLabel,
    FormGroup,
    Grid,
    MenuItem,
    Paper,
    Select,
    Stack,
    Switch,
    Typography
} from "@mui/material";
import MainTable from "../../components/table/main.table.component";
import {USER_PARTS_BRANCH} from "../../constants/pages/page.constants";
import {useDispatch, useSelector} from "react-redux";
import useCrudActions from "../../components/action/crud.actions";
import React, {useEffect, useState} from "react";
import {setFiltersAction, setNeedRefreshAction} from "../../store/reducer/crud.actions";
import UserPartForm from "./user.parts.form.component";
import AutocompleteControl from "../../components/fields/autocomplete.control.component";
import {getAllCategories} from "../../service/part.categories.service";
import {transformFilters} from "../../utils/object.utils";
import {getAllColors} from "../../service/colors.service";
import ColorAutocompleteControl from "../../components/fields/color.autocomplete.control.component";

const branch = USER_PARTS_BRANCH;
const initFilters = {
    category: {
        field: 'categoryId',
        operator: '=',
        value: null
    },
    color: {
        field: 'colorId',
        operator: '=',
        value: null
    }
}

function UserPartsPage() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.app.userId);
    const {editAction, deleteAction} = useCrudActions(branch);
    const [requestType, setRequestType] = useState('ALL');
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [filterFields, setFilterFields] = useState(initFilters);
    const [filterCategories, setFilterCategories] = useState({});
    const [filterColor, setFilterColor] = useState({});

    useEffect(() => {
        if (!currentUser) {
            return;
        }
        dispatch(setNeedRefreshAction(branch));
    }, [currentUser]);

    // запрос всех серий - один раз
    useEffect(() => {
        getAllCategories()
            .then(res => {
                setCategories(res);
            })
        getAllColors()
            .then(res => {
                setColors(res);
            })
    }, [])

    // добавляем к фильтрам серию, при выборе из списка
    useEffect(() => {
        const value = filterCategories ? filterCategories.id : null;
        const newValue = Object.assign({}, filterFields.category, {value: value});
        setFilterFields({
            ...filterFields,
            category: newValue
        })
    }, [filterCategories])
    useEffect(() => {
        const value = filterColor ? filterColor.id : null;
        const newValue = Object.assign({}, filterFields.color, {value: value});
        setFilterFields({
            ...filterFields,
            color: newValue
        })
    }, [filterColor])

    const handleRequestType = (event) => {
        setRequestType(event.target.value);
        dispatch(setNeedRefreshAction(branch));
    }

    const onFilterApply = () => {
        dispatch(setFiltersAction(transformFilters(filterFields), branch));
    }

    const clearFilters = () => {
        setFilterFields(initFilters);
        setFilterCategories(null);
        setFilterColor(null);
        dispatch(setFiltersAction([], branch));
    }

    return (
        <Box>
            {/*<Grid container alignItems="center" justifyContent="center" color={"deepskyblue"} mt={3}>*/}
            {/*    <Typography variant="h4">Наборы владельца</Typography>*/}
            {/*</Grid>*/}
            {!currentUser ? (
                <Grid container alignItems="center" justifyContent="center" mt={3}>
                    <Typography variant="h5">Для отображения деталей необходимо выбрать текущего владельца.</Typography>
                </Grid>
            ) : (
                <Grid container>
                    <Grid container item xs={3} width="100%" pt={2} pb={2}>
                        <Paper style={{width: "100%", textAlign: "center", padding: 10}}>
                            <Typography color={"deepskyblue"} variant="h5">Фильтры</Typography>
                            <Stack direction="column" mt={2} spacing={3}>
                                <FormGroup>
                                    <Select value={requestType} label="Детали" onChange={handleRequestType}>
                                        <MenuItem value='ALL'>Все</MenuItem>
                                        <MenuItem value='ONLY_ADDED'>Только добавленные</MenuItem>
                                        <MenuItem value='ONLY_NOT_ADDED'>Только не добавленные</MenuItem>
                                        <MenuItem value='NOT_EQUALS'>Только не совпащаюшие</MenuItem>
                                        <MenuItem value='LOWER_COUNT'>Только потерянные</MenuItem>
                                    </Select>
                                </FormGroup>
                                <AutocompleteControl options={categories} selectedValue={filterCategories}
                                                     label="Категория" setOption={setFilterCategories}/>
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
                        <MainTable rowActions={[editAction, deleteAction]} branch={branch}
                                   fetchRequest={{userId: currentUser, requestType: requestType}}>
                            <UserPartForm/>
                        </MainTable>
                    </Grid>
                </Grid>
            )
            }
        </Box>
    )
}

export default UserPartsPage;