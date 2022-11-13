import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Tooltip
} from "@mui/material";
import {LinearProgress} from "@material-ui/core";
import TableContainer from "@mui/material/TableContainer";
import Actions from "../action/actions.component";
import ConfirmDialog from "../dialog/confirm.dialog.component";
import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addFormOpenAction,
    closeFormAction,
    deleteRequestAction,
    fetchDataRequestAction,
    setActionAnchorElAction,
    setCurrentRowAction,
    setDeleteConfirmOpenAction,
    setFormActionAction,
    setOrderByAction,
    setOrderDirectionAction,
    setPageAction,
    setRowsPerPageAction
} from "../../store/reducer/crud.actions";
import {PAGE_CRUD_CONSTANTS} from "../../constants/pages/page.constants";
import {fetchFromObject} from "../../utils/object.utils";
import {makeStyles} from "@mui/styles";
import SearchField from "../fields/search.field.component";
import PropTypes from "prop-types";
import {SUBMIT_FORM_ACTION} from "../../constants/crud.constants";
import {addDefaultImg} from "../../utils/common.funcs";

const useStyles = makeStyles({
    root: {
        height: "auto",
        width: "auto",
        maxHeight: 50,
        maxWidth: 60,
        objectFit: 'cover'
    }
});
const COLORS_IN_ROW = 6;

