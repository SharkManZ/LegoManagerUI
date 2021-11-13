import * as types from '../constants/crud.action.constants';
const defaultState = {
    rows: [],
    totalCount: 0,
    search: '',
    page: 1,
    rowsPerPage: 9,
    formOpen: false,
    formTitle: null,
    deleteConfirmOpen: false,
    actionAnchorEl: null,
    currentRow: null
}
export default function imageListCrudReducer(state = defaultState, action) {
    const {branch, type} = action;

    switch (type) {
        case `${branch}/${types.SET_TOTAL_COUNT}`:
            return {
                ...state,
                totalCount: action.payload
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
        case `${branch}/${types.FETCH_DATA}`:
            return {
                ...state,
                rows: action.payload
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