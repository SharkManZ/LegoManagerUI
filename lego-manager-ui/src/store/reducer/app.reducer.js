import {ERROR_TYPE, INFO_TYPE, SUCCESS_TYPE} from "../../constants/app.constants";
import {createSlice} from "@reduxjs/toolkit";

const defaultState = {
    msgType: null,
    msg: null,
    userId: null
}
export const appSlice = createSlice({
    name: 'app',
    initialState: defaultState,
    reducers: {
        setError: (state, action) => {
            state.msgType = ERROR_TYPE;
            state.msg = action.payload;
        },
        setInfo: (state, action) => {
            state.msgType = INFO_TYPE;
            state.msg = action.payload;
        },
        setSuccess: (state, action) => {
            state.msgType = SUCCESS_TYPE;
            state.msg = action.payload;
        },
        clearMsg: (state) => {
            state.msgType = null;
            state.msg = null;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        }
    }
});