import httpClient from "./http.client";

export async function getPartCategories({...params}) {
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

    const result = await httpClient.post("/lego-manager/part/category/list", requestParams)
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

export async function savePartCategory({...params}) {
    const result = await httpClient.post("/lego-manager/part/category/save", params);
    return result.data;
}

export async function deletePartCategory({...params}) {
    const result = await httpClient.post("/lego-manager/part/category/" + params.id + "/delete");
    return result.data;
}