import {Autocomplete, Box, Grid, Stack, TextField, Typography} from "@mui/material";
import MainTable from "../components/table/main.table.component";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchDataAction,
    setActionAnchorElAction,
    setDeleteConfirmOpenAction,
    setFormOpenAction,
    setLoadingAction,
    setPageAction,
    setTotalCountAction
} from "../store/crud.actions";
import {PAGE_CRUD_CONSTANTS} from "../constants/pages/page.constants";
import {useEffect, useState} from "react";
import {deleteSet, getSets, saveSet} from "../service/sets.service";
import {useSnackbar} from "notistack";
import {getAllSeries} from "../service/series.service";

const initFormValues = {
    id: null,
    name: '',
    number: '',
    year: null
}
const branch = 'sets';

function SetsPage() {
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const currentRow = useSelector(state => state[branch].currentRow);
    const search = useSelector(state => state[branch].search);
    const page = useSelector(state => state[branch].page);
    const rowsPerPage = useSelector(state => state[branch].rowsPerPage);
    const orderBy = useSelector(state => state[branch].orderBy);
    const orderDirection = useSelector(state => state[branch].orderDirection);

    const [formValues, setFormValues] = useState(initFormValues);
    const [series, setSeries] = useState([]);
    const [selectedSeries, setSelectedSeries] = useState();

    const fetchData = () => {
        getSets({
            page: page,
            rowsPerPage: rowsPerPage,
            search: search,
            orderBy: orderBy,
            orderDirection: orderDirection,
            enqueueSnackbar,
            listError: PAGE_CRUD_CONSTANTS[branch].listError
        })
            .then(res => {
                dispatch(fetchDataAction(res.data, branch));
                dispatch(setTotalCountAction(res.totalCount, branch));
                dispatch(setLoadingAction(false, branch));
            })
            .catch(error => {
                dispatch(setLoadingAction(false, branch));
            });
    }

    useEffect(() => {
        fetchData();
    }, [search, page, rowsPerPage, orderBy, orderDirection])

    useEffect(() => {
        getAllSeries({enqueueSnackbar})
            .then(res => {
                setSeries(res);
            })
    }, [])

    const onAdd = (event) => {
        setFormValues(initFormValues);
        setSelectedSeries(null);
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].addFormTitle, branch));
    }

    const onDelete = (id) => {
        deleteSet({id}).then(res => {
            fetchData();
            dispatch(setDeleteConfirmOpenAction(false, branch));
        }).catch(error => {
            enqueueSnackbar(error, {variant: 'error'});
        });
    }

    const onSave = () => {
        saveSet({
            id: formValues.id,
            name: formValues.name,
            number: formValues.number,
            year: formValues.year,
            series: selectedSeries
        }).then(res => {
            dispatch(setPageAction(0, branch));
            dispatch(setFormOpenAction(false, null, branch));
            fetchData();
        }).catch(error => {
            enqueueSnackbar(error, {variant: 'error'});
        });
    }

    const onEditAction = (event) => {
        setFormValues(currentRow);
        setSelectedSeries(series.find(item => item.id === currentRow.series.id));
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].editFormTitle, branch));
        dispatch(setActionAnchorElAction(null, branch));
    }

    const onDeleteAction = (event) => {
        dispatch(setActionAnchorElAction(null, branch));
        dispatch(setDeleteConfirmOpenAction(true, branch));
    }

    const onFormInput = (event) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
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

    const columns = [
        {
            title: 'Серия',
            field: 'series.name',
            sortable: false
        },
        {
            title: 'Номер',
            field: 'number',
            sortable: true
        },
        {
            title: 'Название',
            field: 'name',
            sortable: true
        },
        {
            title: 'Год выпуска',
            field: 'year',
            sortable: true
        }
    ]
    return (
        <Box>
            <Grid container alignItems="center" justifyContent="center" color={"deepskyblue"} mt={3}>
                <Typography variant="h4">Наборы</Typography>
            </Grid>
            <MainTable rowActions={rowActions}
                       columns={columns}
                       branch={branch}
                       onAdd={onAdd}
                       onDelete={onDelete}
                       onSave={onSave}
            >
                <Box>
                    <Stack direction="column" spacing={2} mt={2}>
                        <Autocomplete options={series}
                                      value={selectedSeries}
                                      onChange={(event, value) => setSelectedSeries(value)}
                                      getOptionLabel={(option) => option.name}
                                      renderInput={(params) => (
                                          <TextField
                                              {...params}
                                              label="Серия"
                                              value=""
                                              inputProps={{
                                                  ...params.inputProps,
                                                  autoComplete: 'new-password', // disable autocomplete and autofill
                                              }}
                                          />)}
                                      renderOption={(props, option) => (
                                          <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                                              {option.name}
                                          </Box>
                                      )}
                        />
                        <TextField required name="number" fullWidth label="Номер" onChange={onFormInput}
                                   value={formValues.number}/>
                        <TextField required name="name" fullWidth label="Название" onChange={onFormInput}
                                   value={formValues.name}/>
                        <TextField required name="year" fullWidth label="Год выпуска" onChange={onFormInput}
                                   type="number" value={formValues.year}/>
                    </Stack>
                </Box>
            </MainTable>

        </Box>
    )
}

export default SetsPage;