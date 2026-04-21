import { api } from "./api";

// LISTAR TODAS AS AVALIAÇÕES
export const getAvaliacoes = async () => {
  const response = await api.get("/avaliacoes/");
  return response.data;
};

// BUSCAR UMA AVALIAÇÃO POR ID
export const getAvaliacaoById = async (id) => {
  const response = await api.get(`/avaliacoes/${id}/`);
  return response.data;
};

// CRIAR AVALIAÇÃO
export const createAvaliacao = async (data) => {
  const response = await api.post("/avaliacoes/", data);
  return response.data;
};

// ATUALIZAR AVALIAÇÃO (PUT - completo)
export const updateAvaliacao = async (id, data) => {
  const response = await api.put(`/avaliacoes/${id}/`, data);
  return response.data;
};

// ATUALIZAR PARCIAL (PATCH)
export const patchAvaliacao = async (id, data) => {
  const response = await api.patch(`/avaliacoes/${id}/`, data);
  return response.data;
};

// APAGAR AVALIAÇÃO
export const deleteAvaliacao = async (id) => {
  const response = await api.delete(`/avaliacoes/${id}/`);
  return response.data;
};
