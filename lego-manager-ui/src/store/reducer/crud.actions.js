import * as types from '../../constants/crud.action.constants';

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

export const setFiltersAction = (filters, branch) => ({
    branch,
    type: `${branch}/${types.SET_FILTERS}`,
    payload: filters
})

export const fetchDataRequestAction = (request, branch) => ({
    branch,
    type: `${branch}/${types.FETCH_DATA_REQUEST}`,
    payload: request
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

export const setNeedRefreshAction = (branch) => ({
    branch,
    type: `${branch}/${types.SET_NEED_REFRESH}`,
    payload: null
})

export const deleteRequestAction = (id, branch) => ({
    branch,
    type: `${branch}/${types.DELETE_REQUEST}`,
    payload: id
})

export const saveRequestAction = (request, branch) => ({
    branch,
    type: `${branch}/${types.SAVE_REQUEST}`,
    payload: request
})