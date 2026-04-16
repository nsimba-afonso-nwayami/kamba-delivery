import { api } from "./api";

// LISTAR usuários
export const getUsuarios = async () => {
  const response = await api.get("usuarios/");
  return response.data;
};

// OBTER um usuário por ID
export const getUsuarioById = async (id) => {
  const response = await api.get(`usuarios/${id}/`);
  return response.data;
};

// CRIAR usuário (REGISTER)
export const createUsuario = async (data) => {
  const response = await api.post("usuarios/", data);
  return response.data;
};

// ATUALIZAR usuário (PUT completo)
export const updateUsuario = async (id, data) => {
  const response = await api.put(`usuarios/${id}/`, data);
  return response.data;
};

// ATUALIZAR parcialmente (PATCH)
export const patchUsuario = async (id, data) => {
  const response = await api.patch(`usuarios/${id}/`, data);
  return response.data;
};

// DELETAR usuário
export const deleteUsuario = async (id) => {
  const response = await api.delete(`usuarios/${id}/`);
  return response.data;
};