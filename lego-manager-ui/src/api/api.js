import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {BACKEND_ROOT} from "../constants/app.constants";
import {enqueueSnackbar} from 'notistack';

const STATUS_OK = 200;

const errorMapping = (code) => {
    switch (code) {
        case 404 : return 'Ошибка получения данных. Приложение не доступно.';
        case 405 : return 'Ошибка получения данных. Не верный тип запроса.';
        case 504 : return 'Ошибка получения данных. Сервер не доступен.';
        default: return 'Не известная ошибка: ' + code;
    }
}

const customBaseQuery = async (args, api, extraOptions) => {
    const fetchBaseQueryResult = await fetchBaseQuery({
        baseUrl: 'http://localhost:3000' + BACKEND_ROOT,
        headers: {
            Accept: 'application/json, text/plain, */*'
        },
        validateStatus: (response, result) => response.status === STATUS_OK && Boolean(result.success)
    })(args, api, extraOptions)

    if (fetchBaseQueryResult.data) {
        fetchBaseQueryResult.data = fetchBaseQueryResult.data.body
    }

    if (fetchBaseQueryResult.error) {
        const errCode = fetchBaseQueryResult.meta.response.status;
        let errMessage = '';
        if (errCode !== 200) {
            errMessage = errorMapping(errCode);
        } else {
            errMessage = fetchBaseQueryResult.error.data.error.message;
        }

        enqueueSnackbar(errMessage, {variant: 'error'})
    }

    return fetchBaseQueryResult;
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: customBaseQuery,
    keepUnusedDataFor: 1,
    endpoints: (builder) => ({
        // api инжектируются в соответствующих файлах /api
    })
})