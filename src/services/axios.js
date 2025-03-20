import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://momentum.redberryinternship.ge/api',
    headers: {
        'Authorization': 'Bearer 9e78808b-acff-409b-acf0-5673454faeeb'
    }
});

export default axiosInstance; 