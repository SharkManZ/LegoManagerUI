import {useEffect, useState} from "react";
import {deleteSeries, getSeries, saveSeries} from "../service/series.service";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchDataAction,
    setDeleteConfirmOpenAction,
    setFormOpenAction,
    setPageAction,
    setTotalCountAction
} from "../store/crud.actions";
import SeriesImageList from "../components/imagelist/series.imagelist.component";
import {useSnackbar} from "notistack";
import {Box, TextField} from "@mui/material";
import {PAGE_CRUD_CONSTANTS, SERIES_BRANCH} from "../constants/pages/page.constants";

const itemsPerPage = 16;
const initFormValues = {
    id: null,
    name: ''
}
const branch = SERIES_BRANCH;

function SeriesPage() {
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const page = useSelector(state => state[branch].page);
    const search = useSelector(state => state[branch].search);
    const [formValues, setFormValues] = useState(initFormValues);

    useEffect(() => {
        fetchData();
    }, [page, search]);

    const fetchData = () => {
        getSeries({page: page - 1, rowsPerPage: itemsPerPage, search: search, enqueueSnackbar})
            .then(res => {
                dispatch(fetchDataAction(res.data, branch));
                dispatch(setTotalCountAction(res.totalCount, branch));
            })
    }

    const onFormInput = (event) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const onAdd = () => {
        setFormValues(initFormValues);
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].addFormTitle, branch));
    }

    const onEditAction = (values) => {
        setFormValues(values);
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].editFormTitle, branch));
    }

    const onSave = () => {
        saveSeries({id: formValues.id, name: formValues.name}).then(res => {
            dispatch(setFormOpenAction(false, null, branch));
            fetchIfNeeded();
        }).catch(error => {
            enqueueSnackbar(error, {variant: 'error'})
        })
    }

    const fetchIfNeeded = () => {
        if (page === 1) {
            fetchData();
        } else {
            dispatch(setPageAction(1, branch));
        }
    }

    const onDelete = (id) => {
        deleteSeries({id}).then(res => {
            dispatch(setDeleteConfirmOpenAction(false, branch));
            fetchIfNeeded();
        }).catch(error => {
            enqueueSnackbar(error, {variant: 'error'})
        })
    }


    return (
        <SeriesImageList
            branch={branch}
            itemsPerPage={itemsPerPage}
            onAdd={onAdd}
            onSave={onSave}
            onEdit={onEditAction}
            onDelete={onDelete}
        >
            <Box m={2}>
                <TextField name="name" autoFocus fullWidth label="Название" onChange={onFormInput}
                           value={formValues.name}/>
            </Box>
        </SeriesImageList>
    )
}

export default SeriesPage;
