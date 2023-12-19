import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {
    Button,
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
import TableContainer from "@mui/material/TableContainer";
import Actions from "../action/actions.component";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {fetchFromObject} from "../../utils/object.utils";
import {makeStyles} from "@mui/styles";
import SearchField from "../fields/search.field.component";
import PropTypes from "prop-types";
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

function MainTable({
                       rowActions, addAction, columns, grid, rows, setCurrentRow, noPagination = false,
                       fetchRequest, children
                   }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = false;
    const [anchorElId, setAnchorElId] = useState();


    // const totalCount = useSelector(state => state[branch].totalCount);
    // const loading = useSelector(state => state[branch].loading);
    // const rows = useSelector(state => state[branch].rows);
    // const page = useSelector(state => state[branch].page);
    // const rowsPerPage = useSelector(state => state[branch].rowsPerPage);
    // const orderDirection = useSelector(state => state[branch].orderDirection);
    // const orderBy = useSelector(state => state[branch].orderBy);
    // const dialogOpen = useSelector(state => state[branch].formOpen);
    // const dialogTitle = useSelector(state => state[branch].formTitle);
    // const deleteConfirmOpen = useSelector(state => state[branch].deleteConfirmOpen);
    // const currentRow = useSelector(state => state[branch].currentRow);
    // const needRefresh = useSelector(state => state[branch].needRefresh);
    // const prevNeedRefresh = useRef(null);
    // const search = useSelector(state => state[branch].search);
    // const filters = useSelector(state => state[branch].filters);

    const onSearchCallback = (value) => {
        grid.setSearch(value);
    }

    const onSortChange = (property) => () => {
        grid.setOrderBy(property);
        grid.setOrderDirection(grid.orderDirection === 'asc' ? 'desc' : 'asc');
    }

    const onActionButtonClick = row => (event) => {
        setAnchorElId(event.currentTarget.id);
        setCurrentRow(row);
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
        let mainValue = fetchFromObject(row, column.field);
        let additionalValue;
        let combineValue;
        if (column.additionalField && fetchFromObject(row, column.additionalField)) {
            additionalValue = fetchFromObject(row, column.additionalField);
            combineValue = mainValue + ' (' + additionalValue + ')';
        } else {
            combineValue = mainValue;
        }
        if (column.colorDiff) {
            let color;
            let secondValue = additionalValue ? additionalValue : 0;
            if (mainValue < secondValue) {
                color = column.colorDiff.lower;
            } else if (mainValue > secondValue) {
                color = column.colorDiff.greater
            } else {
                color = column.colorDiff.equals;
            }
            return (<div style={{color: color}}>{combineValue}</div>);
        }
        return combineValue;
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
        let fileName = getImageFileName(row, column);
        return (
            <Box
                style={{overflow: "hidden", textAlign: "center"}}>
                <img src={`/${column.imageSource}/${fileName}.png`}
                     alt={`Деталь /${column.imageSource}/${row[column.field]}.png`}
                     loading="lazy"
                     onError={addDefaultImg}
                     className={classes.root}
                />
            </Box>
        )
    }

    function getImageFileName(row, column) {
        if (column.field.includes('+')) {
            return column.field.split('+').map(val => fetchFromObject(row, val)).join('_');
        } else {
            return fetchFromObject(row, column.field);
        }
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

    // // запрос данных при изменении поиска, страницы, кол-ва элементов на странице, сортировки
    // useEffect(() => {
    //
    //     // обновление данных из-за изменения признака необходимости обновить
    //     if (needRefresh !== prevNeedRefresh.current) {
    //         if (prevNeedRefresh.current && needRefresh === false) {
    //             prevNeedRefresh.current = needRefresh;
    //             return;
    //         }
    //         prevNeedRefresh.current = needRefresh;
    //     }
    //     fetchData();
    // }, [search, page, rowsPerPage, orderBy, orderDirection, needRefresh, JSON.stringify(filters)])

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <Box m={2} paddingTop={2}>
                    <Stack direction="row" spacing={2}>
                        <SearchField onSearchCallback={onSearchCallback}/>
                        {addAction ? (<Button variant="contained" onClick={addAction}>Добавить</Button>) : null}
                    </Stack>
                </Box>
                {/*{loading ? (*/}
                {/*    <Box sx={{width: '100%'}}>*/}
                {/*        <LinearProgress/>*/}
                {/*    </Box>*/}
                {/*) : null}*/}

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