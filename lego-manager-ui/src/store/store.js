import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga'
import imageListCrudReducer from "./reducer/imagelist.crud.reducer";
import gridCrudReducer from "./reducer/grid.crud.reducer";
import {
    COLORS_BRANCH,
    PART_CATEGORIES_BRANCH,
    PART_COLORS_BRANCH,
    PARTS_BRANCH,
    SERIES_BRANCH,
    SET_PARTS_BRANCH,
    SETS_BRANCH
} from "../constants/pages/page.constants";
import {rootSaga} from "./saga/root.saga";

function branchReducer(reducerFunction, name) {
    return (state, action) => {
        const {branch} = action;

        if (branch !== name && state !== undefined) {
            return state;
        }

        return reducerFunction(state, action);
    }
}

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    series: branchReducer(imageListCrudReducer, SERIES_BRANCH),
    sets: branchReducer(gridCrudReducer, SETS_BRANCH),
    colors: branchReducer(gridCrudReducer, COLORS_BRANCH),
    partCategories: branchReducer(gridCrudReducer, PART_CATEGORIES_BRANCH),
    parts: branchReducer(gridCrudReducer, PARTS_BRANCH),
    partColors: branchReducer(gridCrudReducer, PART_COLORS_BRANCH),
    setParts: branchReducer(gridCrudReducer, SET_PARTS_BRANCH)
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);