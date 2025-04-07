import api from './api';

export const getConsumers = () => api.get('/consumer');
export const getConsumerById = (id) => api.get(`/consumer/${id}`);
export const createConsumer = (data) => api.post('/consumer', data);
export const updateConsumer = (id, data) => api.put(`/consumer/${id}`, data);
export const deleteConsumer = (id) => api.delete(`/consumer/${id}`);