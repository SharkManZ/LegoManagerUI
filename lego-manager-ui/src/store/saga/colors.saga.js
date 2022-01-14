import {call, put} from "redux-saga/effects";
import {COLORS_BRANCH} from "../../constants/pages/page.constants";
import {DELETE_RESPONSE, FETCH_DATA, SAVE_RESPONSE} from "../../constants/crud.action.constants";
import {deleteColor, getColors, saveColor} from "../../service/colors.service";

export function* fetchColorList(action) {
    const res = yield call(getColors, action.payload);
    yield put({branch: COLORS_BRANCH, type: `${COLORS_BRANCH}/${FETCH_DATA}`, payload: res});
}

export function* removeColorRequest(action) {
    const res = yield call(deleteColor, action.payload);
    yield put({branch: COLORS_BRANCH, type: `${COLORS_BRANCH}/${DELETE_RESPONSE}`, payload: res});
}

export function* saveColorRequest(action) {
    const res = yield call(saveColor, action.payload);
    yield put({branch: COLORS_BRANCH, type: `${COLORS_BRANCH}/${SAVE_RESPONSE}`, payload: res});
}