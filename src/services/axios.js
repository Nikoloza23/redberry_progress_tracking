import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://momentum.redberryinternship.ge/api',
    headers: {
        'Authorization': 'Bearer 9e79fcff-70c8-4c04-8274-087a03316360'
    }
});

export default axiosInstance; 