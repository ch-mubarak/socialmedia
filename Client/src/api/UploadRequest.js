import axios from "axios";
const token = localStorage.getItem("profile");
const config = {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const API = axios.create(config);

export const uploadImage = (data) => API.post("/upload/image", data);
export const uploadVideo = (data) => API.post("/upload/video", data);
