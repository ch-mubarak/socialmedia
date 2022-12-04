import axios from "axios";
const API = axios.create({ withCredentials: true });

export const getUserDetails = (id) => API.get(`/user/${id}`);
export const getUserPosts = (id) => API.get(`/post/user/${id}`);
