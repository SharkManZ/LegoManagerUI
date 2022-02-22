import httpClient from "./http.client";

export async function getTotals() {
    return await httpClient.get("/lego-manager/report/totals")
        .then(res => res.data.body);
}