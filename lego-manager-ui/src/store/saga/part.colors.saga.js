import {call, put} from "redux-saga/effects";
import {PART_COLORS_BRANCH, PARTS_BRANCH} from "../../constants/pages/page.constants";
import {
    DELETE_RESPONSE,
    FETCH_DATA,
    SAVE_RESPONSE,
    SET_NEED_MANUAL_REFRESH
} from "../../constants/crud.action.constants";
import {deletePartColor, getPartColors, savePartColor} from "../../service/part.colors.service";

export function* fetchPartColorList(action) {
    const res = yield call(getPartColors, action.payload);
    yield put({branch: PART_COLORS_BRANCH, type: `${PART_COLORS_BRANCH}/${FETCH_DATA}`, payload: res});
}

export function* removePartColorRequest(action) {
    const res = yield call(deletePartColor, action.payload);
    yield put({branch: PART_COLORS_BRANCH, type: `${PART_COLORS_BRANCH}/${DELETE_RESPONSE}`, payload: res});
    yield put({branch: PARTS_BRANCH, type: `${PARTS_BRANCH}/${SET_NEED_MANUAL_REFRESH}`, payload: true})
}

export function* savePartColorRequest(action) {
    const res = yield call(savePartColor, action.payload);
    yield put({branch: PART_COLORS_BRANCH, type: `${PART_COLORS_BRANCH}/${SAVE_RESPONSE}`, payload: res});
    yield put({branch: PARTS_BRANCH, type: `${PARTS_BRANCH}/${SET_NEED_MANUAL_REFRESH}`, payload: true})
}