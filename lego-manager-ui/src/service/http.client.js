const axios = require("axios");

axios.interceptors.response.use(
    response => {
        if (response.data.success === false) {
            return Promise.reject(response.data.error.message);
        }
        return response;
    },
    error => {
        if (error.response) {
            if (error.response.status === 404) {
                return Promise.reject('Ошибка получения данных. Приложение не доступно.');
            } else if (error.response.status === 405) {
                return Promise.reject('Ошибка получения данных. Не верный тип запроса.');
            } else if (error.response.status === 504) {
                return Promise.reject('Ошибка получения данных. Сервер не доступен.');
            } else {
                return Promise.reject('Не известная ошибка: ' + error.response.status);
            }
        } else if (error.request) {
            return Promise.reject('Ошибка получения данных. Ответ от сервера не получен.');
        } else {
            return Promise.reject(error.message);
        }
    }
);

export default axios;