import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://momentum.redberryinternship.ge/api',
    headers: {
        'Authorization': 'Bearer 9e79bdbc-22e6-4b15-a86b-006175282c54'
    }
});

export default axiosInstance; 