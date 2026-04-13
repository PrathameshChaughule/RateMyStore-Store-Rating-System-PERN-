import axios from 'axios'

const api = axios.create({
    baseURL: "https://rate-my-store-server.onrender.com"
})

export default api