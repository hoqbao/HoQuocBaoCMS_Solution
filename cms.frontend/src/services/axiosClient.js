import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://localhost:7076/api'
});

axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);

export default axiosClient;