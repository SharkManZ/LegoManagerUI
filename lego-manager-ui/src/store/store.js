import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import imageListCrudReducer from "./imagelist.crud.reducer";
import gridCrudReducer from "./grid.crud.reducer";

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
    series: branchReducer(imageListCrudReducer, 'series'),
    sets: branchReducer(gridCrudReducer, 'sets')
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));