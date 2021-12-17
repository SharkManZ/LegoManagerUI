import {getSeries} from "../../service/series.service";
import {call, put} from 'redux-saga/effects';
import {SERIES_BRANCH} from "../../constants/pages/page.constants";
import {FETCH_DATA} from "../../constants/crud.action.constants";

export function* fetchSeriesList(action) {
    const res = yield call(getSeries, action.payload);
    yield put({branch: SERIES_BRANCH, type: `${SERIES_BRANCH}/${FETCH_DATA}`, payload: res});
}