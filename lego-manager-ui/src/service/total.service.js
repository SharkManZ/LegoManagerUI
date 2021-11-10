import httpClient from "./http.client";

export async function getTotals({...params}) {
    const response = await httpClient.get("/lego-manager/report/totals")
        .then(res => res.data.body)
        .catch(error => {
            if (error.response) {
                if (error.response.status === 404) {
                    params.enqueueSnackbar('Ошибка получения данных. Приложение не доступно.', {variant: 'error'});
                } else if (error.response.status === 405) {
                    params.enqueueSnackbar('Ошибка получения данных. Не верный тип запроса.', {variant:'error'});
                } else {
                    params.enqueueSnackbar('Ошибка получения данных.', {variant:'error'});
                }
            }
            return params.emptyTotals;
        });
    return response;
}