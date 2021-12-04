import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import imageListCrudReducer from "./imagelist.crud.reducer";
import gridCrudReducer from "./grid.crud.reducer";
import {
    COLORS_BRANCH,
    PARTS_BRANCH,
    PART_CATEGORIES_BRANCH,
    SERIES_BRANCH,
    SETS_BRANCH, PART_COLORS_BRANCH, SET_PARTS_BRANCH
} from "../constants/pages/page.constants";

function branchReducer(reducerFunction, name) {
    return (state, action) => {
        const {branch} = action;

        if (branch !== name && state !== undefined) {
            return state;
        }

        return reducerFunction(state, action);
    }
}

const rootReducer = combineReducers({
    series: branchReducer(imageListCrudReducer, SERIES_BRANCH),
    sets: branchReducer(gridCrudReducer, SETS_BRANCH),
    colors: branchReducer(gridCrudReducer, COLORS_BRANCH),
    partCategories: branchReducer(gridCrudReducer, PART_CATEGORIES_BRANCH),
    parts: branchReducer(gridCrudReducer, PARTS_BRANCH),
    partColors: branchReducer(gridCrudReducer, PART_COLORS_BRANCH),
    setParts: branchReducer(gridCrudReducer, SET_PARTS_BRANCH)
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));