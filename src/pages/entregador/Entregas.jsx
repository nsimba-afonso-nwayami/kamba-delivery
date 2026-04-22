import { useState, useEffect } from "react";
import EntregadorLayout from "./components/EntregadorLayout";
import Modal from "./components/Modal";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getMeusPedidosAtivos } from "../../services/pedidosService";
import { getUsuarioById } from "../../services/usuariosService";
import { useAuth } from "../../contexts/AuthContext";
import { formatPrice } from "../../utils/formatPrice";

export default function EntregasEntregador() {
    const [openChat, setOpenChat] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [mapType, setMapType] = useState("map"); // "map" | "satellite"
    const { user } = useAuth();
    const [entrega, setEntrega] = useState(null);
    const [loading, setLoading] = useState(true);

  // Dados da API
  useEffect(() => {
    const loadEntrega = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);

        const ativos = await getMeusPedidosAtivos(user.id);
         console.log("PEDIDOS ATIVOS:", ativos);

        // GARANTE APENAS UMA
        if (ativos.length > 0) {
          let pedido = ativos[0];

          // buscar dados do solicitante
          if (pedido.solicitante && typeof pedido.solicitante === "number") {
            try {
              const usuario = await getUsuarioById(pedido.solicitante);
              console.log("SOLICITANTE DATA:", usuario);

              pedido = {
                ...pedido,
                solicitanteData: usuario,
              };
            } catch (err) {
              console.log("Erro ao buscar solicitante:", err);
            }
          }

          setEntrega(pedido);
        } else {
          setEntrega(null);
        }

      } catch (err) {
        console.log("Erro ao carregar entrega:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEntrega();
  }, [user?.id]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (user?.id) {
        const ativos = await getMeusPedidosAtivos(user.id);

        if (ativos.length > 0) {
          let pedido = ativos[0];

          // repetir lógica do solicitante
          if (pedido.solicitante && typeof pedido.solicitante === "number") {
            try {
              const usuario = await getUsuarioById(pedido.solicitante);

              pedido = {
                ...pedido,
                solicitanteData: usuario,
              };
            } catch (err) {
              console.log("Erro ao buscar solicitante:", err);
            }
          }

          setEntrega(pedido);
        } else {
          setEntrega(null);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [user?.id]);

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
                <p className="font-bold text-red-700 text-lg">
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
                  {entrega.valor_sugerido}
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

                {/* ORIGEM */}
                <Marker position={[entrega.origem_latitude, entrega.origem_longitude]}>
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

                {/* LINHA */}
                <Polyline
                  positions={[
                    [entrega.origem_latitude, entrega.origem_longitude],
                    [entrega.destino_latitude, entrega.destino_longitude],
                  ]}
                  pathOptions={{ color: "red", weight: 4 }}
                />
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
            <button className="flex-1 cursor-pointer py-4 bg-red-700 text-white font-bold rounded-2xl hover:bg-red-800 transition shadow-lg shadow-red-700/20 active:scale-[0.98]">
                Aceitar corrida
            </button>

            <button className="flex-1 cursor-pointer py-4 bg-white border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition active:scale-[0.98]">
                Recusar
            </button>

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
