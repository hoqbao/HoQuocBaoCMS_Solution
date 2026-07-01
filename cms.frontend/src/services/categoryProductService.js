import axiosClient from './axiosClient';

const categoryProductService = {
    getAll: () => axiosClient.get('/CategoryProducts')
};

export default categoryProductService;