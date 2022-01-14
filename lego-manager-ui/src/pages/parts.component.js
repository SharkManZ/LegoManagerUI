import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import MainTable from "../components/table/main.table.component";
import {useDispatch, useSelector} from "react-redux";
import {
    saveRequestAction,
    setActionAnchorElAction,
    setDeleteConfirmOpenAction,
    setFiltersAction,
    setFormOpenAction,
    setNeedRefreshAction
} from "../store/reducer/crud.actions";
import {LEGO_IMG_ROOT, PAGE_CRUD_CONSTANTS, PARTS_BRANCH} from "../constants/pages/page.constants";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import AutocompleteControl from "../components/fields/autocomplete.control.component";
import {useParams} from "react-router-dom";
import {getAllCategories, savePartCategory} from "../service/part.categories.service";
import AddIcon from '@mui/icons-material/Add';
import PartColor from "./part.colors.page.component";
import {useFormik} from "formik";
import {transformFilters} from "../utils/object.utils";

const initCategoryFormValues = {
    id: null,
    categoryName: ''
}
const initFilters = {
    category: {
        field: 'category.id',
        operator: '=',
        value: null
    }
}
const columns = [
    {
        title: '',
        field: 'minColorNumber',
        imageSource: `${LEGO_IMG_ROOT}/parts`,
        key: 'imgKey',
        sortable: false,
        isImage: true
    },
    {
        title: 'Категория',
        field: 'category.name',
        sortable: false
    },
    {
        title: 'Номер',
        field: 'number',
        additionalField: 'alternateNumber',
        sortable: true
    },
    {
        title: 'Название',
        field: 'name',
        sortable: true
    },
    {
        title: 'Количество цветов',
        field: 'colorsCount',
        sortable: false
    }
]
const branch = PARTS_BRANCH;

function PartsPage() {
    const {categoryId} = useParams();
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();

    // grid
    const currentRow = useSelector(state => state[branch].currentRow);

    const [categories, setCategories] = useState([]);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [lastAddedCategory, setLastAddedCategory] = useState();
    const [colorsOpen, setColorsOpen] = useState(false);
    const [isColorsChanged, setIsColorsChanged] = useState(false);

    // crud
    const [selectedCategory, setSelectedCategory] = useState();
    const [categoryFormValues, setCategoryFormValues] = useState(initCategoryFormValues);
    const formik = useFormik({
        initialValues: {
            id: null,
            name: '',
            number: '',
            alternateNumber: ''
        },
        onSubmit: values => {
            dispatch(saveRequestAction({
                id: values.id,
                name: values.name,
                number: values.number,
                alternateNumber: values.alternateNumber,
                category: selectedCategory
            }, branch));
        }
    });

    // filters
    const [filterFields, setFilterFields] = useState(initFilters);
    const [filterCategories, setFilterCategories] = useState({});

    const fetchAllCategories = () => {
        getAllCategories({enqueueSnackbar})
            .then(res => {
                setCategories(res);
            })
    }

    // запрос всех серий - один раз
    useEffect(() => {
        fetchAllCategories();
    }, [])

    // когда загрузили все серии, выставляем фильтр, если пришли со страницы серий
    useEffect(() => {
        if (categoryId !== undefined && categoryId !== null) {
            setFilterCategories(categories.find(item => item.id === categoryId));
        } else if (lastAddedCategory !== undefined && lastAddedCategory !== null) {
            // второй вариант обновления общего списка - добавление категории из формы добавления детали
            setSelectedCategory(categories.find(item => item.id === lastAddedCategory.id));
            setLastAddedCategory(null);
        }
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

    const onEditAction = (event) => {
        formik.setValues(currentRow);
        setSelectedCategory(categories.find(item => item.id === currentRow.category.id));
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].editFormTitle, branch));
        dispatch(setActionAnchorElAction(null, branch));
    }

    const onDeleteAction = (event) => {
        dispatch(setActionAnchorElAction(null, branch));
        dispatch(setDeleteConfirmOpenAction(true, branch));
    }

    const onColorsAction = (event) => {
        dispatch(setActionAnchorElAction(null, branch));
        setColorsOpen(true);
    }

    const onCategoryFormInput = (event) => {
        const {name, value} = event.target;
        setCategoryFormValues({
            ...categoryFormValues,
            [name]: value
        })
    }

    const onCategorySave = () => {
        savePartCategory({
            id: categoryFormValues.id,
            name: categoryFormValues.categoryName
        }).then(res => {
            fetchAllCategories();
            setLastAddedCategory(res.body);
            setCategoryOpen(false);
        }).catch(error => {
            enqueueSnackbar(error, {variant: 'error'});
        });
    }

    const onColorsClose = () => {
        setColorsOpen(false);
        if (isColorsChanged) {
            dispatch(setNeedRefreshAction(branch));
            setIsColorsChanged(false);
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

    const rowActions = [
        {
            title: 'Цвета',
            onClick: onColorsAction
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
                    <MainTable rowActions={rowActions}
                               columns={columns}
                               branch={branch}
                               formik={formik}
                               fetchRequest={{categoryId: categoryId}}
                    >
                        <Box>
                            <Stack direction="column" spacing={2} mt={2}>
                                <Stack direction="row" spacing={2}>
                                    <AutocompleteControl options={categories} selectedValue={selectedCategory}
                                                         label="Категория" setOption={setSelectedCategory}/>
                                    <IconButton color="primary" aria-label="add to shopping cart" onClick={() => {
                                        setCategoryFormValues(initCategoryFormValues);
                                        setCategoryOpen(true);
                                    }}>
                                        <AddIcon/>
                                    </IconButton>
                                </Stack>
                                <TextField required name="number" fullWidth label="Номер" onChange={formik.handleChange}
                                           value={formik.values.number}/>
                                <TextField name="alternateNumber" fullWidth label="Альтернативный номер"
                                           onChange={formik.handleChange}
                                           value={formik.values.alternateNumber}/>
                                <TextField required name="name" fullWidth label="Название"
                                           onChange={formik.handleChange}
                                           value={formik.values.name}
                                           multiline/>
                            </Stack>
                        </Box>
                    </MainTable>
                </Grid>
            </Grid>
            <Dialog open={categoryOpen} fullWidth onClose={() => setCategoryOpen(false)}>
                <DialogTitle>Добавление категории детали</DialogTitle>
                <DialogContent>
                    <TextField required name="categoryName" fullWidth label="Название" onChange={onCategoryFormInput}
                               value={categoryFormValues.categoryName}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => onCategorySave()}>Сохранить</Button>
                    <Button variant="contained" onClick={() => setCategoryOpen(false)}>Отмена</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={colorsOpen} onClose={onColorsClose} maxWidth="xl">
                <DialogTitle>Цвета детали</DialogTitle>
                <DialogContent>
                    <PartColor partId={currentRow !== null ? currentRow.id : 0}
                               setIsColorsChanged={setIsColorsChanged}/>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default PartsPage;