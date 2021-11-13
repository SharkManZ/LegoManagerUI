import httpClient from "./http.client";

export async function getSeries({...params}) {
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

    const result = await httpClient.post("/lego-manager/series/list", requestParams)
        .then(res => res.data)
        .catch(error => {
            params.enqueueSnackbar(params.listError + ': ' + error, {variant:'error'});
        });
    return {
        data: result.body.data,
        totalCount: result.body.totalCount
    }
}

export async function saveSeries({...params}) {
    const result = await httpClient.post("/lego-manager/series/save", params);
    return result.data;
}

export async function deleteSeries({...params}) {
    await httpClient.post("/lego=manager/series/" + params.id + "/delete");
}