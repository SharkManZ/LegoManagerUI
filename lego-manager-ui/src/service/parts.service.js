import httpClient from "./http.client";

export async function getParts({...params}) {
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
    if (params.filters !== undefined) {
        if (!!params.filters.category && !!params.filters.category.id) {
            requestParams.filters = [
                {
                    field: 'category.id',
                    operator: '=',
                    value: params.filters.category.id
                }
                ]
        }
    }

    const result = await httpClient.post("/lego-manager/parts/list", requestParams)
        .then(res => res.data)
        .catch(error => {
            params.enqueueSnackbar(params.listError + ':' + error, {variant: 'error'});
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

export async function savePart({...params}) {
    const result = await httpClient.post("/lego-manager/parts/save", params);
    return result.data;
}

export async function deletePart({...params}) {
    const result = await httpClient.post("/lego-manager/parts/" + params.id + "/delete");
    return result.data;
}