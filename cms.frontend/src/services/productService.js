import axiosClient from './axiosClient';

const productService = {
    getAllProducts: () => axiosClient.get('/Products'),

    getProductById: (id) => axiosClient.get(`/Products/${id}`)
};

export default productService;