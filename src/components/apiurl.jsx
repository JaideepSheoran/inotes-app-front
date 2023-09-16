import axios from 'axios';

export const api = axios.create({
    baseURL : 'https://notesapi-production-5a3e.up.railway.app',
    withCredentials : true
});

