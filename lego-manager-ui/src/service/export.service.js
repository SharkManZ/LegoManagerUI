import httpClient from "./http.client";
import {BACKEND_ROOT} from "../constants/app.constants";

export async function exportAll() {
    await httpClient.get(BACKEND_ROOT + "/export/all", {responseType: 'blob'})
        .then(res => {
            let filename = res.headers["x-file-name"];
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        })
}