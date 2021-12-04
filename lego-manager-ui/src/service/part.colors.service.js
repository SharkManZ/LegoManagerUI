import httpClient from "./http.client";

export async function getPartColors({...params}) {

    const result = await httpClient.post(`/lego-manager/parts/${params.partId}/color/list`)
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