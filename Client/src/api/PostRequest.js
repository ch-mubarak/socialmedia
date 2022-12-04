import axios from "axios";
const API = axios.create({ withCredentials: true });

export const createPost = (data) => API.post("/post", data);
export const getMyPosts = (id) => API.get(`/post/myPosts/${id}`);
export const getTimeLine = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id) => API.put(`/post/${id}/like`);
