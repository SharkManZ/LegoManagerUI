import MainTable from "../components/table/main.table.component";
import {PAGE_CRUD_CONSTANTS, PART_COLORS_BRANCH} from "../constants/pages/page.constants";
import {
    fetchDataAction,
    setActionAnchorElAction,
    setDeleteConfirmOpenAction,
    setFormOpenAction,
    setLoadingAction
} from "../store/crud.actions";
import {useSnackbar} from "notistack";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Box, IconButton, Stack, TextField} from "@mui/material";
import {deletePartColor, getPartColors, savePartColor} from "../service/part.colors.service";
import AddIcon from '@mui/icons-material/Add';
import {getAllColors} from "../service/colors.service";
import ColorAutocompleteControl from "../components/fields/color.autocomplete.control.component";

const initFormValues = {
    id: null,
    number: ''
}
const initColorFormValues = {
    id: null,
    name: '',
    hexColor: ''
}
const columns = [
    {
        title: 'Номер',
        field: 'number',
        sortable: true
    },
    {
        title: 'Цвет',
        field: 'color.hexColor',
        type: 'color',
        sortable: false
    }
]
const branch = PART_COLORS_BRANCH;

function PartColor({partId, setIsColorsChanged}) {
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();

    // grid
    const currentRow = useSelector(state => state[branch].currentRow);
    const [selectedColor, setSelectedColor] = useState();

    const [colors, setColors] = useState([]);

    // crud
    const [formValues, setFormValues] = useState(initFormValues);
    const [colorFormValues, setColorFormValues] = useState(initColorFormValues);

    const fetchData = () => {
        getPartColors({
            partId: partId,
            enqueueSnackbar,
            listError: PAGE_CRUD_CONSTANTS[branch].listError
        })
            .then(res => {
                dispatch(fetchDataAction(res, branch));
                dispatch(setLoadingAction(false, branch));
            })
            .catch(error => {
                dispatch(setLoadingAction(false, branch));
            });
    }
    // запрос данных при изменении поиска, страницы, кол-ва элементов на странице, сортировки, фильтров
    useEffect(() => {
        fetchData();
    }, []);

    const fetchAllColors = () => {
        getAllColors({enqueueSnackbar})
            .then(res => {
                setColors(res);
            })
    }

    // запрос всех серий - один раз
    useEffect(() => {
        fetchAllColors();
    }, [])

    const onFormInput = (event) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const onAdd = (event) => {
        setFormValues(initFormValues);
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].addFormTitle, branch));
    }

    const onDelete = (id) => {
        deletePartColor({id}).then(res => {
            fetchData();
            setIsColorsChanged(true);
            dispatch(setDeleteConfirmOpenAction(false, branch));
        }).catch(error => {
            enqueueSnackbar(error, {variant: 'error'});
        });
    }

    const onSave = () => {
        savePartColor({
            id: formValues.id,
            number: formValues.number,
            part: {id: partId},
            color: selectedColor
        }).then(res => {
            dispatch(setFormOpenAction(false, null, branch));
            setIsColorsChanged(true);
            fetchData();
        }).catch(error => {
            enqueueSnackbar(error, {variant: 'error'});
        });
    }

    const onEditAction = (event) => {
        setFormValues(currentRow);
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].editFormTitle, branch));
        dispatch(setActionAnchorElAction(null, branch));
    }

    const onDeleteAction = (event) => {
        dispatch(setActionAnchorElAction(null, branch));
        dispatch(setDeleteConfirmOpenAction(true, branch));
    }

    const rowActions = [
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
            <MainTable columns={columns} branch={branch}
                       onAdd={onAdd}
                       onSave={onSave}
                       onDelete={onDelete}
                       rowActions={rowActions}
                       noPagination={true}>
                <Box>
                    <Stack direction="column" spacing={2} mt={2}>
                        <Stack direction="row" spacing={2}>
                            <ColorAutocompleteControl options={colors} selectedValue={selectedColor}
                                                      label="Цвет" setOption={setSelectedColor}/>
                            <IconButton color="primary" onClick={() => {
                                setColorFormValues(initColorFormValues);
                                // setCategoryOpen(true);
                            }}>
                                <AddIcon/>
                            </IconButton>
                        </Stack>
                        <TextField required name="number" fullWidth label="Номер" onChange={onFormInput}
                                   value={formValues.number}/>
                    </Stack>
                </Box>
            </MainTable>
        </Box>
    )
}

export default PartColor;