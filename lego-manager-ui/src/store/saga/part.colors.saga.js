import {call, put} from "redux-saga/effects";
import {PART_COLORS_BRANCH} from "../../constants/pages/page.constants";
import {FETCH_DATA} from "../../constants/crud.action.constants";
import {getPartColors} from "../../service/part.colors.service";

export function* fetchPartColorList(action) {
    const res = yield call(getPartColors, action.payload);
    yield put({branch: PART_COLORS_BRANCH, type: `${PART_COLORS_BRANCH}/${FETCH_DATA}`, payload: res});
}