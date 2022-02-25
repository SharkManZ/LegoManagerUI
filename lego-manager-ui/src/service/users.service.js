import httpClient from "./http.client";
import {BACKEND_ROOT} from "../constants/app.constants";

export async function getUsers({...params}) {
    let requestParams = {
        page: params.page,
        size: params.rowsPerPage,
        search: params.search
    }

    if (params.orderBy !== undefined && params.orderBy !== null) {
        requestParams.sorts = [{
            field: params.orderBy,
            direction: params.orderDirection !== undefined ? params.orderDirection : 'asc'
        }];
    }

    return await httpClient.post(BACKEND_ROOT + "/users/list", requestParams)
        .then(res => {
            return {
                data: res.data.body.data,
                totalCount: res.data.body.totalCount
            }
        });
}

export async function getAllUsers() {
    return await httpClient.get(BACKEND_ROOT + "/users/list/all")
        .then(res => res.data.body);
}


export async function saveUser({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/users/save", params)
        .then(res => res.data);
}

export async function deleteUser({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/users/" + params.id + "/delete")
        .then(res => res.data);
}