import httpClient from "./http.client";
import {BACKEND_ROOT} from "../constants/app.constants";

export async function getUserSets({...params}) {
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

    return await httpClient.post(BACKEND_ROOT + "/userSet/" + params.fetchRequest.userId + "/list", requestParams)
        .then(res => {
            return {
                data: res.data.body.data,
                totalCount: res.data.body.totalCount
            }
        });
}

export async function saveUserSet({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/userSet/save", params)
        .then(res => res.data);
}

export async function deleteUserSet({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/userSet/" + params.id + "/delete")
        .then(res => res.data);
}