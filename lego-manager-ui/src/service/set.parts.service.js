import httpClient from "./http.client";
import {BACKEND_ROOT} from "../constants/app.constants";

export async function saveSetPart({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/set/parts/save", params)
        .then(res => res.data);
}

export async function deleteSetPart({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/set/parts/" + params.id + "/delete")
        .then(res => res.data);
}