import {call, put} from "redux-saga/effects";
import {PART_COLORS_BRANCH, PARTS_BRANCH} from "../../constants/pages/page.constants";
import {
    DELETE_RESPONSE,
    FETCH_DATA,
    SAVE_RESPONSE,
    SET_NEED_MANUAL_REFRESH
} from "../../constants/crud.action.constants";
import {deletePartColor, getPartColors, savePartColor} from "../../service/part.colors.service";
import {SET_ERROR} from "../../constants/app.action.constants";

export function* fetchPartColorList(action) {
    try {
        const res = yield call(getPartColors, action.payload);
        yield put({branch: PART_COLORS_BRANCH, type: `${PART_COLORS_BRANCH}/${FETCH_DATA}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}

export function* removePartColorRequest(action) {
    try {
        const res = yield call(deletePartColor, action.payload);
        yield put({branch: PART_COLORS_BRANCH, type: `${PART_COLORS_BRANCH}/${DELETE_RESPONSE}`, payload: res});
        yield put({branch: PARTS_BRANCH, type: `${PARTS_BRANCH}/${SET_NEED_MANUAL_REFRESH}`, payload: true})
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}

export function* savePartColorRequest(action) {
    try {
        const res = yield call(savePartColor, action.payload);
        yield put({branch: PART_COLORS_BRANCH, type: `${PART_COLORS_BRANCH}/${SAVE_RESPONSE}`, payload: res});
        yield put({branch: PARTS_BRANCH, type: `${PARTS_BRANCH}/${SET_NEED_MANUAL_REFRESH}`, payload: true})
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}