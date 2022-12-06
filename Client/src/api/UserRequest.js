import axios from "axios";
const API = axios.create({ withCredentials: true });

export const getUserDetails = (id) => API.get(`/user/${id}`);

