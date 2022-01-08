import * as types from '../../constants/crud.action.constants';
const defaultState = {
    rows: [],
    loading: false,
    totalCount: 0,
    search: '',
    page: 0,
    rowsPerPage: 10,
    orderBy: null,
    orderDirection: 'asc',
    formOpen: false,
    formTitle: null,
    deleteConfirmOpen: false,
    actionAnchorEl: null,
    currentRow: null
}
export default function gridCrudReducer(state = defaultState, action) {
    const {branch, type} = action;

    switch (type) {
        case `${branch}/${types.SET_TOTAL_COUNT}`:
            return {
                ...state,
                totalCount: action.payload
            }
        case `${branch}/${types.SET_LOADING}`:
            return {
                ...state,
                loading: action.payload
            }
        case `${branch}/${types.SET_SEARCH}`:
            return {
                ...state,
                search: action.payload
            }
        case `${branch}/${types.SET_PAGE}`:
            return {
                ...state,
                page: action.payload
            }
        case `${branch}/${types.SET_ROWS_PER_PAGE}`:
            return {
                ...state,
                rowsPerPage: action.payload
            }
        case `${branch}/${types.SET_ORDER_BY}`:
            return {
                ...state,
                orderBy: action.payload
            }
        case `${branch}/${types.SET_ORDER_DIRECTION}`:
            return {
                ...state,
                orderDirection: action.payload
            }
        case `${branch}/${types.FETCH_DATA_REQUEST}`:{
            return {
                ...state,
                formOpen: false,
                page: action.payload.page,
                totalCount: 0,
                loading: true,
                deleteConfirmOpen: false,
                actionAnchorEl: false,
                currentRow: null,
                rows: []
            }
        }
        case `${branch}/${types.FETCH_DATA}`: {
            return {
                ...state,
                loading: false,
                rows: Array.isArray(action.payload) ? action.payload : action.payload.data,
                totalCount: Array.isArray(action.payload) ? 0 : action.payload.totalCount
            }
        }
        case `${branch}/${types.SET_FORM_OPEN}`:
            return {
                ...state,
                formOpen: action.payload.open,
                formTitle: action.payload.title
            }
        case `${branch}/${types.SET_DELETE_CONFIRM_OPEN}`:
            return {
                ...state,
                deleteConfirmOpen: action.payload
            }
        case `${branch}/${types.SET_ACTION_ANCHOR_EL}`:
            return {
                ...state,
                actionAnchorEl: action.payload
            }
        case `${branch}/${types.SET_CURRENT_ROW}`:
            return {
                ...state,
                currentRow: action.payload
            }
        default:
            return state;
    }
}