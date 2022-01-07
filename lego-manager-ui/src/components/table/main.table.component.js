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
    TableSortLabel
} from "@mui/material";
import {LinearProgress} from "@material-ui/core";
import TableContainer from "@mui/material/TableContainer";
import Actions from "../action/actions.component";
import ConfirmDialog from "../dialog/confirm.dialog.component";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setActionAnchorElAction,
    setCurrentRowAction,
    setDeleteConfirmOpenAction,
    setFormOpenAction,
    setOrderByAction,
    setOrderDirectionAction,
    setPageAction,
    setRowsPerPageAction
} from "../../store/reducer/crud.actions";
import {PAGE_CRUD_CONSTANTS} from "../../constants/pages/page.constants";
import {fetchFromObject} from "../../utils/object.utils";
import {makeStyles} from "@mui/styles";
import SearchField from "../fields/search.field.component";

const useStyles = makeStyles({
    root: {
        height: "auto",
        width: "auto",
        maxHeight: 50,
        maxWidth: 60,
        objectFit: 'cover'
    }
});

function MainTable({rowActions, columns, branch, onAdd, onSave, onDelete, noPagination = false, children}) {
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

    const onSortChange = (property) => (event) => {
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

    const onClose = (event) => {
        dispatch(setFormOpenAction(false, null, branch));
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

    const addDefaultImg = (event) => {
        event.target.src = "/empty.png";
    }

    const getRowColumnCell = (row, column) => {
        if (isImageColumn(column)) {
            return (
                <TableCell key={column.key ? column.key : column.field}>
                    <Box
                        style={{overflow: "hidden", textAlign: "center"}}>
                        <img src={`/${column.imageSource}/${row[column.field]}.png`}

                             loading="lazy"
                             onError={addDefaultImg}
                             className={classes.root}
                        />
                    </Box>
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
                        <Paper style={{backgroundColor: getColor(row, column)}} elevation={10}/>
                    </Box>

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
                                               sortDirection={orderBy === column.field ? orderDirection : false}>
                                        {column.sortable ?

                                            <TableSortLabel
                                                active={orderBy === column.field}
                                                direction={orderBy === column.field ? orderDirection : 'asc'}
                                                onClick={onSortChange(column.field)}
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
                    <Button variant="contained" onClick={() => onSave()}>Сохранить</Button>
                    <Button variant="contained" onClick={onClose}>Отмена</Button>
                </DialogActions>
            </Dialog>
            <Actions branch={branch} items={rowActions}/>
            <ConfirmDialog
                open={deleteConfirmOpen}
                closeDialog={() => dispatch(setDeleteConfirmOpenAction(false, branch))}
                onConfirm={() => {
                    dispatch(setActionAnchorElAction(null, branch));
                    onDelete(currentRow.id);
                }}
                message={PAGE_CRUD_CONSTANTS[branch].deleteFormTitle}
            />
        </Box>
    )
}

export default MainTable;