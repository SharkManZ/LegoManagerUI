import httpClient from "./http.client";
import {BACKEND_ROOT} from "../constants/app.constants";

export async function getUserParts({...params}) {
    let requestParams = {
        page: params.page,
        size: params.rowsPerPage,
        search: params.search,
        filters: params.filters,
        requestType: params.fetchRequest.requestType
    }

    if (params.orderBy !== undefined && params.orderBy !== null) {
        requestParams.sorts = [{
            field: params.orderBy,
            direction: params.orderDirection !== undefined ? params.orderDirection : 'asc'
        }];
    }

    return await httpClient.post(BACKEND_ROOT + "/userPart/" + params.fetchRequest.userId + "/list", requestParams)
        .then(res => {
            return {
                data: res.data.body.data,
                totalCount: res.data.body.totalCount
            }
        });
}

export async function saveUserPart({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/userPart/save", params)
        .then(res => res.data);
}

export async function deleteUserPart({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/userPart/" + params.id + "/delete")
        .then(res => res.data);
}