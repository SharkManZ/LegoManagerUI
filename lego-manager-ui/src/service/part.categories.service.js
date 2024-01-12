import httpClient from "./http.client";
import {BACKEND_ROOT} from "../constants/app.constants";

export async function getAllCategories() {
    return await httpClient.post(BACKEND_ROOT + "/part/category/list/all")
        .then(res => res.data.body);
}