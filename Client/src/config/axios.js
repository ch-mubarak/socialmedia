import axios from "axios";
const token = localStorage.getItem("token");
const config = {
  withCredentials: true,
  baseURL: "https://apihashtag.codestreak.in",
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const API = axios.create(config);

export default API;
