import axios from "axios";
const token = localStorage.getItem("token");
const config = {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const API = axios.create(config);

export const fetchComments = (postId) => API.get(`/comment/${postId}`);
export const postComment = (postId, comment) =>
  API.post(`/comment/${postId}`, { comment });

export const likeComment = (commentId) => API.put(`/comment/${commentId}`);
export const deleteComment = (commentId) => API.delete(`/comment/${commentId}`);
