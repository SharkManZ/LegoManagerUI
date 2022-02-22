import {call, put} from "redux-saga/effects";
import {PARTS_BRANCH} from "../../constants/pages/page.constants";
import {DELETE_RESPONSE, FETCH_DATA, SAVE_RESPONSE} from "../../constants/crud.action.constants";
import {deletePart, getParts, savePart} from "../../service/parts.service";
import {SET_ERROR} from "../../constants/app.action.constants";

export function* fetchPartsList(action) {
    try {
        const res = yield call(getParts, action.payload);
        yield put({branch: PARTS_BRANCH, type: `${PARTS_BRANCH}/${FETCH_DATA}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}

export function* removePartRequest(action) {
    try {
        const res = yield call(deletePart, action.payload);
        yield put({branch: PARTS_BRANCH, type: `${PARTS_BRANCH}/${DELETE_RESPONSE}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}

export function* savePartRequest(action) {
    try {
        const res = yield call(savePart, action.payload);
        yield put({branch: PARTS_BRANCH, type: `${PARTS_BRANCH}/${SAVE_RESPONSE}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}