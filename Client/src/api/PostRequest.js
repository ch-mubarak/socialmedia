import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

export const createPost = (data) => API.post("/post", data);
export const getTimeLine = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id, userId) => API.put(`/post/${id}/like`, { userId });
