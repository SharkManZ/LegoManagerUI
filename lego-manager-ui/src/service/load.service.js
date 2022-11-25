import httpClient from "./http.client";
import {BACKEND_ROOT} from "../constants/app.constants";

export async function checkSetDetails({...params}) {
    return await httpClient.get(BACKEND_ROOT + "/load/" + params.number + "/checkParts", {})
        .then(res => {
            return res.data.body;
        })
}

export async function importSetDetails({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/load/" + params.number + "/loadParts", {})
        .then(res => {
            return {};
        })
}