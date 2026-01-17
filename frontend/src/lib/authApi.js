import { api } from "./axios";

export const getMe = async () => {
  const res = await api.get("/users/me");
  return res.data;
};
