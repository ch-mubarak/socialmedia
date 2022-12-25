import API from "../config/axios";

export const userChats = () => API.get("/chat");
