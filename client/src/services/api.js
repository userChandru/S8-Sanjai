import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add auth token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const userAPI = {
    getAllUsers: () => api.get('/users'),
    getUserById: (id) => api.get(`/users/${id}`),
    updateUser: (id, data) => api.put(`/users/${id}`, data),
    deleteUser: (id) => api.delete(`/users/${id}`)
};

export const bankProductAPI = {
    getAll: () => api.get('/bank-products'),
    getById: (id) => api.get(`/bank-products/${id}`),
    create: (data) => api.post('/bank-products', data),
    update: (id, data) => api.put(`/bank-products/${id}`, data),
    delete: (id) => api.delete(`/bank-products/${id}`)
};

export const vendorProductAPI = {
    getAll: () => api.get('/vendor-products'),
    getById: (id) => api.get(`/vendor-products/${id}`),
    create: (data) => api.post('/vendor-products', data),
    update: (id, data) => api.put(`/vendor-products/${id}`, data),
    delete: (id) => api.delete(`/vendor-products/${id}`)
};

export const purchaseAPI = {
    getAll: () => api.get('/purchases'),
    getById: (id) => api.get(`/purchases/${id}`),
    create: (data) => api.post('/purchases', data),
    getUserPurchases: (userId) => api.get(`/purchases/user/${userId}`)
};

export const marketAPI = {
    getAll: () => api.get('/markets'),
    getById: (id) => api.get(`/markets/${id}`),
    // ...
};

export default api; 