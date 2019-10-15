import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5555'//url inicia que sempre é a mesma
});

export default api;