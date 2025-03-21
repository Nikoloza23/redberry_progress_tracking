import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://momentum.redberryinternship.ge/api',
    headers: {
        'Authorization': 'Bearer 9e7c37bc-55b1-4468-b103-055c63e2a35e'
    }
});

export default axiosInstance; 