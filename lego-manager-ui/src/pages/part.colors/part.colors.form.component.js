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
import ColorAutocompleteControl from "../../components/fields/color.autocomplete.control.component";
import AddIcon from "@mui/icons-material/Add";
import React, {useEffect, useState} from "react";
import {PART_COLORS_BRANCH} from "../../constants/pages/page.constants";
import {useFormik} from "formik";
import {saveRequestAction} from "../../store/reducer/crud.actions";
import {useDispatch, useSelector} from "react-redux";
import {saveColor} from "../../service/colors.service";
import {useSnackbar} from "notistack";
import {ADD_FORM_ACTION, EDIT_FORM_ACTION, SUBMIT_FORM_ACTION} from "../../constants/crud.constants";

const initColorFormValues = {
    id: null,
    colorName: '',
    hexColor: ''
}

const branch = PART_COLORS_BRANCH;

function PartColorsForm({partId, colors, fetchAllColors, colorFetched}) {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const [selectedColor, setSelectedColor] = useState();
    const [colorFormValues, setColorFormValues] = useState(initColorFormValues);
    const [colorOpen, setColorOpen] = useState(false);
    const [addedColor, setAddedColor] = useState();
    const formAction = useSelector(state => state[branch].formAction);
    const currentRow = useSelector(state => state[branch].currentRow);

    // crud
    const formik = useFormik({
        initialValues: {
            id: null,
            number: '',
            alternateNumber: ''
        },
        onSubmit: values => {
            dispatch(saveRequestAction({
                id: values.id,
                number: values.number,
                part: {id: partId},
                color: selectedColor,
                alternateNumber: values.alternateNumber
            }, branch));
        }
    })

    const onColorFormInput = (event) => {
        const {name, value} = event.target;
        setColorFormValues({
            ...colorFormValues,
            [name]: value
        })
    }

    const onColorSave = () => {
        saveColor({
            id: colorFormValues.id,
            name: colorFormValues.colorName,
            hexColor: colorFormValues.hexColor
        }).then(res => {
            fetchAllColors(true);
            setAddedColor(res.body);
            setColorOpen(false);
        }).catch(error => {
            enqueueSnackbar(error, {variant: 'error'});
        });
    }

    useEffect(() => {
        if (formAction === ADD_FORM_ACTION) {
            setSelectedColor(null);
            formik.resetForm();
        } else if (formAction === EDIT_FORM_ACTION) {
            formik.setValues(currentRow);
            setSelectedColor(colors.find(item => item.id === currentRow.color.id));
        } else if (formAction === SUBMIT_FORM_ACTION) {
            formik.submitForm();
        }
    }, [formAction])

    useEffect(() => {
        if (colorFetched === true) {
            setSelectedColor(addedColor);
            setAddedColor({});
        }
    }, [colorFetched]);

    return (
        <Box>
            <Stack direction="column" spacing={2} mt={2}>
                <Stack direction="row" spacing={2}>
                    <ColorAutocompleteControl options={colors} selectedValue={selectedColor}
                                              label="Цвет" setOption={setSelectedColor}/>
                    <IconButton color="primary" onClick={() => {
                        setColorFormValues(initColorFormValues);
                        setColorOpen(true);
                    }}>
                        <AddIcon/>
                    </IconButton>
                </Stack>
                <TextField required name="number" fullWidth label="Номер" onChange={formik.handleChange}
                           value={formik.values.number}/>
                <TextField name="alternateNumber" fullWidth label="Альтернативный номер"
                           onChange={formik.handleChange}
                           value={formik.values.alternateNumber}/>
            </Stack>
            <Dialog open={colorOpen} fullWidth onClose={() => setColorOpen(false)}>
                <DialogTitle>Добавление цвета</DialogTitle>
                <DialogContent>
                    <Stack direction="column" spacing={2}>
                        <TextField required name="colorName" fullWidth label="Название" onChange={onColorFormInput}
                                   value={colorFormValues.colorName}/>
                        <TextField required name="hexColor" fullWidth label="Код цвета" onChange={onColorFormInput}
                                   value={colorFormValues.hexColor}/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={onColorSave}>Сохранить</Button>
                    <Button variant="contained" onClick={() => setColorOpen(false)}>Отмена</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default PartColorsForm;