import { useState } from "react";
import EntregadorLayout from "./components/EntregadorLayout";
import Modal from "./components/Modal";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";



export default function EntregasEntregador() {
    const [openChat, setOpenChat] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [mapType, setMapType] = useState("map"); // "map" | "satellite"

  // MOCK (depois vem da API)
  const entrega = {
    titulo: "Entrega de documentos",
    descricao: "Entregar envelope urgente",
    origem: "Talatona",
    destino: "Ingombotas",
    distancia: "8.2 km",
    valor: "2.500 Kz",

    origemCoords: [-8.9176, 13.1964],
    destinoCoords: [-8.8159, 13.2302],

    solicitante: {
      nome: "João Pedro",
      telefone: "+244 923 000 000",
    },
  };

  const mensagensChat = [
  { id: 1, texto: "Olá, já estou a caminho.", enviadoPor: "eu", hora: "14:20" },
  { id: 2, texto: "Ok, estou à espera.", enviadoPor: "outro", hora: "14:22" },
];

  return (
    <>
      <title>Entregas | Kamba Delivery</title>

      <EntregadorLayout title="Entregas">

        <div className="space-y-6">

          {/* 📦 DADOS DA CORRIDA */}
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
                  {entrega.valor}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 text-sm">

              <div>
                <p className="text-gray-400 text-xs">Origem</p>
                <p className="font-semibold text-gray-800">
                  {entrega.origem}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Destino</p>
                <p className="font-semibold text-gray-800">
                  {entrega.destino}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Distância</p>
                <p className="font-semibold text-gray-800">
                  {entrega.distancia}
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

          {/* 🗺️ MAPA */}
          <section className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">

            <div className="w-full h-100 rounded-xl overflow-hidden relative z-0">

              <div className="flex justify-end mb-3">
              <button
                onClick={() =>
                  setMapType(mapType === "map" ? "satellite" : "map")
                }
                className="px-4 py-2 text-xs font-bold rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition flex items-center gap-2"
              >
                <i
                  className={`fas ${
                    mapType === "map" ? "fa-satellite" : "fa-map"
                  } text-red-700`}
                ></i>

                {mapType === "map" ? "Satélite" : "Mapa"}
              </button>
            </div>

              <MapContainer
                center={entrega.origemCoords}
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
                <Marker position={entrega.origemCoords}>
                  <Popup>Origem</Popup>
                </Marker>

                {/* DESTINO */}
                <Marker position={entrega.destinoCoords}>
                  <Popup>Destino</Popup>
                </Marker>

                {/* LINHA */}
                <Polyline
                  positions={[
                    entrega.origemCoords,
                    entrega.destinoCoords,
                  ]}
                  pathOptions={{ color: "red", weight: 4 }}
                />

              </MapContainer>

            </div>

          </section>

          {/* 👤 SOLICITANTE */}
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
                {entrega.solicitante.nome.charAt(0)}
                </div>

                <div>
                <p className="font-bold text-gray-800">
                    {entrega.solicitante.nome}
                </p>
                <p className="text-sm text-gray-500">
                    Cliente
                </p>
                </div>
            </div>

            {/* CONTATOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a
                href={`tel:${entrega.solicitante.telefone}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition"
                >
                <i className="fas fa-phone text-green-600"></i>
                <span className="text-sm font-semibold text-gray-700">
                    Ligar
                </span>
                </a>

                <a
                href={`https://wa.me/${entrega.solicitante.telefone.replace(/\s+/g, "")}`}
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
            title={entrega.solicitante.nome}
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
