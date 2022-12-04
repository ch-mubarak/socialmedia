import axios from "axios";
const API = axios.create({ withCredentials: true });

export const uploadImage = (data) => API.post("/upload/image", data);
