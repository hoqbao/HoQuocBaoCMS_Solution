import axiosClient from './axiosClient';

const productService = {
    getAllProducts: () => axiosClient.get('/Products'),

    getProductById: (id) => axiosClient.get(`/Products/${id}`),

    getLatestProducts: () => axiosClient.get('/Products/latest'),

    getHotProducts: () => axiosClient.get('/Products/hot')
};

export default productService;