import { useState } from "react";
import SolicitanteLayout from "./components/SolicitanteLayout";
import Modal from "./components/Modal";

export default function MensagensSolicitante() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const conversas = [
    {
      id: 1,
      nome: "Carlos Miguel",
      cargo: "Entregador",
      ultimoTexto: "Já estou próximo ao local de recolha.",
      horario: "14:25",
      foto: "https://i.pravatar.cc/150?u=carlos",
      online: true,
      naoLidas: 2,
    },
    {
      id: 2,
      nome: "Suporte Kamba",
      cargo: "Atendimento",
      ultimoTexto: "Seu reembolso foi processado com sucesso.",
      horario: "Ontem",
      foto: "https://i.pravatar.cc/150?u=suporte",
      online: false,
      naoLidas: 0,
    },
  ];

  const mensagensChat = [
    { id: 1, texto: "Olá! Onde exatamente no Talatona você está?", enviadoPor: "eu", hora: "14:20" },
    { id: 2, texto: "Estou na entrada principal do Condomínio Girassol.", enviadoPor: "outro", hora: "14:22" },
    { id: 3, texto: "Beleza, já estou a chegar!", enviadoPor: "outro", hora: "14:23" },
  ];

  return (
    <SolicitanteLayout title="Mensagens">
      {/* Ajustado padding lateral para mobile (px-4) */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        
        {/* HEADER */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">Suas Conversas</h2>
          <p className="text-xs md:text-sm text-gray-500 font-medium">Fale com seus entregadores ou com o nosso suporte</p>
        </div>

        {/* LISTA DE CONVERSAS */}
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          {conversas.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-gray-50 transition-all border-b border-gray-50 last:border-0 text-left"
            >
              <div className="relative shrink-0">
                <img src={chat.foto} className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover shadow-sm" alt={chat.nome} />
                {chat.online && (
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="font-bold text-gray-800 text-sm md:text-base truncate">{chat.nome}</h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter shrink-0 ml-2">{chat.horario}</span>
                </div>
                <p className="text-gray-400 font-bold uppercase tracking-widest mb-1 text-[9px]">{chat.cargo}</p>
                <p className="text-xs md:text-sm text-gray-500 truncate font-medium">{chat.ultimoTexto}</p>
              </div>

              {chat.naoLidas > 0 && (
                <div className="shrink-0 w-5 h-5 md:w-6 md:h-6 bg-red-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md shadow-red-200 ml-2">
                  {chat.naoLidas}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* MODAL DO CHAT */}
        <Modal
          isOpen={!!selectedChat}
          onClose={() => setSelectedChat(null)}
          title={selectedChat?.nome || "Conversa"}
          icon="fas fa-comment-dots"
        >
          {/* h-[70vh] garante que o chat não ultrapasse a tela do celular */}
          <div className="flex flex-col h-[70vh] md:h-125">
            
            {/* CORPO DA MENSAGEM */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 bg-gray-50/50 rounded-2xl">
              {mensagensChat.map((m) => (
                <div key={m.id} className={`flex ${m.enviadoPor === "eu" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] md:max-w-[80%] p-3 md:p-4 rounded-2xl text-sm font-medium shadow-sm ${
                    m.enviadoPor === "eu" 
                    ? "bg-gray-900 text-white rounded-tr-none" 
                    : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"
                  }`}>
                    <p className="leading-relaxed">{m.texto}</p>
                    <span className={`block text-[9px] mt-1 font-bold uppercase tracking-widest ${
                      m.enviadoPor === "eu" ? "text-gray-400" : "text-gray-300"
                    }`}>
                      {m.hora}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT DE MENSAGEM - Ajustado para não quebrar em telas pequenas */}
            <div className="pt-4 flex gap-2 items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escreva..."
                className="flex-1 min-w-0 px-4 py-3 bg-gray-100 border border-transparent rounded-2xl focus:bg-white focus:border-red-700 outline-none transition-all text-sm font-medium"
              />
              <button className="w-12 h-12 shrink-0 bg-red-700 text-white rounded-2xl flex items-center justify-center hover:bg-red-800 transition-all active:scale-90 shadow-lg shadow-red-200">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </Modal>

      </div>
    </SolicitanteLayout>
  );
}
