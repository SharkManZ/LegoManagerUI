import {deleteSeries, getSeries, saveSeries} from "../../service/series.service";
import {call, put} from 'redux-saga/effects';
import {SERIES_BRANCH} from "../../constants/pages/page.constants";
import {DELETE_RESPONSE, FETCH_DATA, SAVE_RESPONSE} from "../../constants/crud.action.constants";

export function* fetchSeriesList(action) {
    const res = yield call(getSeries, action.payload);
    yield put({branch: SERIES_BRANCH, type: `${SERIES_BRANCH}/${FETCH_DATA}`, payload: res});
}

export function* saveSeriesRequest(action) {
    console.log('saga');
    const res = yield call(saveSeries, action.payload);
    yield put({branch: SERIES_BRANCH, type: `${SERIES_BRANCH}/${SAVE_RESPONSE}`, payload: res});
}

export function* removeSeriesRequest(action) {
    const res = yield call(deleteSeries, action.payload);
    yield put({branch: SERIES_BRANCH, type: `${SERIES_BRANCH}/${DELETE_RESPONSE}`, payload: res});
}