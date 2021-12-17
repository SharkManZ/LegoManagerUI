import {useEffect} from "react";
import {deleteSeries, saveSeries} from "../service/series.service";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchDataRequestAction,
    setDeleteConfirmOpenAction,
    setFormOpenAction,
    setPageAction
} from "../store/reducer/crud.actions";
import SeriesImageList from "../components/imagelist/series.imagelist.component";
import {useSnackbar} from "notistack";
import {Box, TextField} from "@mui/material";
import {PAGE_CRUD_CONSTANTS, SERIES_BRANCH} from "../constants/pages/page.constants";
import {useFormik} from "formik";

const itemsPerPage = 16;

const branch = SERIES_BRANCH;

function SeriesPage() {
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();

    // grid
    const page = useSelector(state => state[branch].page);
    const search = useSelector(state => state[branch].search);

    // crud
    const formik = useFormik({
        initialValues: {
            id: null,
            name: ''
        },
        onSubmit: (values => {
            saveSeries({id: values.id, name: values.name}).then(res => {
                dispatch(setFormOpenAction(false, null, branch));
                fetchIfNeeded();
            }).catch(error => {
                enqueueSnackbar(error, {variant: 'error'})
            })
        })
    });

    useEffect(() => {
        fetchData();
    }, [page, search]);

    const fetchData = () => {
        dispatch(fetchDataRequestAction({
            page: page - 1,
            rowsPerPage: itemsPerPage,
            search: search,
            enqueueSnackbar
        }, branch));
    }

    const onAdd = () => {
        formik.resetForm();
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].addFormTitle, branch));
    }

    const onEditAction = (values) => {
        formik.setValues(values);
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].editFormTitle, branch));
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
            onSave={formik.handleSubmit}
            onEdit={onEditAction}
            onDelete={onDelete}
        >
            <Box m={2}>
                <TextField name="name" autoFocus fullWidth label="Название" onChange={formik.handleChange}
                           value={formik.values.name}/>
            </Box>
        </SeriesImageList>
    )
}

export default SeriesPage;
