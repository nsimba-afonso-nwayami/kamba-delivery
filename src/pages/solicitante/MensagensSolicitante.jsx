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
      {/* px-3 para telas muito pequenas como o itel P65 */}
      <div className="max-w-4xl mx-auto pb-20">
        
        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">Suas Conversas</h2>
          <p className="text-[11px] md:text-sm text-gray-500 font-medium leading-tight">Fale com seus entregadores ou suporte</p>
        </div>

        {/* LISTA DE CONVERSAS - Fix para telas estreitas */}
        <div className="bg-white border border-gray-100 rounded-4xl overflow-hidden shadow-sm">
          {conversas.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className="w-full flex items-start sm:items-center gap-3 p-4 hover:bg-gray-50 transition-all border-b border-gray-50 last:border-0 text-left"
            >
              {/* Avatar com tamanho fixo para não quebrar o flex */}
              <div className="relative shrink-0 mt-1 sm:mt-0">
                <img src={chat.foto} className="w-12 h-12 rounded-2xl object-cover shadow-sm" alt={chat.nome} />
                {chat.online && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                )}
              </div>

              {/* Conteúdo Central - min-w-0 é CRUCIAL para o truncate funcionar */}
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex justify-between items-center gap-2">
                  <h3 className="font-bold text-gray-800 text-sm truncate">{chat.nome}</h3>
                  <span className="text-[9px] font-bold text-gray-400 uppercase shrink-0">{chat.horario}</span>
                </div>
                <p className="text-red-700 font-bold uppercase tracking-widest text-[8px] mb-0.5">{chat.cargo}</p>
                <p className="text-xs text-gray-500 truncate font-medium pr-2">{chat.ultimoTexto}</p>
              </div>

              {/* Notificação */}
              {chat.naoLidas > 0 && (
                <div className="shrink-0 self-center">
                  <div className="w-5 h-5 bg-red-700 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-md shadow-red-100">
                    {chat.naoLidas}
                  </div>
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
          {/* h-[65vh] evita que o modal "fure" o teclado no mobile */}
          <div className="flex flex-col h-[65vh] max-h-125">
            
            {/* CORPO DA MENSAGEM */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
              {mensagensChat.map((m) => (
                <div key={m.id} className={`flex ${m.enviadoPor === "eu" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[88%] p-3 rounded-2xl text-[13px] font-medium shadow-sm ${
                    m.enviadoPor === "eu" 
                    ? "bg-gray-900 text-white rounded-tr-none" 
                    : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"
                  }`}>
                    <p className="leading-snug wrap-break-word">{m.texto}</p>
                    <span className={`block text-[8px] mt-1.5 font-bold uppercase tracking-widest opacity-60`}>
                      {m.hora}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT DE MENSAGEM - Compacto para telas estreitas */}
            <div className="pt-3 flex gap-2 items-center">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Mensagem..."
                  className="w-full px-4 py-3 bg-gray-100 border border-transparent rounded-xl focus:bg-white focus:border-red-700 outline-none transition-all text-sm"
                />
              </div>
              <button className="w-11 h-11 shrink-0 bg-red-700 text-white rounded-xl flex items-center justify-center hover:bg-red-800 transition-all active:scale-95 shadow-lg shadow-red-200">
                <i className="fas fa-paper-plane text-sm"></i>
              </button>
            </div>
          </div>
        </Modal>

      </div>
    </SolicitanteLayout>
  );
}
