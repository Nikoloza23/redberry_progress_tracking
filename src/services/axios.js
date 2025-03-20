import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://momentum.redberryinternship.ge/api',
    headers: {
        'Authorization': 'Bearer 9e7a17c1-955b-4ee7-ac7d-d7b27cd52cae'
    }
});

export default axiosInstance; 