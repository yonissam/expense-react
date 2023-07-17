import { apiCient } from "./ApiClient";

export const retrieveAllTodosForUsernameApi = (username, token) =>
  apiCient.get(`/users/${username}/todos/all`, {
    headers: {
      Authorization: token,
    },
  });

export const retrieveAllTodosForCurrentMonthApi = (username, token) =>
  apiCient.get(`/users/${username}/todos`, {
    headers: {
      Authorization: token,
    },
  });

export const deleteTodoApi = (username, id, token) =>
  apiCient.delete(`/users/${username}/todos/${id}`, {
    headers: {
      Authorization: token,
    },
  });

export const retrieveTodoApi = (username, id, token) =>
  apiCient.get(`/users/${username}/todos/${id}`, {
    headers: {
      Authorization: token,
    },
  });

export const updateTodoApi = (username, id, todo, token) =>
  apiCient.put(`/users/${username}/todos/${id}`, todo, {
    headers: {
      Authorization: token,
    },
  });

export const addNewTodoApi = (username, todo, token) =>
  apiCient.post(`/users/${username}/todos`, todo, {
    headers: {
      Authorization: token,
    },
  });

export const registerNewUserApi = (user) =>
  apiCient.post(`/auth/register`, user);

export const resetApi = (user) => apiCient.post(`/auth/reset`, user);
export const verifyOtpApi = (user) => apiCient.post(`/auth/verify-otp`, user);

export const resetPasswordApi = (user) =>
  apiCient.post(`/auth/password-reset`, user);
