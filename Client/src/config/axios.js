import axios from "axios";
const token = localStorage.getItem("token");
const config = {
  withCredentials: true,
  baseURL: "http://apihashtag.codestreak.in:5000",
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const API = axios.create(config);

export default API;
