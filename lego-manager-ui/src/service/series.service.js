import httpClient from "./http.client";
import {BACKEND_ROOT} from "../constants/app.constants";

export async function getSeries({...params}) {
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

    return await httpClient.post(BACKEND_ROOT + "/series/list", requestParams)
        .then(res => {
            return {
                data: res.data.body.data,
                totalCount: res.data.body.totalCount
            }
        });
}

export async function getAllSeries() {
    return await httpClient.post(BACKEND_ROOT + "/series/list/all")
        .then(res => res.data.body);
}

export async function saveSeries({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/series/save", params)
        .then(res => res.data);
}

export async function deleteSeries({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/series/" + params.id + "/delete")
        .then(res => res.data);
}