import { LoginPayload } from "@/interfaces";
import api from "./axios";

export const login = async (credentials: LoginPayload) => {
  const res = await api.post(
    `api/account/login`,
    credentials,
    { withCredentials: true } // important for cookies
  );
  return res;
};

export const logout = async () => {
  await api.post(`api/account/logout`, {}, { withCredentials: true });
};
