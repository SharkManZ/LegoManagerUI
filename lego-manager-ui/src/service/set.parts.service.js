import httpClient from "./http.client";

export async function saveSetPart({...params}) {
    const result = await httpClient.post("/lego-manager/set/parts/save", params);
    return result.data;
}

export async function deleteSetPart({...params}) {
    const result = await httpClient.post("/lego-manager/set/parts/" + params.id + "/delete");
    return result.data;
}