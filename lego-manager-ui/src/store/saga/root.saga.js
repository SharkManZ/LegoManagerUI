import {all, takeLatest} from 'redux-saga/effects'
import {
    COLORS_BRANCH,
    PART_CATEGORIES_BRANCH,
    PART_COLORS_BRANCH,
    PARTS_BRANCH,
    SERIES_BRANCH, SET_PARTS_BRANCH,
    SETS_BRANCH
} from "../../constants/pages/page.constants";
import {FETCH_DATA_REQUEST} from "../../constants/crud.action.constants";
import {fetchSetsList} from "./sets.saga";
import {fetchSeriesList} from "./series.saga";
import {fetchColorList} from "./colors.saga";
import {fetchPartCategoriesList} from "./part.categories.saga";
import {fetchPartsList} from "./parts.saga";
import {fetchPartColorList} from "./part.colors.saga";
import {fetchSetPartsList} from "./set.parts.saga";

export function* watchColorsList() {
    yield takeLatest(`${COLORS_BRANCH}/${FETCH_DATA_REQUEST}`, fetchColorList)
}

export function* watchSeriesList() {
    yield takeLatest(`${SERIES_BRANCH}/${FETCH_DATA_REQUEST}`, fetchSeriesList)
}

export function* watchSetsList() {
    yield takeLatest(`${SETS_BRANCH}/${FETCH_DATA_REQUEST}`, fetchSetsList)
}

export function* watchPartCategoriesList() {
    yield takeLatest(`${PART_CATEGORIES_BRANCH}/${FETCH_DATA_REQUEST}`, fetchPartCategoriesList)
}

export function* watchPartsList() {
    yield takeLatest(`${PARTS_BRANCH}/${FETCH_DATA_REQUEST}`, fetchPartsList)
}

export function* watchPartColorsList() {
    yield takeLatest(`${PART_COLORS_BRANCH}/${FETCH_DATA_REQUEST}`, fetchPartColorList)
}

export function* watchSetPartsList() {
    yield takeLatest(`${SET_PARTS_BRANCH}/${FETCH_DATA_REQUEST}`, fetchSetPartsList)
}

export function* rootSaga() {
    yield all([
        watchSetsList(),
        watchSeriesList(),
        watchColorsList(),
        watchPartCategoriesList(),
        watchPartsList(),
        watchPartColorsList(),
        watchSetPartsList()
    ])
}