import axios from "axios";

export const apiCient = axios.create({
  baseURL: "http://services.yoniss.com/api/v1",
});
