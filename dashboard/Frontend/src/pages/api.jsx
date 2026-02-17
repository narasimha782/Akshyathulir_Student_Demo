import axios from 'axios';

// Ensure this matches your FastAPI port (usually 8000)
const API_BASE_URL = "http://localhost:8000/api"; 

const Api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;