import axios from "axios";
const API = axios.create({ withCredentials: true });

export const createPost = (data) => API.post("/post", data);
export const getTimeLine = (id) => API.get(`/post/${id}/timeline`);
export const getUserPosts=(id)=>API.get(`/post/user/${id}`)
export const likePost = (id) => API.put(`/post/${id}/like`);
