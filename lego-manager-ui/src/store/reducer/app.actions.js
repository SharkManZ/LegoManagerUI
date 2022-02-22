import {CLEAR_ERROR, SET_ERROR} from "../../constants/app.action.constants";

export const setErrorAction = (msg) => ({
    type: SET_ERROR,
    payload: msg
})

export const clearErrorAction = () => ({
    type: CLEAR_ERROR,
    payload: null
})