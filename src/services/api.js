import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Your Spring Boot app's base URL
});

export default api;