import httpClient from "./http.client";
import {BACKEND_ROOT} from "../constants/app.constants";

export async function getColors({...params}) {
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

    return await httpClient.post(BACKEND_ROOT + "/colors/list", requestParams)
        .then(res => {
            return {
                data: res.data.body.data,
                totalCount: res.data.body.totalCount
            }
        });
}

export async function getAllColors() {
    return await httpClient.get(BACKEND_ROOT + "/colors/list/all")
        .then(res => res.data.body);
}


export async function saveColor({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/colors/save", params)
        .then(res => res.data);
}

export async function deleteColor({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/colors/" + params.id + "/delete")
        .then(res => res.data);
}