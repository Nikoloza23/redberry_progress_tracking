import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://momentum.redberryinternship.ge/api',
    headers: {
        'Authorization': 'Bearer 9e7a3e31-11fa-4205-9ae3-e6fc30f28ec9'
    }
});

export default axiosInstance; 