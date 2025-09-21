import axios from 'axios';


const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });


export const fetchTransactions = () => API.get('/transactions');
export const createTransaction = (data) => API.post('/transactions', data);
export const fetchSummary = () => API.get('/transactions/summary');


export default API;