function MainTable({rowActions, branch, noPagination = false, fetchRequest, children}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const totalCount = useSelector(state => state[branch].totalCount);
    const loading = useSelector(state => state[branch].loading);
    const rows = useSelector(state => state[branch].rows);
    const page = useSelector(state => state[branch].page);
    const rowsPerPage = useSelector(state => state[branch].rowsPerPage);
    const orderDirection = useSelector(state => state[branch].orderDirection);
    const orderBy = useSelector(state => state[branch].orderBy);
    const dialogOpen = useSelector(state => state[branch].formOpen);
    const dialogTitle = useSelector(state => state[branch].formTitle);
    const deleteConfirmOpen = useSelector(state => state[branch].deleteConfirmOpen);
    const currentRow = useSelector(state => state[branch].currentRow);
    const needRefresh = useSelector(state => state[branch].needRefresh);
    const prevNeedRefresh = useRef(null);
    const search = useSelector(state => state[branch].search);
    const filters = useSelector(state => state[branch].filters);
    const columns = PAGE_CRUD_CONSTANTS[branch].columns;

    const onSortChange = (property) => () => {
        dispatch(setOrderByAction(property, branch));
        dispatch(setOrderDirectionAction(orderDirection === 'asc' ? 'desc' : 'asc', branch));
    }

    const pageChange = (event, newPage) => {
        dispatch(setPageAction(newPage, branch));
    }

    const rowPerPageChange = (e) => {
        dispatch(setPageAction(0, branch));
        dispatch(setRowsPerPageAction(e.target.value, branch));
    }

    const onClose = () => {
        dispatch(closeFormAction(branch));
    }

    const onActionButtonClick = row => (event) => {
        dispatch(setActionAnchorElAction(event.currentTarget, branch));
        dispatch(setCurrentRowAction(row, branch));
    }

    const getColor = (row, column) => {
        if (column.type === 'color') {
            return '#' + fetchFromObject(row, column.field);
        }
        return 'white';
    }

    const getRowValue = (row, column) => {
        if (column.type === 'color') {
            return '';
        }
        let value = fetchFromObject(row, column.field);
        if (column.additionalField && fetchFromObject(row, column.additionalField)) {
            value = value + ' (' + fetchFromObject(row, column.additionalField) + ')';
        }
        return value;
    }

    const isImageColumn = (column) => {
        return column.isImage !== undefined && column.isImage;
    }

    const getRowColumnCell = (row, column) => {
        if (isImageColumn(column)) {
            return (
                <TableCell key={column.key ? column.key : column.field}>
                    {getTooltipImageColumn(row, column)}
                </TableCell>
            )
        } else if (column.type === 'color') {
            return (
                <TableCell key={column.key ? column.key : column.field} width="10%">
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            width: 150,
                            height: 40,
                        }
                    }}>
                        <Tooltip title={column.additionalField ? fetchFromObject(row, column.additionalField) : ""}>
                            <Paper style={{backgroundColor: getColor(row, column)}} elevation={10}/>
                        </Tooltip>
                    </Box>

                </TableCell>
            )
        } else if (column.type === 'colors') {
            return (
                <TableCell key={column.key ? column.key : column.field}>
                    {getColorsValue(row[column.field])}
                </TableCell>
            )
        } else {
            return (
                <TableCell key={column.key ? column.key : column.field}>
                    {getRowValue(row, column)}
                </TableCell>
            )
        }
    }

    function getTooltipImageColumn(row, column) {
        if (column.tooltipField) {
            return (
                <Tooltip title={row[column.tooltipField]}>
                    {getImageColumnValue(row, column)}
                </Tooltip>
            )
        } else {
            return getImageColumnValue(row, column)
        }
    }

    function getImageColumnValue(row, column) {
        return (
            <Box
                style={{overflow: "hidden", textAlign: "center"}}>
                <img src={`/${column.imageSource}/${row[column.field]}.png`}
                     alt={`Деталь /${column.imageSource}/${row[column.field]}.png`}
                     loading="lazy"
                     onError={addDefaultImg}
                     className={classes.root}
                />
            </Box>
        )
    }

    function getColorsValue(data) {
        let rowArrays = data.chunk(COLORS_IN_ROW);
        return (
            rowArrays.map((row) => (
                <Stack direction="row" spacing={0.5} paddingBottom={1}>
                    {row.map((column) => (
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                width: 15,
                                height: 15,
                            }
                        }}>
                            <Tooltip title={column.name}>
                                <Paper style={{backgroundColor: '#' + column.hexColor}} elevation={10}/>
                            </Tooltip>
                        </Box>
                    ))
                    }
                </Stack>
            ))
        )
    }

    const onAdd = () => {
        dispatch(addFormOpenAction(branch));
    }

    const onSubmit = () => {
        dispatch(setFormActionAction(SUBMIT_FORM_ACTION, branch));
    }

    const onDelete = () => {
        dispatch(deleteRequestAction({id: currentRow.id}, branch));
    }

    // запрос данных при изменении поиска, страницы, кол-ва элементов на странице, сортировки
    useEffect(() => {

        // обновление данных из-за изменения признака необходимости обновить
        if (needRefresh !== prevNeedRefresh.current) {
            if (prevNeedRefresh.current && needRefresh === false) {
                prevNeedRefresh.current = needRefresh;
                return;
            }
            prevNeedRefresh.current = needRefresh;
        }
        fetchData();
    }, [search, page, rowsPerPage, orderBy, orderDirection, needRefresh, JSON.stringify(filters)])

    const fetchData = () => {
        dispatch(fetchDataRequestAction({
            page: page,
            rowsPerPage: rowsPerPage,
            search: search,
            orderBy: orderBy,
            orderDirection: orderDirection,
            fetchRequest: fetchRequest,
            filters: filters
        }, branch));
    }

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <Box m={2} paddingTop={2}>
                    <Stack direction="row" spacing={2}>
                        <SearchField branch={branch}/>
                        <Button variant="contained" onClick={onAdd}>Добавить</Button>
                    </Stack>
                </Box>
                {loading ? (
                    <Box sx={{width: '100%'}}>
                        <LinearProgress/>
                    </Box>
                ) : null}

                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 600}}>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column.key ? column.key : column.field}
                                               sortDirection={orderBy === (column.sortField ? column.sortField : column.field) ? orderDirection : false}>
                                        {column.sortable ?

                                            <TableSortLabel
                                                active={orderBy === column.sortField ? column.sortField : column.field}
                                                direction={orderBy === (column.sortField ? column.sortField : column.field) ? orderDirection : 'asc'}
                                                onClick={onSortChange(column.sortField ? column.sortField : column.field)}
                                            >
                                                {column.title}
                                            </TableSortLabel>
                                            :
                                            <div>{column.title}</div>
                                        }

                                    </TableCell>
                                ))}
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        {!loading ? (
                            <TableBody>
                                {rows !== undefined ? rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        {columns.map((column) => (
                                            getRowColumnCell(row, column)
                                        ))}
                                        <TableCell align="right" width={100}>
                                            <Button variant="outlined" onClick={onActionButtonClick(row)}>...</Button>
                                        </TableCell>
                                    </TableRow>
                                )) : []}
                            </TableBody>
                        ) : null
                        }
                    </Table>
                    {!noPagination ? (
                        <TablePagination component="div" count={totalCount} page={page}
                                         onPageChange={pageChange} onRowsPerPageChange={rowPerPageChange}
                                         rowsPerPage={rowsPerPage}/>
                    ) : ""}
                </TableContainer>
            </Paper>
            <Dialog open={dialogOpen} fullWidth onClose={onClose}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={onSubmit}>Сохранить</Button>
                    <Button variant="contained" onClick={onClose}>Отмена</Button>
                </DialogActions>
            </Dialog>
            <Actions branch={branch} items={rowActions}/>
            <ConfirmDialog
                open={deleteConfirmOpen}
                closeDialog={() => dispatch(setDeleteConfirmOpenAction(false, branch))}
                onConfirm={onDelete}
                message={PAGE_CRUD_CONSTANTS[branch].deleteFormTitle}
            />
        </Box>
    )
}

MainTable.propTypes = {
    rowActions: PropTypes.array.isRequired,
    branch: PropTypes.string.isRequired,
    noPagination: PropTypes.bool,
    fetchRequest: PropTypes.object
}

export default MainTable;