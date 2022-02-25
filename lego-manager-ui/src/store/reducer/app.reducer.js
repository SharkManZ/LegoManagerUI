import {CLEAR_MSG, SET_ERROR, SET_INFO, SET_SUCCESS} from "../../constants/app.action.constants";
import {ERROR_TYPE, INFO_TYPE, SUCCESS_TYPE} from "../../constants/app.constants";

const defaultState = {
    msgType: null,
    msg: null
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
        default:
            return state;
    }
}