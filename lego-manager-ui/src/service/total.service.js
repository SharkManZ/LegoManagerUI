import httpClient from "./http.client";
import {BACKEND_ROOT} from "../constants/app.constants";

export async function getTotals({...params}) {
    return await httpClient.post(BACKEND_ROOT + "/report/totals", params)
        .then(res => res.data.body);
}