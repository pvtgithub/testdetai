import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5555/",
});

export const getAPI = (url, params = {}) => {
  return instance.get(url, params);
};

export const postAPI = (url, data) => {
  return instance.post(url, data);
};

export const deleteAPI = (url, id) => {
  return instance.delete(url, id);
};
