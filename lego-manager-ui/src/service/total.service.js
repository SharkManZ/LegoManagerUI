import httpClient from "./http.client";
import {BACKEND_ROOT} from "../constants/app.constants";

export async function getTotals() {
    return await httpClient.get(BACKEND_ROOT + "/report/totals")
        .then(res => res.data.body);
}