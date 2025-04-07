import axios from 'axios';

const api = axios.create({
	baseURL: 'https://localhost:5001/api', // URL da API
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 50000,
});

// Intercepta erros de resposta
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			console.error('Server Error:', error.response.data.message);
		} else if (error.request) {
			console.error('Network Error:', error.message);
		} else {
			console.error('Unexpected Error:', error.message);
		}
		return Promise.reject(error);
	}
);

export default api;