import {call, put} from "redux-saga/effects";
import {PART_CATEGORIES_BRANCH} from "../../constants/pages/page.constants";
import {DELETE_RESPONSE, FETCH_DATA, SAVE_RESPONSE} from "../../constants/crud.action.constants";
import {deletePartCategory, getPartCategories, savePartCategory} from "../../service/part.categories.service";
import {SET_ERROR} from "../../constants/app.action.constants";

export function* fetchPartCategoriesList(action) {
    try {
        const res = yield call(getPartCategories, action.payload);
        yield put({branch: PART_CATEGORIES_BRANCH, type: `${PART_CATEGORIES_BRANCH}/${FETCH_DATA}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}

export function* removePartCategoryRequest(action) {
    try {
        const res = yield call(deletePartCategory, action.payload);
        yield put({branch: PART_CATEGORIES_BRANCH, type: `${PART_CATEGORIES_BRANCH}/${DELETE_RESPONSE}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}

export function* savePartCategoryRequest(action) {
    try {
        const res = yield call(savePartCategory, action.payload);
        yield put({branch: PART_CATEGORIES_BRANCH, type: `${PART_CATEGORIES_BRANCH}/${SAVE_RESPONSE}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}