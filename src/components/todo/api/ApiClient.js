import axios from "axios";

export const apiCient = axios.create({
  baseURL: "http://expense-spring:8085/api/v1",
});
