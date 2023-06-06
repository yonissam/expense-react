import { apiCient } from "./ApiClient";

export const logoutService = (token) =>
  apiCient.get(`/auth/logout`, {
    headers: {
      Authorization: token,
    },
  });

export const executeJwtAuthenticationService = (username, password) =>
  apiCient.post(`/auth/authenticate`, { username, password });
