import api from './api';

export const getSales = () => api.get('/sale');
export const getSaleById = (id) => api.get(`/sale/${id}`);
export const createSale = (data) => api.post('/sale', data);
export const updateSale = (id, data) => api.put(`/sale/${id}`, data);
export const deleteSale = (id) => api.delete(`/sale/${id}`);