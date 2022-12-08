import axios from "axios";
const token = localStorage.getItem("token");
const config = {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const API = axios.create(config);

export const createPost = (data) => API.post("/post", data);
export const likePost = (id) => API.put(`/post/${id}/like`);
