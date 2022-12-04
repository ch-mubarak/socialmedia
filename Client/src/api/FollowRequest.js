import axios from "axios";

const API = axios.create({ withCredentials: true });

export const getFollowers = (id) => API.get(`/user/followers/${id}`);
