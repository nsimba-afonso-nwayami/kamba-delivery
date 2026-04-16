import { api } from "./api";

// CRIAR entregador
export const createEntregador = async (data) => {
  const response = await api.post("entregadores/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
