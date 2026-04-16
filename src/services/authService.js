import { api } from "./api";

export const loginUser = async (data) => {
  const response = await api.post("auth/token/", data);
  return response.data;
};

export const refreshToken = async (refresh) => {
  const response = await api.post("auth/token/refresh/", {
    refresh,
  });

  return response.data;
};
