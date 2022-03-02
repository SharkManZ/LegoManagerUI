import {call, put} from "redux-saga/effects";
import {USER_SETS_BRANCH} from "../../constants/pages/page.constants";
import {DELETE_RESPONSE, FETCH_DATA, SAVE_RESPONSE} from "../../constants/crud.action.constants";
import {SET_ERROR} from "../../constants/app.action.constants";
import {deleteUserSet, getUserSets, saveUserSet} from "../../service/users.sets.service";

export function* fetchUserSetsList(action) {
    try {
        const res = yield call(getUserSets, action.payload);
        yield put({branch: USER_SETS_BRANCH, type: `${USER_SETS_BRANCH}/${FETCH_DATA}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}

export function* removeUserSetRequest(action) {
    try {
        const res = yield call(deleteUserSet, action.payload);
        yield put({branch: USER_SETS_BRANCH, type: `${USER_SETS_BRANCH}/${DELETE_RESPONSE}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}

export function* saveUserSetRequest(action) {
    try {
        const res = yield call(saveUserSet, action.payload);
        yield put({branch: USER_SETS_BRANCH, type: `${USER_SETS_BRANCH}/${SAVE_RESPONSE}`, payload: res});
    } catch (error) {
        yield put({type: SET_ERROR, payload: error});
    }
}