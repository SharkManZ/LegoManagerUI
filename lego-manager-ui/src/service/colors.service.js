import httpClient from "./http.client";

export async function getColors({...params}) {
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

    const result = await httpClient.post("/lego-manager/colors/list", requestParams)
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

export async function getAllColors({...params}) {
    const result = await httpClient.get("/lego-manager/colors/list/all")
        .then(res => res.data.body)
        .catch(error => {
            params.enqueueSnackbar(error, {variant:'error'});
            return {
                body: []
            }
        });
    return result;
}


export async function saveColor({...params}) {
    const result = await httpClient.post("/lego-manager/colors/save", params);
    return result.data;
}

export async function deleteColor({...params}) {
    const result = await httpClient.post("/lego-manager/colors/" + params.id + "/delete");
    return result.data;
}