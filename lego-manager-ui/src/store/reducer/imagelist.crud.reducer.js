import * as types from '../../constants/crud.action.constants';
import {PAGE_CRUD_CONSTANTS} from "../../constants/pages/page.constants";
import {ADD_FORM_ACTION, EDIT_FORM_ACTION} from "../../constants/crud.constants";
import {DELETE_REQUEST, DELETE_RESPONSE, SAVE_REQUEST, SAVE_RESPONSE} from "../../constants/crud.action.constants";
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
    currentRow: null,
    formAction: null
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
        case `${branch}/${types.FETCH_DATA_REQUEST}`:{
            return {
                ...state,
                formOpen: false,
                page: action.payload.page +1,
                totalCount: 0,
                deleteConfirmOpen: false,
                actionAnchorEl: false,
                rows: []
            }
        }
        case `${branch}/${types.FETCH_DATA}`:
            return {
                ...state,
                rows: action.payload.data,
                totalCount: action.payload.totalCount
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
                deleteConfirmOpen: action.payload.deleteConfirmOpen,
                currentRow: {id: action.payload.id}
            }
        case `${branch}/${types.SET_ACTION_ANCHOR_EL}`:
            return {
                ...state,
                actionAnchorEl: action.payload
            }
        case `${branch}/${types.ADD_FORM_OPEN}`:
            return {
                ...state,
                formOpen: true,
                formTitle: PAGE_CRUD_CONSTANTS[branch].addFormTitle,
                formAction: ADD_FORM_ACTION
            }
        case `${branch}/${types.EDIT_FORM_OPEN}`:
            return {
                ...state,
                formOpen: true,
                formTitle: PAGE_CRUD_CONSTANTS[branch].editFormTitle,
                formAction: EDIT_FORM_ACTION,
                currentRow: action.payload,
                actionAnchorEl: null
            }
        case `${branch}/${types.SET_FORM_ACTION}`:
            return {
                ...state,
                formAction: action.payload
            }
        case `${branch}/${DELETE_REQUEST}`:
            return state;
        case `${branch}/${DELETE_RESPONSE}`:
            return {
                ...state,
                formOpen: false,
                deleteConfirmOpen: false,
                actionAnchorEl: null,
                currentRow: null,
                page: 0,
                needRefresh: true,
                formAction: null
            }
        case `${branch}/${SAVE_REQUEST}`:
            return {
                ...state,
                formAction: null
            };
        case `${branch}/${SAVE_RESPONSE}`:
            return {
                ...state,
                formOpen: false,
                deleteConfirmOpen: false,
                actionAnchorEl: null,
                currentRow: null,
                page: 0,
                needRefresh: true
            }
        default:
            return state;
    }
}