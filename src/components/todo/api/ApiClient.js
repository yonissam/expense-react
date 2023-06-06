import axios from "axios";

export const apiCient = axios.create({
  baseURL: "http://192.168.0.105:8085/api/v1",
});
