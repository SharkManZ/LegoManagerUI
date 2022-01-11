import {getSetParts} from "../../service/sets.service";
import {call, put} from "redux-saga/effects";
import {SET_PARTS_BRANCH} from "../../constants/pages/page.constants";
import {FETCH_DATA} from "../../constants/crud.action.constants";

export function* fetchSetPartsList(action) {
    const res = yield call(getSetParts, action.payload);
    yield put({branch: SET_PARTS_BRANCH, type: `${SET_PARTS_BRANCH}/${FETCH_DATA}`, payload: res});
}