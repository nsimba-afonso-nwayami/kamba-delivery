const BASE_URL = "https://traga-rapido.fimbatec.com";

// enviar posição do entregador
export const enviarPosicao = async (pedidoId, latitude, longitude) => {
  try {
    const token = localStorage.getItem("token"); // ou o teu auth

    const response = await fetch(
      `${BASE_URL}/rastreamento/pedidos/${pedidoId}/posicoes/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Token ${token}` }),
        },
        body: JSON.stringify({
          latitude,
          longitude,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao enviar posição");
    }

    return await response.json();
  } catch (err) {
    console.error("Erro rastreamento:", err);
  }
};
