import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://momentum.redberryinternship.ge/api',
    headers: {
        'Authorization': 'Bearer 9e7a1de2-d66c-446c-a876-983e25d20384'
    }
});

export default axiosInstance; 