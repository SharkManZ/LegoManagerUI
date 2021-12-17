import * as types from '../../constants/crud.action.constants';
import {FETCH_DATA_REQUEST} from "../../constants/crud.action.constants";

export const setTotalCountAction = (totalCount, branch) => ({
    branch,
    type: `${branch}/${types.SET_TOTAL_COUNT}`,
    payload: totalCount
});

export const setLoadingAction = (loading, branch) => ({
    branch,
    type: `${branch}/${types.SET_LOADING}`,
    payload: loading
})

export const setSearchAction = (search, branch) => ({
    branch,
    type: `${branch}/${types.SET_SEARCH}`,
    payload: search
})

export const setPageAction = (page, branch) => ({
    branch,
    type: `${branch}/${types.SET_PAGE}`,
    payload: page
})

export const setRowsPerPageAction = (rowsPerPage, branch) => ({
    branch,
    type: `${branch}/${types.SET_ROWS_PER_PAGE}`,
    payload: rowsPerPage
})

export const setOrderByAction = (orderBy, branch) => ({
    branch,
    type: `${branch}/${types.SET_ORDER_BY}`,
    payload: orderBy
})

export const setOrderDirectionAction = (orderDirection, branch) => ({
    branch,
    type: `${branch}/${types.SET_ORDER_DIRECTION}`,
    payload: orderDirection
})

export const fetchDataRequestAction = (request, branch) => ({
    branch,
    type: `${branch}/${types.FETCH_DATA_REQUEST}`,
    payload: request
})

export const fetchDataAction = (rows, branch) => ({
    branch,
    type: `${branch}/${types.FETCH_DATA}`,
    payload: rows
})

export const setFormOpenAction = (formOpen, title, branch) => ({
    branch,
    type: `${branch}/${types.SET_FORM_OPEN}`,
    payload: {
        open: formOpen,
        title: title
    }
})

export const setDeleteConfirmOpenAction = (deleteConfirmOpen, branch) => ({
    branch,
    type: `${branch}/${types.SET_DELETE_CONFIRM_OPEN}`,
    payload: deleteConfirmOpen
})

export const setActionAnchorElAction = (anchorEl, branch) => ({
    branch,
    type: `${branch}/${types.SET_ACTION_ANCHOR_EL}`,
    payload: anchorEl
})

export const setCurrentRowAction = (currentRow, branch) => ({
    branch,
    type: `${branch}/${types.SET_CURRENT_ROW}`,
    payload: currentRow
})