import httpClient from "./http.client";

export async function saveSetPart({...params}) {
    return await httpClient.post("/lego-manager/set/parts/save", params)
        .then(res => res.data);
}

export async function deleteSetPart({...params}) {
    return await httpClient.post("/lego-manager/set/parts/" + params.id + "/delete")
        .then(res => res.data);
}