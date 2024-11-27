import axios from 'axios';

import baseURL from './baseUrl';

let access = JSON.parse(localStorage.getItem('a'));

// создаем axios instance, чтобы каждый раз не добавлять токен в header
const axiosInstance = axios.create({
    baseURL,
    headers: {
        Authorization: 'Bearer ' + access,
    }
});

// проект маленький, поэтому не буду обновлять истекший токен. на сервере время жизни токена поставлю 1 год

export default axiosInstance;