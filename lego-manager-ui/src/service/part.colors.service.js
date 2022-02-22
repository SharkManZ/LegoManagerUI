import httpClient from "./http.client";

export async function getPartColors({...params}) {
    let requestParams = {
        value: params.search ? params.search.value : "",
        equals: params.search ? params.search.equals : false
    }
    return await httpClient.post(`/lego-manager/parts/${params.fetchRequest.partId}/color/list`, requestParams)
        .then(res => res.data.body);
}

export async function savePartColor({...params}) {
    return await httpClient.post("/lego-manager/part/colors/save", params)
        .then(res => res.data);
}

export async function deletePartColor({...params}) {
    return await httpClient.post("/lego-manager/part/colors/" + params.id + "/delete")
        .then(res => res.data);
}

export async function searchPartColor({...params}) {
    return await httpClient.post("/lego-manager/part/colors/search", params)
        .then(res => res.data.body);
}