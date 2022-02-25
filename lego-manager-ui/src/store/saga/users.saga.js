import {call, put} from "redux-saga/effects";
import {USERS_BRANCH} from "../../constants/pages/page.constants";
import {DELETE_RESPONSE, FETCH_DATA, SAVE_RESPONSE} from "../../constants/crud.action.constants";
import {SET_ERROR} from "../../constants/app.action.constants";
import {deleteUser, getUsers, saveUser} from "../../service/users.service";

export function* fetchUsersList(action) {
    try {
        const res = yield call(getUsers, action.payload);
        yield put({branch: USERS_BRANCH, type: `${USERS_BRANCH}/${FETCH_DATA}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}

export function* removeUserRequest(action) {
    try {
        const res = yield call(deleteUser, action.payload);
        yield put({branch: USERS_BRANCH, type: `${USERS_BRANCH}/${DELETE_RESPONSE}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}

export function* saveUserRequest(action) {
    try {
        const res = yield call(saveUser, action.payload);
        yield put({branch: USERS_BRANCH, type: `${USERS_BRANCH}/${SAVE_RESPONSE}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}