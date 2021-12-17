import {call, put} from "redux-saga/effects";
import {PARTS_BRANCH} from "../../constants/pages/page.constants";
import {FETCH_DATA} from "../../constants/crud.action.constants";
import {getParts} from "../../service/parts.service";

export function* fetchPartsList(action) {
    const res = yield call(getParts, action.payload);
    yield put({branch: PARTS_BRANCH, type: `${PARTS_BRANCH}/${FETCH_DATA}`, payload: res});
}