import {call, put} from "redux-saga/effects";
import {PARTS_BRANCH} from "../../constants/pages/page.constants";
import {DELETE_RESPONSE, FETCH_DATA, SAVE_RESPONSE} from "../../constants/crud.action.constants";
import {deletePart, getParts, savePart} from "../../service/parts.service";

export function* fetchPartsList(action) {
    const res = yield call(getParts, action.payload);
    yield put({branch: PARTS_BRANCH, type: `${PARTS_BRANCH}/${FETCH_DATA}`, payload: res});
}

export function* removePartRequest(action) {
    const res = yield call(deletePart, action.payload);
    yield put({branch: PARTS_BRANCH, type: `${PARTS_BRANCH}/${DELETE_RESPONSE}`, payload: res});
}

export function* savePartRequest(action) {
    const res = yield call(savePart, action.payload);
    yield put({branch: PARTS_BRANCH, type: `${PARTS_BRANCH}/${SAVE_RESPONSE}`, payload: res});
}