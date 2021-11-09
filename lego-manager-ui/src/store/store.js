import {combineReducers} from "redux";
import {createStore, applyMiddleware} from "redux";
import crudReducer from './crud.reducer';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

function branchReducer (reducerFunction, name) {
    return (state, action) => {
        const {branch} = action;

        if (branch !== name && state !== undefined) {
            return state;
        }

        return reducerFunction(state, action);
    }
}

const rootReducer = combineReducers({
    series: branchReducer(crudReducer, 'series')
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));