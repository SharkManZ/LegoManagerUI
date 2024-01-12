import {all, takeLatest} from 'redux-saga/effects'
import {
    COLORS_BRANCH,
    PART_CATEGORIES_BRANCH,
    PART_COLORS_BRANCH,
    PARTS_BRANCH,
    SERIES_BRANCH,
    SET_PARTS_BRANCH,
    SETS_BRANCH,
    USER_PARTS_BRANCH
} from "../../constants/pages/page.constants";
import {DELETE_REQUEST, FETCH_DATA_REQUEST, SAVE_REQUEST} from "../../constants/crud.action.constants";
import {fetchSetsList, removeSetRequest, saveSetsRequest} from "./sets.saga";
import {fetchSeriesList, removeSeriesRequest, saveSeriesRequest} from "./series.saga";
import {fetchColorList, removeColorRequest, saveColorRequest} from "./colors.saga";
import {fetchPartCategoriesList, removePartCategoryRequest, savePartCategoryRequest} from "./part.categories.saga";
import {fetchPartsList, removePartRequest, savePartRequest} from "./parts.saga";
import {fetchPartColorList, removePartColorRequest, savePartColorRequest} from "./part.colors.saga";
import {fetchSetPartsList, removeSetPartRequest, saveSetPartRequest} from "./set.parts.saga";
import {fetchUserPartsList, removeUserPartRequest, saveUserPartRequest} from "./user.parts.saga";

export function* watchColorsList() {
    yield takeLatest(`${COLORS_BRANCH}/${FETCH_DATA_REQUEST}`, fetchColorList)
}

export function* watchColorDelete() {
    yield takeLatest(`${COLORS_BRANCH}/${DELETE_REQUEST}`, removeColorRequest)
}

export function* watchColorSave() {
    yield takeLatest(`${COLORS_BRANCH}/${SAVE_REQUEST}`, saveColorRequest)
}

export function* watchUserPartsList() {
    yield takeLatest(`${USER_PARTS_BRANCH}/${FETCH_DATA_REQUEST}`, fetchUserPartsList)
}

export function* watchUserPartDelete() {
    yield takeLatest(`${USER_PARTS_BRANCH}/${DELETE_REQUEST}`, removeUserPartRequest)
}

export function* watchUserPartSave() {
    yield takeLatest(`${USER_PARTS_BRANCH}/${SAVE_REQUEST}`, saveUserPartRequest)
}

export function* watchSeriesList() {
    yield takeLatest(`${SERIES_BRANCH}/${FETCH_DATA_REQUEST}`, fetchSeriesList)
}

export function* watchSeriesSave() {
    yield takeLatest(`${SERIES_BRANCH}/${SAVE_REQUEST}`, saveSeriesRequest)
}

export function* watchSeriesDelete() {
    yield takeLatest(`${SERIES_BRANCH}/${DELETE_REQUEST}`, removeSeriesRequest)
}

export function* watchSetsList() {
    yield takeLatest(`${SETS_BRANCH}/${FETCH_DATA_REQUEST}`, fetchSetsList)
}

export function* watchSetDelete() {
    yield takeLatest(`${SETS_BRANCH}/${DELETE_REQUEST}`, removeSetRequest)
}

export function* watchSetSave() {
    yield takeLatest(`${SETS_BRANCH}/${SAVE_REQUEST}`, saveSetsRequest)
}

export function* watchPartCategoriesList() {
    yield takeLatest(`${PART_CATEGORIES_BRANCH}/${FETCH_DATA_REQUEST}`, fetchPartCategoriesList)
}

export function* watchPartCategoryDelete() {
    yield takeLatest(`${PART_CATEGORIES_BRANCH}/${DELETE_REQUEST}`, removePartCategoryRequest)
}

export function* watchPartCategorySave() {
    yield takeLatest(`${PART_CATEGORIES_BRANCH}/${SAVE_REQUEST}`, savePartCategoryRequest)
}

export function* watchPartsList() {
    yield takeLatest(`${PARTS_BRANCH}/${FETCH_DATA_REQUEST}`, fetchPartsList)
}

export function* watchPartDelete() {
    yield takeLatest(`${PARTS_BRANCH}/${DELETE_REQUEST}`, removePartRequest)
}

export function* watchPartSave() {
    yield takeLatest(`${PARTS_BRANCH}/${SAVE_REQUEST}`, savePartRequest)
}

export function* watchPartColorsList() {
    yield takeLatest(`${PART_COLORS_BRANCH}/${FETCH_DATA_REQUEST}`, fetchPartColorList)
}

export function* watchPartColorDelete() {
    yield takeLatest(`${PART_COLORS_BRANCH}/${DELETE_REQUEST}`, removePartColorRequest)
}

export function* watchPartColorSave() {
    yield takeLatest(`${PART_COLORS_BRANCH}/${SAVE_REQUEST}`, savePartColorRequest)
}


export function* watchSetPartsList() {
    yield takeLatest(`${SET_PARTS_BRANCH}/${FETCH_DATA_REQUEST}`, fetchSetPartsList)
}

export function* watchSetPartDelete() {
    yield takeLatest(`${SET_PARTS_BRANCH}/${DELETE_REQUEST}`, removeSetPartRequest)
}

export function* watchSetPartSave() {
    yield takeLatest(`${SET_PARTS_BRANCH}/${SAVE_REQUEST}`, saveSetPartRequest)
}

export function* rootSaga() {
    yield all([
        watchSetsList(),
        watchSetDelete(),
        watchSetSave(),
        watchSeriesList(),
        watchSeriesSave(),
        watchSeriesDelete(),
        watchColorsList(),
        watchColorDelete(),
        watchColorSave(),
        watchUserPartsList(),
        watchUserPartDelete(),
        watchUserPartSave(),
        watchPartCategoriesList(),
        watchPartCategoryDelete(),
        watchPartCategorySave(),
        watchPartsList(),
        watchPartDelete(),
        watchPartSave(),
        watchPartColorsList(),
        watchPartColorDelete(),
        watchPartColorSave(),
        watchSetPartsList(),
        watchSetPartDelete(),
        watchSetPartSave()
    ])
}