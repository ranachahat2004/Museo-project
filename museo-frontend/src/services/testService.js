import api from "./api";

export const testBackendConnection = async () => {
  const response = await api.get("/test");

  return response.data;
};