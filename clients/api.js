import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:3000/api', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Include cookies for authentication if needed
});

export default api;