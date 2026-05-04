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

// buscar última posição do entregador
export const getUltimaPosicaoEntregador = async (pedidoId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/rastreamento/pedidos/${pedidoId}/posicoes/`,
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
      throw new Error("Erro ao buscar posição");
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      const ultima = data[0];

      return [
        parseFloat(ultima.latitude),
        parseFloat(ultima.longitude),
      ];
    }

    return null;
  } catch (err) {
    console.log("Erro rastreamento:", err);
    return null;
  }
};
