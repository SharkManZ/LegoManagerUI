import {call, put} from "redux-saga/effects";
import {COLORS_BRANCH} from "../../constants/pages/page.constants";
import {DELETE_RESPONSE, FETCH_DATA, SAVE_RESPONSE} from "../../constants/crud.action.constants";
import {deleteColor, getColors, saveColor} from "../../service/colors.service";
import {SET_ERROR} from "../../constants/app.action.constants";

export function* fetchColorList(action) {
    try {
        const res = yield call(getColors, action.payload);
        yield put({branch: COLORS_BRANCH, type: `${COLORS_BRANCH}/${FETCH_DATA}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}

export function* removeColorRequest(action) {
    try {
        const res = yield call(deleteColor, action.payload);
        yield put({branch: COLORS_BRANCH, type: `${COLORS_BRANCH}/${DELETE_RESPONSE}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}

export function* saveColorRequest(action) {
    try {
        const res = yield call(saveColor, action.payload);
        yield put({branch: COLORS_BRANCH, type: `${COLORS_BRANCH}/${SAVE_RESPONSE}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}