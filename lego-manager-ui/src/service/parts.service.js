import httpClient from "./http.client";
import {BACKEND_ROOT} from "../constants/app.constants";

export async function getParts({...params}) {
    let requestParams = {
        page: params.page,
        size: params.rowsPerPage,
        search: params.search,
        filters: params.filters
    }

    if (params.orderBy !== undefined && params.orderBy !== null) {
        requestParams.sorts = [{
            field: params.orderBy,
            direction: params.orderDirection !== undefined ? params.orderDirection : 'asc'
        }];
    }

    return await httpClient.post(BACKEND_ROOT + "/parts/list", requestParams)
        .then(res => {
            return {
                data: res.data.body.data,
                totalCount: res.data.body.totalCount
            }
        })
}

export async function savePart({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/parts/save", params)
        .then(res => res.data);
}

export async function deletePart({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/parts/" + params.id + "/delete")
        .then(res => res.data);
}