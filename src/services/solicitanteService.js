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


export const getSolicitante = async (id) => {
  const response = await api.get(`solicitantes/${id}/`);
  return response.data;
};

