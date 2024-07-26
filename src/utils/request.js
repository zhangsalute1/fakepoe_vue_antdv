import axios from 'axios';

export const services = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 100000
})
