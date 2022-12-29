import {call, put} from "redux-saga/effects";
import {USER_PARTS_BRANCH} from "../../constants/pages/page.constants";
import {DELETE_RESPONSE, FETCH_DATA, SAVE_RESPONSE} from "../../constants/crud.action.constants";
import {SET_ERROR} from "../../constants/app.action.constants";
import {deleteUserPart, getUserParts, saveUserPart} from "../../service/users.parts.service";

export function* fetchUserPartsList(action) {
    try {
        const res = yield call(getUserParts, action.payload);
        yield put({branch: USER_PARTS_BRANCH, type: `${USER_PARTS_BRANCH}/${FETCH_DATA}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}

export function* removeUserPartRequest(action) {
    try {
        const res = yield call(deleteUserPart, action.payload);
        yield put({branch: USER_PARTS_BRANCH, type: `${USER_PARTS_BRANCH}/${DELETE_RESPONSE}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}

export function* saveUserPartRequest(action) {
    try {
        const res = yield call(saveUserPart, action.payload);
        yield put({branch: USER_PARTS_BRANCH, type: `${USER_PARTS_BRANCH}/${SAVE_RESPONSE}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}