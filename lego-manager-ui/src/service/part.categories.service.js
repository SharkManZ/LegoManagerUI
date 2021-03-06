import httpClient from "./http.client";
import {BACKEND_ROOT} from "../constants/app.constants";

export async function getPartCategories({...params}) {
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

    return await httpClient.post(BACKEND_ROOT + "/part/category/list", requestParams)
        .then(res => {
            return {
                data: res.data.body.data,
                totalCount: res.data.body.totalCount
            }
        });
}

export async function getAllCategories() {
    return await httpClient.post(BACKEND_ROOT + "/part/category/list/all")
        .then(res => res.data.body);
}

export async function savePartCategory({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/part/category/save", params)
        .then(res => res.data);
}

export async function deletePartCategory({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/part/category/" + params.id + "/delete")
        .then(res => res.data);
}