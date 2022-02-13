import httpClient from "./http.client";

export async function getPartColors({...params}) {
    let requestParams = {
        value: params.search ? params.search.value : "",
        equals: params.search ? params.search.equals : false
    }
    const result = await httpClient.post(`/lego-manager/parts/${params.fetchRequest.partId}/color/list`, requestParams)
        .then(res => res.data.body)
        .catch(error => {
            params.enqueueSnackbar(params.listError + ':' + error, {variant: 'error'});
            return [];
        });
    return result;
}

export async function savePartColor({...params}) {
    const result = await httpClient.post("/lego-manager/part/colors/save", params);
    return result.data;
}

export async function deletePartColor({...params}) {
    const result = await httpClient.post("/lego-manager/part/colors/" + params.id + "/delete");
    return result.data;
}

export async function searchPartColor({...params}) {
    const result = await httpClient.post("/lego-manager/part/colors/search", params)
        .then(res => res.data.body)
        .catch(error => {
            params.enqueueSnackbar(error, {variant: 'error'});
            return undefined;
        })
    return result;
}