import {CLEAR_MSG, SET_ERROR, SET_INFO, SET_SUCCESS} from "../../constants/app.action.constants";

export const setErrorAction = (msg) => ({
    type: SET_ERROR,
    payload: msg
})

export const setInfoAction = (msg) => ({
    type: SET_INFO,
    payload: msg
})

export const setSuccessAction = (msg) => ({
    type: SET_SUCCESS,
    payload: msg
})

export const clearMsgAction = () => ({
    type: CLEAR_MSG,
    payload: null
})