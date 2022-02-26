import {CLEAR_MSG, SET_ERROR, SET_INFO, SET_SUCCESS, SET_USER} from "../../constants/app.action.constants";
import {ERROR_TYPE, INFO_TYPE, SUCCESS_TYPE} from "../../constants/app.constants";

const defaultState = {
    msgType: null,
    msg: null,
    userId: null
}

export default function appReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_ERROR :
            return {
                ...state,
                msgType: ERROR_TYPE,
                msg: action.payload
            }
        case SET_INFO :
            return {
                ...state,
                msgType: INFO_TYPE,
                msg: action.payload
            }
        case SET_SUCCESS :
            return {
                ...state,
                msgType: SUCCESS_TYPE,
                msg: action.payload
            }
        case CLEAR_MSG:
            return {
                ...state,
                msgType: null,
                msg: null
            }
        case SET_USER:
            return {
                ...state,
                userId: action.payload
            }
        default:
            return state;
    }
}