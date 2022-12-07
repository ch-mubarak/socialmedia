import axios from "axios";
const token = localStorage.getItem("profile");
const config = {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const API = axios.create(config);

export const getUserDetails = (id) => API.get(`/user/${id}`);
export const updateProfile = (id, formData) => API.put(`/user/${id}`, formData);

