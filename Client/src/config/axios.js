import axios from "axios";
const config = {
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
};

const API = axios.create(config);

API.interceptors.request.use(
  function (config) {
    const storedToken = localStorage.getItem("token");
    const token = JSON.parse(storedToken);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default API;
