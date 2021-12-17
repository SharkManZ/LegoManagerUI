import {call, put} from 'redux-saga/effects';
import {SETS_BRANCH} from "../../constants/pages/page.constants";
import {FETCH_DATA} from "../../constants/crud.action.constants";
import {getSets} from "../../service/sets.service";

export function* fetchSetsList(action) {
    const res = yield call(getSets, action.payload);
    yield put({branch: SETS_BRANCH, type: `${SETS_BRANCH}/${FETCH_DATA}`, payload: res});
}