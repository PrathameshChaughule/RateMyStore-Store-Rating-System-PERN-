import axios from 'axios'

const api = axios.create({
    baseURL: window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://rate-my-store-server.onrender.com"
})

export default api