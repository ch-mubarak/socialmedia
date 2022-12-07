import axios from "axios";
const token = localStorage.getItem("token");
const config = {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const API = axios.create(config);

export const getFollowers = (id) => API.get(`/user/followers/${id}`);
export const followUser = (id) => API.put(`/user/${id}/follow`);
export const unFollowUser = (id) => API.put(`/user/${id}/unFollow`);
