import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://momentum.redberryinternship.ge/api',
    headers: {
        'Authorization': 'Bearer 9e7c6abe-63f4-43ad-8768-60efe28d9702'
    }
});

export default axiosInstance; 