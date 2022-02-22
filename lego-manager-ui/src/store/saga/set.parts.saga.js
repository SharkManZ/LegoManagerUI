import {getSetParts} from "../../service/sets.service";
import {call, put} from "redux-saga/effects";
import {SET_PARTS_BRANCH} from "../../constants/pages/page.constants";
import {DELETE_RESPONSE, FETCH_DATA, SAVE_RESPONSE} from "../../constants/crud.action.constants";
import {deleteSetPart, saveSetPart} from "../../service/set.parts.service";
import {SET_ERROR} from "../../constants/app.action.constants";

export function* fetchSetPartsList(action) {
    try {
        const res = yield call(getSetParts, action.payload);
        yield put({branch: SET_PARTS_BRANCH, type: `${SET_PARTS_BRANCH}/${FETCH_DATA}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}

export function* removeSetPartRequest(action) {
    try {
        const res = yield call(deleteSetPart, action.payload);
        yield put({branch: SET_PARTS_BRANCH, type: `${SET_PARTS_BRANCH}/${DELETE_RESPONSE}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}

export function* saveSetPartRequest(action) {
    try {
        const res = yield call(saveSetPart, action.payload);
        yield put({branch: SET_PARTS_BRANCH, type: `${SET_PARTS_BRANCH}/${SAVE_RESPONSE}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}