import {call, put} from "redux-saga/effects";
import {PART_CATEGORIES_BRANCH} from "../../constants/pages/page.constants";
import {DELETE_RESPONSE, FETCH_DATA, SAVE_RESPONSE} from "../../constants/crud.action.constants";
import {deletePartCategory, getPartCategories, savePartCategory} from "../../service/part.categories.service";

export function* fetchPartCategoriesList(action) {
    const res = yield call(getPartCategories, action.payload);
    yield put({branch: PART_CATEGORIES_BRANCH, type: `${PART_CATEGORIES_BRANCH}/${FETCH_DATA}`, payload: res});
}

export function* removePartCategoryRequest(action) {
    const res = yield call(deletePartCategory, action.payload);
    yield put({branch: PART_CATEGORIES_BRANCH, type: `${PART_CATEGORIES_BRANCH}/${DELETE_RESPONSE}`, payload: res});
}

export function* savePartCategoryRequest(action) {
    const res = yield call(savePartCategory, action.payload);
    yield put({branch: PART_CATEGORIES_BRANCH, type: `${PART_CATEGORIES_BRANCH}/${SAVE_RESPONSE}`, payload: res});
}