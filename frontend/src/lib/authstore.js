import { api } from "./axios";

export const registerUser = async (userData) => {
  const res = await api.post("/users/register", userData);
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await api.post("/users/login", credentials, {
    withCredentials: true, // force include
  });
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/users/logout");
  return res.data;
}

export const getProfile = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/users/me", data);
  return res.data;
};