import {call, put} from "redux-saga/effects";
import {COLORS_BRANCH} from "../../constants/pages/page.constants";
import {FETCH_DATA} from "../../constants/crud.action.constants";
import {getColors} from "../../service/colors.service";

export function* fetchColorList(action) {
    const res = yield call(getColors, action.payload);
    yield put({branch: COLORS_BRANCH, type: `${COLORS_BRANCH}/${FETCH_DATA}`, payload: res});
}