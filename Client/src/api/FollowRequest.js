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
