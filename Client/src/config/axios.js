import axios from "axios";
const token = localStorage.getItem("token");
const config = {
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const API = axios.create(config);

export default API;
