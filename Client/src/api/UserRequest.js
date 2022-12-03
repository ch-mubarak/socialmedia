import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

export const getUserDetails = (id) => API.get(`/user/${id}`);
export const getUserPosts = (id) => API.get(`/post/user/${id}`);
