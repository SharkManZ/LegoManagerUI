import {CLEAR_ERROR, SET_ERROR} from "../../constants/app.action.constants";

const defaultState = {
    errorMsg: null
}

export default function appReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_ERROR :
            return {
                ...state,
                errorMsg: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                errorMsg: null
            }
        default:
            return state;
    }
}