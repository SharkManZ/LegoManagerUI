const axios = require("axios");

axios.interceptors.response.use(
    response => {
        if (response.status !== 200) {
            alert('error ' + response.status);
        }
        if (response.data.success === false) {
            return Promise.reject(response.data.error.message);
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;