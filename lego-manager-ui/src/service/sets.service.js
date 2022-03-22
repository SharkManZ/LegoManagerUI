import httpClient from "./http.client";
import {BACKEND_ROOT} from "../constants/app.constants";

export async function getSets({...params}) {
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
    const url = params.fetchRequest && params.fetchRequest.seriesId ?
        BACKEND_ROOT + `/series/${params.fetchRequest.seriesId}/sets/list` :
        BACKEND_ROOT + "/sets/list";
    return await httpClient.post(url, requestParams)
        .then(res => {
            return {
                data: res.data.body.data,
                totalCount: res.data.body.totalCount
            }
        });
}

export async function getSetParts({...params}) {
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
    return await httpClient.post(BACKEND_ROOT + `/sets/${params.fetchRequest.setId}/part/list`, requestParams)
        .then(res => res.data.body);
}

export async function saveSet({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/sets/save", params)
        .then(res => res.data);
}

export async function deleteSet({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/sets/" + params.id + "/delete")
        .then(res => res.data);
}

export async function getSetSummary(setId) {
    return await httpClient.get(BACKEND_ROOT + "/sets/" + setId + "/summary")
        .then(res => res.data.body);
}

export async function getSetColors(setId) {
    return await httpClient.get(BACKEND_ROOT + "/sets/" + setId + "/color/list")
        .then(res => res.data.body);
}

export async function getSetPartCategories(setId) {
    return await httpClient.get(BACKEND_ROOT + "/sets/" + setId + "/partCategories/list")
        .then(res => res.data.body);
}

export async function searchSet({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/sets/search", params)
        .then(res => res.data.body);
}