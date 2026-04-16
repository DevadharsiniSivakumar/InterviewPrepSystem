import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
});

export const getQuestions = () => API.get("/test/questions");

export const submitTest = (data) => API.post("/test/submit", data);

export const loginUser = (data) => API.post("/auth/login", data);

export const registerUser = (data) => API.post("/auth/register", data);

export const getUserStats = (userId) => API.get(`/test/stats/${userId}`);

export const generateQuestions = (domain) => API.get("/test/generate", { params: { domain } });
