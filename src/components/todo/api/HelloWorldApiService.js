import { apiCient } from "./ApiClient";

export const retrieveHelloWorldPathVariable = (token) =>
  apiCient.get(`/demo-controller`, {
    headers: {
      Authorization: token,
    },
  });
