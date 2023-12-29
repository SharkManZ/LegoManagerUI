import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {
    Button,
    LinearProgress,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Actions from "../action/actions.component";
import React, {useEffect, useState} from "react";
import SearchField from "../fields/search.field.component";
import PropTypes from "prop-types";
import MainTableStackColorCell from "./main.table.stack.color.cell";
import MainTableImageCell from "./main.table.image.cell";
import MainTableColorCell from "./main.table.color.cell";
import MainTableTextCell from "./main.table.text.cell";

function MainTable({
                       rowActions,
                       addAction,
                       columns,
                       grid,
                       queryData,
                       fetchFunction,
                       rows,
                       setCurrentRow,
                       noPagination = false,
                       loading,
                       fetchRequest,
                   }) {

    const [anchorElId, setAnchorElId] = useState();

    /**
     * Установка значения поиска в параметрах грида.
     */
    const onSearchCallback = (value) => {
        grid.setPage(0);
        grid.setSearch(value);
    }

    /**
     * Установка значения сортировки в параметрах грида.
     */
    const onSortChange = (property) => () => {
        grid.setOrderBy(property);
        grid.setOrderDirection(grid.orderDirection === 'asc' ? 'desc' : 'asc');
    }

    /**
     * Нажатие на кнопку действия на строке. Вызов меню действий по строке.
     */
    const onActionButtonClick = row => (event) => {
        setAnchorElId(event.currentTarget.id);
        setCurrentRow(row);
    }

    /**
     * Запрос данных грида при изменении перечисленных парамеров.
     */
    useEffect(() => {
        fetchFunction(false);
    }, [queryData.size, queryData.page, queryData.search, JSON.stringify(queryData.sorts)])

    /**
     * Проверяет содержит ли колонка изображение.
     */
    const isImageColumn = (column) => {
        return column.isImage !== undefined && column.isImage;
    }

    /**
     * Возвращает значение колонки в зависимости от ее типа.
     */
    const getRowColumnCell = (row, column) => {
        if (isImageColumn(column)) {
            return (
                <MainTableImageCell row={row} column={column}/>
            )
        } else if (column.type === 'color') {
            return (
                <MainTableColorCell row={row} column={column}/>
            )
        } else if (column.type === 'colors') {
            return (
                <MainTableStackColorCell row={row} column={column}/>
            )
        } else {
            return (
                <MainTableTextCell row={row} column={column}/>
            )
        }
    }

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <Box m={2} paddingTop={2}>
                    <Stack direction="row" spacing={2}>
                        <SearchField onSearchCallback={onSearchCallback} search={grid.search}/>
                        {addAction ? (<Button variant="contained" onClick={addAction}>Добавить</Button>) : null}
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
                                               sortDirection={grid.orderBy === (column.sortField ? column.sortField : column.field) ? grid.orderDirection : false}
                                    >
                                        {column.sortable ?

                                            <TableSortLabel
                                                active={grid.orderBy === (column.sortField ? column.sortField : column.field)}
                                                direction={grid.orderBy === (column.sortField ? column.sortField : column.field) ? grid.orderDirection : 'asc'}
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
                                            <Button id={'actionBtn_' + row.id} variant="outlined"
                                                    onClick={onActionButtonClick(row)}>...</Button>
                                        </TableCell>
                                    </TableRow>
                                )) : []}
                            </TableBody>
                        ) : null
                        }
                    </Table>
                    {!noPagination ? (
                        <TablePagination component="div" count={grid.total} page={grid.page}
                                         onPageChange={(event, page) => grid.setPage(page)}
                                         onRowsPerPageChange={(event) => grid.setSize(event.target.value)}
                                         rowsPerPage={grid.size}/>
                    ) : ""}
                </TableContainer>
            </Paper>
            <Actions anchorElId={anchorElId} setAnchorElId={setAnchorElId} items={rowActions}/>
        </Box>
    )
}

MainTable.propTypes = {
    noPagination: PropTypes.bool,
    fetchRequest: PropTypes.object
}

export default MainTable;