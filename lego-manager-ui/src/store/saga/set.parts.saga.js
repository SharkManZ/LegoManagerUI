import {getSetParts} from "../../service/sets.service";
import {call, put} from "redux-saga/effects";
import {SET_PARTS_BRANCH} from "../../constants/pages/page.constants";
import {DELETE_RESPONSE, FETCH_DATA, SAVE_RESPONSE} from "../../constants/crud.action.constants";
import {deleteSetPart, saveSetPart} from "../../service/set.parts.service";

export function* fetchSetPartsList(action) {
    const res = yield call(getSetParts, action.payload);
    yield put({branch: SET_PARTS_BRANCH, type: `${SET_PARTS_BRANCH}/${FETCH_DATA}`, payload: res});
}

export function* removeSetPartRequest(action) {
    const res = yield call(deleteSetPart, action.payload);
    yield put({branch: SET_PARTS_BRANCH, type: `${SET_PARTS_BRANCH}/${DELETE_RESPONSE}`, payload: res});
}

export function* saveSetPartRequest(action) {
    const res = yield call(saveSetPart, action.payload);
    yield put({branch: SET_PARTS_BRANCH, type: `${SET_PARTS_BRANCH}/${SAVE_RESPONSE}`, payload: res});
}