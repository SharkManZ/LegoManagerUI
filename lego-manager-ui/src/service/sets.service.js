import httpClient from "./http.client";

export async function getSets({...params}) {
    let requestParams = {
        page: params.page,
        size: params.rowsPerPage,
        search: params.search
    }

    if (params.orderBy !== undefined && params.orderBy !== null) {
        requestParams.sorts = [{
            field: params.orderBy,
            direction: params.orderDirection !== undefined ? params.orderDirection : 'asc'}];
    }
    if (params.filters !== undefined) {
        if (!!params.filters.year) {
            requestParams.filters = [
                {
                    field: 'year',
                    operator: '=',
                    value: params.filters.year
                }
            ]
        }
        if (!!params.filters.series && !!params.filters.series.id) {
            if (requestParams.filters === undefined) {
                requestParams.filters = []
            }
            requestParams.filters.push({
                field: 'series.id',
                operator: '=',
                value: params.filters.series.id
            })
        }
    }

    const result = await httpClient.post("/lego-manager/sets/list", requestParams)
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

    const result = await httpClient.post(`/lego-manager/sets/${params.setId}/part/list`, requestParams)
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