const BASE_URL = "https://traga-rapido.fimbatec.com";

/**
 * Buscar mensagens de um pedido
 */
export const getMensagensPedido = async (pedidoId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/mensagem/pedidos/${pedidoId}/mensagens/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && {
            Authorization: `Token ${token}`,
          }),
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar mensagens");
    }

    const data = await response.json();

    // inverter para mostrar mais antigas em cima e recentes em baixo
    return Array.isArray(data) ? data.reverse() : [];
  } catch (err) {
    console.log("Erro mensagens:", err);
    return [];
  }
};

/**
 * Enviar nova mensagem
 */
export const enviarMensagemPedido = async (
  pedidoId,
  texto,
  remetenteId
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/mensagem/pedidos/${pedidoId}/mensagens/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && {
            Authorization: `Token ${token}`,
          }),
        },
        body: JSON.stringify({
          texto,
          remetente: remetenteId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao enviar mensagem");
    }

    return await response.json();
  } catch (err) {
    console.log("Erro envio mensagem:", err);
    throw err;
  }
};
