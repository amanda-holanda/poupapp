import axios from "axios";

// Requisição para API
const api = axios.create({
    baseURL: "http://127.0.0.1:8080/api/v1",
});

export default api;