import { useState, useEffect, useRef } from "react";
import EntregadorLayout from "./components/EntregadorLayout";
import Modal from "./components/Modal";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getMeusPedidosAtivos, aceitarPedido, pedidoACaminho, itemRetirado, pedidoEmEntrega, pedidoEntregue } from "../../services/pedidosService";
import { getUsuarioById } from "../../services/usuariosService";
import { enviarPosicao } from "../../services/rastreamentoService";
import { useAuth } from "../../contexts/AuthContext";
import { formatPrice } from "../../utils/formatPrice";
import { toast } from "react-hot-toast";

export default function EntregasEntregador() {
  const [openChat, setOpenChat] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [mapType, setMapType] = useState("map"); // "map" | "satellite"
  const { user } = useAuth();
  const [entrega, setEntrega] = useState(null);
  const [loading, setLoading] = useState(true);
  const [routeInfo, setRouteInfo] = useState(null);
  const [minhaPosicao, setMinhaPosicao] = useState(null);
  const ultimaPosicaoEnviadaRef = useRef(null);
  const [rota, setRota] = useState([]);
  const ultimaPosicaoRef = useRef(null);
  const avisouRef = useRef(false);
  const lastRouteTimeRef = useRef(0);

  // Dados da API
  const fetchEntrega = async () => {
    if (!user?.id) return;

    const ativos = await getMeusPedidosAtivos(user.id);

    if (ativos.length === 0) {
      setEntrega(null);
      return;
    }

    let pedido = ativos[0];

    if (pedido.solicitante) {
      const usuario = await getUsuarioById(pedido.solicitante);

      pedido = {
        ...pedido,
        solicitanteData: usuario,
      };
    }

    setEntrega(pedido);

    // CALCULAR ROTA
    const origem = [
      pedido.origem_latitude,
      pedido.origem_longitude,
    ];

    const destino = [
      pedido.destino_latitude,
      pedido.destino_longitude,
    ];

    const info = await calcularRotaOSRM(origem, destino);
  };

  useEffect(() => {
    fetchEntrega();
  }, [user?.id]);

  useEffect(() => {
    const interval = setInterval(fetchEntrega, 5000);
    return () => clearInterval(interval);
  }, [user?.id]);

  const valorFinal = entrega?.valor_final;

  const calcularRotaOSRM = async (origem, destino) => {
    if (!origem || !destino) return null;

    try {
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/` +
        `${origem[1]},${origem[0]};${destino[1]},${destino[0]}?overview=full&geometries=geojson`
      );

      const data = await res.json();

      if (!data.routes || data.routes.length === 0) return null;

      const route = data.routes[0];

      return {
        distanciaKm: route.distance / 1000,
        tempoMin: Math.round(route.duration / 60),
      };

    } catch (err) {
      console.log("Erro OSRM:", err);
      return null;
    }
  };

  useEffect(() => {
    const loadRoute = async () => {
      if (!entrega) return;

      const origem = [
        entrega.origem_latitude,
        entrega.origem_longitude,
      ];

      const destino = [
        entrega.destino_latitude,
        entrega.destino_longitude,
      ];

      const info = await calcularRotaOSRM(origem, destino);
      setRouteInfo(info);
    };

    loadRoute();
  }, [entrega]);

  const distanciaKm = routeInfo?.distanciaKm || 0;
  const tempoMin = routeInfo?.tempoMin || 0;

  const formatTempo = (min) => {
    if (!min) return "--";

    if (min < 60) return `${Math.round(min)} min`;

    const h = Math.floor(min / 60);
    const m = Math.round(min % 60);

    return `${h}h ${m}min`;
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("GPS não suportado");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        const novaPos = [lat, lng];
        animarMovimento(novaPos);

        // só envia se tiver entrega ativa
        if (entrega?.id) {
          const ultima = ultimaPosicaoEnviadaRef.current;

          const distancia = ultima
            ? calcularDistanciaMetros(novaPos, ultima)
            : 999;

          // só envia se mover > 15 metros
          if (!ultima || distancia > 15) {
            await enviarPosicao(entrega.id, lat, lng);
            ultimaPosicaoEnviadaRef.current = novaPos;
          }
        }
      },
      (err) => console.log("Erro GPS:", err),
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 10000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [entrega]);

  const calcularDistanciaMetros = (pos1, pos2) => {
    if (!pos1 || !pos2) return 0;

    const R = 6371e3;

    const dLat = ((pos2[0] - pos1[0]) * Math.PI) / 180;
    const dLon = ((pos2[1] - pos1[1]) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((pos1[0] * Math.PI) / 180) *
        Math.cos((pos2[0] * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const calcularRotaDinamica = async (origem, destino) => {
    if (!origem || !destino) return;

    try {
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/` +
        `${origem[1]},${origem[0]};${destino[1]},${destino[0]}?overview=full&geometries=geojson&alternatives=false&steps=false`
      );

      const data = await res.json();

      if (!data.routes || data.routes.length === 0) return;

      const coords = data.routes[0].geometry.coordinates;

      // inverter [lng, lat] → [lat, lng]
      const rotaFormatada = coords.map((p) => [p[1], p[0]]);

      setRota(rotaFormatada);

    } catch (err) {
      console.log("Erro rota dinâmica:", err);
    }
  };

  const animarMovimento = (novaPos) => {
    if (!ultimaPosicaoRef.current) {
      setMinhaPosicao(novaPos);
      ultimaPosicaoRef.current = novaPos;
      return;
    }

    const passos = 10;
    const [lat1, lng1] = ultimaPosicaoRef.current;
    const [lat2, lng2] = novaPos;

    let i = 0;

    const interval = setInterval(() => {
      i++;

      const lat = lat1 + ((lat2 - lat1) * i) / passos;
      const lng = lng1 + ((lng2 - lng1) * i) / passos;

      setMinhaPosicao([lat, lng]);

      if (i >= passos) {
        clearInterval(interval);
        ultimaPosicaoRef.current = novaPos;
      }
    }, 50);
  };

  const getPontoDestino = () => {
    if (!entrega) return null;

    // depois de pegar o item → vai ao destino
    if (
      entrega.status === "ITEM_RETIRADO" ||
      entrega.status === "EM_ENTREGA"
    ) {
      return [entrega.destino_latitude, entrega.destino_longitude];
    }

    // antes disso → vai à origem
    return [entrega.origem_latitude, entrega.origem_longitude];
  };

  useEffect(() => {
    if (!minhaPosicao || !entrega) return;

    const destino = getPontoDestino();;
    if (!destino) return;

    const distanciaDesvio = calcularDistanciaMetros(
      minhaPosicao,
      ultimaPosicaoRef.current
    );

    if (
      (!ultimaPosicaoRef.current || distanciaDesvio > 40) &&
      Date.now() - lastRouteTimeRef.current > 3000
    ) {
      calcularRotaDinamica(minhaPosicao, destino);
      ultimaPosicaoRef.current = minhaPosicao;
      lastRouteTimeRef.current = Date.now();
    }

  }, [minhaPosicao, entrega?.status]);
  

  useEffect(() => {
    if (!minhaPosicao || !entrega) return;

    const destino = getPontoDestino();
    if (!destino) return;

    const dist = calcularDistanciaMetros(minhaPosicao, destino);

    if (dist < 100 && !avisouRef.current) {
      toast("Estás próximo do destino 📍");
      avisouRef.current = true;
    }
  }, [minhaPosicao]);

  useEffect(() => {
    if (!entrega || !minhaPosicao) return;

    const destino = getPontoDestino();
    if (!destino) return;

    if (rota.length === 0) {
      calcularRotaDinamica(minhaPosicao, destino);
    }
  }, [entrega, minhaPosicao]);

  const encontrarIndiceMaisProximo = (pos, rota) => {
    if (!pos || !rota || rota.length === 0) return 0;

    let minDist = Infinity;
    let indice = 0;

    rota.forEach((ponto, i) => {
      const d = calcularDistanciaMetros(pos, ponto);
      if (d < minDist) {
        minDist = d;
        indice = i;
      }
    });

    return indice;
  };

  const indiceAtual = encontrarIndiceMaisProximo(minhaPosicao, rota);

  const rotaPercorrida = rota.slice(0, indiceAtual + 1);
  const rotaRestante = rota.slice(indiceAtual);

  function FitBoundsEntregador({ pontos }) {
    const map = useMap();

    useEffect(() => {
      if (!pontos || pontos.length === 0) return;

      setTimeout(() => {
        map.fitBounds(pontos, {
          padding: [60, 60],
          maxZoom: 16,
        });
      }, 200);
    }, [pontos, map]);

    return null;
  }

  const STATUS_FLOW = {
    PROPOSTA_ACEITA: {
      label: "Iniciar deslocamento",
      action: pedidoACaminho,
    },
    ENTREGADOR_A_CAMINHO: {
      label: "Item retirado",
      action: itemRetirado,
    },
    ITEM_RETIRADO: {
      label: "Iniciar entrega",
      action: pedidoEmEntrega,
    },
    EM_ENTREGA: {
      label: "Confirmar entrega",
      action: pedidoEntregue,
    },
  };

  const STATUS_STYLE = {
    PROPOSTA_ACEITA: "bg-yellow-500",
    ENTREGADOR_A_CAMINHO: "bg-blue-600",
    ITEM_RETIRADO: "bg-purple-600",
    EM_ENTREGA: "bg-green-600",
  };

  const STATUS_MESSAGES = {
    PROPOSTA_ACEITA: "A caminho do local ",
    ENTREGADOR_A_CAMINHO: "Item recolhido ",
    ITEM_RETIRADO: "Entrega iniciada ",
    EM_ENTREGA: "Entrega concluída ",
  };

  const handleAtualizarStatus = async () => {
    if (!entrega) return;

    const config = STATUS_FLOW[entrega.status];
    if (!config) return;

    try {
      await config.action(entrega.id);

      toast.success(STATUS_MESSAGES[entrega.status] || "Status atualizado");

      fetchEntrega();
    } catch (err) {
      toast.error("Erro ao atualizar status");
    }
  };

  const mensagensChat = [
    { id: 1, texto: "Olá, já estou a caminho.", enviadoPor: "eu", hora: "14:20" },
    { id: 2, texto: "Ok, estou à espera.", enviadoPor: "outro", hora: "14:22" },
  ];

  if (!entrega) {
    return (
      <EntregadorLayout title="Entregas">
        <div className="text-center py-20 text-gray-400">
          <i className="fas fa-route text-4xl mb-4"></i>
          <p className="font-bold">
            Nenhuma entrega ativa no momento
          </p>
        </div>
      </EntregadorLayout>
    );
  }

  return (
    <>
      <title>Entregas | Kamba Delivery</title>

      <EntregadorLayout title="Entregas">

        <div className="space-y-6">

          {/* DADOS DA CORRIDA */}
          <section className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {entrega.titulo}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {entrega.descricao}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400">Valor</p>
                <p className="font-bold text-gray-800 text-lg">
                  {formatPrice(entrega.valor_sugerido)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 text-sm">

              <div>
                <p className="text-gray-400 text-xs">Origem</p>
                <p className="font-semibold text-gray-800">
                  {entrega.origem_endereco}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Destino</p>
                <p className="font-semibold text-gray-800">
                  {entrega.destino_endereco}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Distância</p>
                <p className="font-semibold text-gray-800">
                  {distanciaKm.toFixed(1)} km
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  ~ {formatTempo(tempoMin)}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Pagamento</p>
                <p className="font-semibold text-gray-800">
                  À chegada
                </p>
              </div>

            </div>

          </section>

          {/* MAPA */}
          <section className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">

            <div className="w-full h-100 rounded-xl overflow-hidden relative z-0">

              {/* BOTÃO FLUTUANTE */}
              <button
                onClick={() =>
                  setMapType(mapType === "map" ? "satellite" : "map")
                }
                className="absolute top-3 right-3 z-999 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-gray-100 shadow-lg flex items-center gap-2 text-xs font-bold hover:bg-white transition"
              >
                <i
                  className={`fas ${
                    mapType === "map" ? "fa-satellite" : "fa-map"
                  } text-red-700`}
                ></i>

                {mapType === "map" ? "Satélite" : "Mapa"}
              </button>

              <MapContainer
                center={[entrega.origem_latitude, entrega.origem_longitude]}
                zoom={12}
                className="h-full w-full z-0"
              >
                <TileLayer
                  url={
                    mapType === "satellite"
                      ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  }
                />

                <FitBoundsEntregador
                  pontos={[
                    [entrega.origem_latitude, entrega.origem_longitude],
                    [entrega.destino_latitude, entrega.destino_longitude],
                    minhaPosicao
                  ].filter(Boolean)}
                />

                {/* ORIGEM */}
                <Marker key="origem" position={[entrega.origem_latitude, entrega.origem_longitude]}>
                  <Tooltip permanent direction="top" offset={[0, -10]}>
                    Origem: {entrega.origem_endereco}
                  </Tooltip>
                </Marker>

                {/* DESTINO */}
                <Marker position={[entrega.destino_latitude, entrega.destino_longitude]}>
                  <Tooltip permanent direction="top" offset={[0, -10]}>
                    Destino: {entrega.destino_endereco}
                  </Tooltip>
                </Marker>

                {minhaPosicao && (
                  <Marker position={minhaPosicao}>
                    <Tooltip permanent direction="top" offset={[0, -10]}>Você</Tooltip>
                  </Marker>
                )}

                {/* LINHA */}
                {/* PARTE PERCORRIDA (AZUL) */}
                {rotaPercorrida.length > 1 && (
                  <Polyline
                    positions={rotaPercorrida}
                    pathOptions={{ color: "#2563eb", weight: 5 }}
                  />
                )}

                {/* RESTO DA ROTA (CINZA) */}
                {rotaRestante.length > 1 && (
                  <Polyline
                    positions={rotaRestante}
                    pathOptions={{ color: "red", weight: 5 }}
                  />
                )}
              </MapContainer>

            </div>

          </section>

          {/* SOLICITANTE */}
          <section className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-700">
                Dados do solicitante
                </h2>

                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Em contacto
                </span>
            </div>

            {/* PERFIL */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-lg">
                {entrega.solicitanteData?.nome.charAt(0)}
                </div>

                <div>
                <p className="font-bold text-gray-800">
                    {entrega.solicitanteData?.nome}
                </p>
                <p className="text-sm text-gray-500">
                    Cliente
                </p>
              </div>
            </div>

            {/* CONTATOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a
                href={`tel:${entrega.solicitanteData?.telefone}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition"
                >
                <i className="fas fa-phone text-green-600"></i>
                <span className="text-sm font-semibold text-gray-700">
                    Ligar
                </span>
                </a>

                <a
                href={`https://wa.me/${entrega.solicitanteData?.telefone.replace(/\s+/g, "")}`}
                target="_blank"
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition"
                >
                <i className="fab fa-whatsapp text-green-500"></i>
                <span className="text-sm font-semibold text-gray-700">
                    WhatsApp
                </span>
                </a>
            </div>

            {/* BOTÃO CHAT INTERNO */}
            <button 
                onClick={() => setOpenChat(true)}
                className="w-full cursor-pointer py-3 bg-red-700 text-white font-bold rounded-xl hover:bg-red-800 transition flex items-center justify-center gap-2">
                <i className="fas fa-message"></i>
                Enviar mensagem no app
            </button>

            </section>  

          {/*  AÇÃO */}
          <section className="flex gap-3">
            {!entrega.entregador && (
              <button
                onClick={async () => {
                  await aceitarPedido(entrega.id);
                  fetchEntrega();
                }}
                className="flex-1 py-4 cursor-pointer bg-green-600 text-white font-bold rounded-2xl"
              >
                Aceitar corrida
              </button>
            )}

            {entrega.entregador && STATUS_FLOW[entrega.status] && (
              <button
                onClick={handleAtualizarStatus}
                className={`flex-1 py-4 cursor-pointer text-white font-bold rounded-2xl transition ${
                  STATUS_STYLE[entrega.status] || "bg-red-700"
                }`}
              >
                {STATUS_FLOW[entrega.status].label}
              </button>
            )}

          </section>

        </div>

        <Modal
            isOpen={openChat}
            onClose={() => setOpenChat(false)}
            title={entrega.solicitanteData?.nome}
            icon="fas fa-comment-dots"
            >
            <div className="flex flex-col h-[65vh] max-h-[75vh]">

                {/* MENSAGENS */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                {mensagensChat.map((m) => (
                    <div key={m.id} className={`flex ${m.enviadoPor === "eu" ? "justify-end" : "justify-start"}`}>
                    <div className={`inline-block max-w-[85%] p-3 rounded-2xl text-[13px] font-medium shadow-sm ${
                        m.enviadoPor === "eu" 
                        ? "bg-gray-900 text-white rounded-tr-none ml-auto" 
                        : "bg-white text-gray-700 border border-gray-100 rounded-tl-none mr-auto"
                    }`}>
                        <p>{m.texto}</p>
                        <span className="block text-[8px] mt-1.5 font-bold uppercase tracking-widest opacity-60">
                        {m.hora}
                        </span>
                    </div>
                    </div>
                ))}
                </div>

                {/* INPUT */}
                <div className="border-t border-gray-100 pt-3 flex gap-2 items-center bg-white px-4">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Mensagem..."
                    className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:bg-white focus:border-red-700 outline-none text-sm"
                />

                <button className="w-11 h-11 bg-red-700 text-white rounded-xl flex items-center justify-center hover:bg-red-800 transition">
                    <i className="fas fa-paper-plane text-sm"></i>
                </button>
                </div>

            </div>
        </Modal>

      </EntregadorLayout>
    </>
  );
}
