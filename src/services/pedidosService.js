import { api } from "./api";

// CRIAR PEDIDOS
export const createPedido = async (data) => {
  console.log("ENVIANDO PARA API:", data);
  const response = await api.post("pedidos/", data);
  console.log("RESPOSTA API:", response.data);
  return response.data;
};

// LISTAR PEDIDOS
export const getPedidos = async () => {
  const response = await api.get("pedidos/");
  return response.data;
};

// LISTAR PEDIDOS DISPONÍVEIS (ENTREGADOR)
export const getPedidosDisponiveis = async () => {
  const data = await getPedidos();

  return data.filter(
    (p) =>
      p.status === "AGUARDANDO_PROPOSTAS" &&
      !p.entregador
  );
};

export const getMeusPedidosAtivos = async (entregadorId) => {
  const data = await getPedidos();

  return data.filter(
    (p) =>
      String(p.entregador) === String(entregadorId) &&
      p.status !== "ENTREGUE" &&
      p.status !== "CANCELADO"
  );
};


// HISTÓRICO DO ENTREGADOR
export const getHistoricoEntregador = async (entregadorId) => {
  const data = await getPedidos();

  return data
    .filter(
      (pedido) =>
        String(pedido.entregador) === String(entregadorId) &&
        (pedido.status === "ENTREGUE" ||
         pedido.status === "CANCELADO")
    )
    .sort((a, b) => b.id - a.id);
};

// DETALHE DO PEDIDO
export const getPedido = async (id) => {
  const response = await api.get(`pedidos/${id}/`);
  return response.data;
};

// ACEITAR PEDIDO
export const aceitarPedido = async (id) => {
  const response = await api.post(`pedidos/${id}/aceitar/`);
  return response.data;
};

// CANCELAR PEDIDO
export const cancelarPedido = async (id) => {
  const response = await api.post(`pedidos/${id}/cancelar/`);
  return response.data;
};

// MARCAR COMO A CAMINHO
export const pedidoACaminho = async (id) => {
  const response = await api.post(`pedidos/${id}/a_caminho/`);
  return response.data;
};

// MARCAR COMO EM ENTREGA
export const pedidoEmEntrega = async (id) => {
  const response = await api.post(`pedidos/${id}/em_entrega/`);
  return response.data;
};

// MARCAR COMO ENTREGUE
export const pedidoEntregue = async (id) => {
  const response = await api.post(`pedidos/${id}/entregue/`);
  return response.data;
};

// ITEM RETIRADO
export const itemRetirado = async (id) => {
  const response = await api.post(`pedidos/${id}/item_retirado/`);
  return response.data;
};
