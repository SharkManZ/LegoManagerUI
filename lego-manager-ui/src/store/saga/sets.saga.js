import {call, put} from 'redux-saga/effects';
import {SETS_BRANCH} from "../../constants/pages/page.constants";
import {DELETE_RESPONSE, FETCH_DATA, SAVE_RESPONSE} from "../../constants/crud.action.constants";
import {deleteSet, getSets, saveSet} from "../../service/sets.service";
import {SET_ERROR} from "../../constants/app.action.constants";

export function* fetchSetsList(action) {
    try {
        const res = yield call(getSets, action.payload);
        yield put({branch: SETS_BRANCH, type: `${SETS_BRANCH}/${FETCH_DATA}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}

export function* removeSetRequest(action) {
    try {
        const res = yield call(deleteSet, action.payload);
        yield put({branch: SETS_BRANCH, type: `${SETS_BRANCH}/${DELETE_RESPONSE}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}

export function* saveSetsRequest(action) {
    try {
        const res = yield call(saveSet, action.payload);
        yield put({branch: SETS_BRANCH, type: `${SETS_BRANCH}/${SAVE_RESPONSE}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}