import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);

export default axiosClient;