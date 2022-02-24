import httpClient from "./http.client";

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
        `/lego-manager/series/${params.fetchRequest.seriesId}/sets/list` :
        "/lego-manager/sets/list";
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
        search: params.search,
        filters: params.filters
    }
    return await httpClient.post(`/lego-manager/sets/${params.fetchRequest.setId}/part/list`, requestParams)
        .then(res => res.data.body);
}

export async function saveSet({...params}) {
    return await httpClient.post("/lego-manager/sets/save", params)
        .then(res => res.data);
}

export async function deleteSet({...params}) {
    return await httpClient.post("/lego-manager/sets/" + params.id + "/delete")
        .then(res => res.data);
}

export async function getSetSummary(setId) {
    return await httpClient.get("/lego-manager/sets/" + setId + "/summary")
        .then(res => res.data.body);
}

export async function getSetColors(setId) {
    return await httpClient.get("/lego-manager/sets/" + setId + "/color/list")
        .then(res => res.data.body);
}

export async function getSetPartCategories(setId) {
    return await httpClient.get("/lego-manager/sets/" + setId + "/partCategories/list")
        .then(res => res.data.body);
}