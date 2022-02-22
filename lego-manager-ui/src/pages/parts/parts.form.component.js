import {useFormik} from "formik";
import {saveRequestAction} from "../../store/reducer/crud.actions";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {ADD_FORM_ACTION, EDIT_FORM_ACTION, SUBMIT_FORM_ACTION} from "../../constants/crud.constants";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField
} from "@mui/material";
import AutocompleteControl from "../../components/fields/autocomplete.control.component";
import AddIcon from "@mui/icons-material/Add";
import {PARTS_BRANCH} from "../../constants/pages/page.constants";
import {savePartCategory} from "../../service/part.categories.service";
import {setErrorAction} from "../../store/reducer/app.actions";

const initCategoryFormValues = {
    id: null,
    categoryName: ''
}
const branch = PARTS_BRANCH;

function PartsForm({categories, fetchAllCategories, categoryFetched}) {
    const dispatch = useDispatch();

    const formAction = useSelector(state => state[branch].formAction);
    const currentRow = useSelector(state => state[branch].currentRow);
    const [categoryOpen, setCategoryOpen] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState({});
    const [categoryFormValues, setCategoryFormValues] = useState(initCategoryFormValues);
    const [addedCategory, setAddedCategory] = useState();

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

    useEffect(() => {
        if (formAction === ADD_FORM_ACTION) {
            formik.resetForm();
            setSelectedCategory({});
        } else if (formAction === EDIT_FORM_ACTION) {
            formik.setValues(currentRow);
            setSelectedCategory(categories.find(item => item.id === currentRow.category.id));
        } else if (formAction === SUBMIT_FORM_ACTION) {
            formik.submitForm();
        }
    }, [formAction])

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
            fetchAllCategories(true);
            setCategoryOpen(false);
            setAddedCategory(res.body);
        }).catch(error => {
            dispatch(setErrorAction(error));
        });
    }

    useEffect(() => {
        if (categoryFetched === true) {
            setSelectedCategory(addedCategory);
            setAddedCategory({});
        }
    }, [categoryFetched]);

    return (
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
        </Box>
    )
}

export default PartsForm;