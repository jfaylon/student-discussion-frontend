import api from "./axios";

export const me = async () => {
  const res = await api.get(`api/account/me`, {
    withCredentials: true,
  });
  return res;
};
