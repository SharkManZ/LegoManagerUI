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
            direction: params.orderDirection !== undefined ? params.orderDirection : 'asc'}];
    }
    const url = params.fetchRequest && params.fetchRequest.seriesId ?
        `/lego-manager/series/${params.fetchRequest.seriesId}/sets/list` :
        "/lego-manager/sets/list";
    const result = await httpClient.post(url, requestParams)
        .then(res => res.data)
        .catch(error => {
            params.enqueueSnackbar(params.listError + ':' + error, {variant:'error'});
            return {
                body: {
                    data: [],
                    totalCount: 0
                }
            }
        });
    return {
        data: result.body.data,
        totalCount: result.body.totalCount
    }
}

export async function getSetParts({...params}) {
    let requestParams = {
        search: params.search
    }

    const result = await httpClient.post(`/lego-manager/sets/${params.fetchRequest.setId}/part/list`, requestParams)
        .then(res => res.data.body)
        .catch(error => {
            params.enqueueSnackbar(params.listError + ':' + error, {variant: 'error'});
            return [];
        });
    return result;
}

export async function saveSet({...params}) {
    const result = await httpClient.post("/lego-manager/sets/save", params);
    return result.data;
}

export async function deleteSet({...params}) {
    const result = await httpClient.post("/lego-manager/sets/" + params.id + "/delete");
    return result.data;
}