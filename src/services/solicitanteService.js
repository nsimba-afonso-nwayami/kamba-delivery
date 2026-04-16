import { api } from "./api";

// CRIAR solicitante
export const createSolicitante = async (data) => {
  const response = await api.post("solicitantes/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
