import axiosClient from './axiosClient';

const orderService = {
    createOrder: (orderData) => axiosClient.post('/Orders', orderData)
};

export default orderService;