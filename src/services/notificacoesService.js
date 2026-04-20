import { api } from "./api";

// LISTAR TODAS AS NOTIFICAÇÕES
export const getNotificacoes = async () => {
  const response = await api.get("/notificacoes/");
  return response.data;
};

// BUSCAR UMA NOTIFICAÇÃO POR ID
export const getNotificacaoById = async (id) => {
  const response = await api.get(`/notificacoes/${id}/`);
  return response.data;
};

// CRIAR NOTIFICAÇÃO
export const createNotificacao = async (data) => {
  const response = await api.post("/notificacoes/", data);
  return response.data;
};

// MARCAR COMO LIDA (PATCH parcial)
export const marcarComoLida = async (id) => {
  const response = await api.patch(`/notificacoes/${id}/`, {
    lida: true,
  });
  return response.data;
};

// MARCAR TODAS COMO LIDAS (opcional - depende do backend)
export const marcarTodasComoLidas = async () => {
  const response = await api.patch("/notificacoes/", {
    lida: true,
  });
  return response.data;
};

// APAGAR NOTIFICAÇÃO
export const deleteNotificacao = async (id) => {
  const response = await api.delete(`/notificacoes/${id}/`);
  return response.data;
};