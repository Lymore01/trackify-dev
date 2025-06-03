import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://trackify-dev.vercel.app',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosInstance;