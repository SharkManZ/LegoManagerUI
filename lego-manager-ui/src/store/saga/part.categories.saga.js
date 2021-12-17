import {call, put} from "redux-saga/effects";
import {PART_CATEGORIES_BRANCH} from "../../constants/pages/page.constants";
import {FETCH_DATA} from "../../constants/crud.action.constants";
import {getPartCategories} from "../../service/part.categories.service";

export function* fetchPartCategoriesList(action) {
    const res = yield call(getPartCategories, action.payload);
    yield put({branch: PART_CATEGORIES_BRANCH, type: `${PART_CATEGORIES_BRANCH}/${FETCH_DATA}`, payload: res});
}