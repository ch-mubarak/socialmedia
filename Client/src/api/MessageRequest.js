import API from "../config/axios";

export const getMessages = (roomId) => API.get(`/message/${roomId}`);
