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

  // Simulação de mensagens dentro do chat
  const mensagensChat = [
    { id: 1, texto: "Olá! Onde exatamente no Talatona você está?", enviadoPor: "eu", hora: "14:20" },
    { id: 2, texto: "Estou na entrada principal do Condomínio Girassol.", enviadoPor: "outro", hora: "14:22" },
    { id: 3, texto: "Beleza, já estou a chegar!", enviadoPor: "outro", hora: "14:23" },
  ];

  return (
    <SolicitanteLayout title="Mensagens">
      <div className="max-w-4xl mx-auto pb-20">
        
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Suas Conversas</h2>
          <p className="text-sm text-gray-500 font-medium">Fale com seus entregadores ou com o nosso suporte</p>
        </div>

        {/* LISTA DE CONVERSAS */}
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          {conversas.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition-all border-b border-gray-50 last:border-0 text-left"
            >
              <div className="relative">
                <img src={chat.foto} className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt={chat.nome} />
                {chat.online && (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-gray-800 truncate">{chat.nome}</h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{chat.horario}</span>
                </div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1 text-[9px]">{chat.cargo}</p>
                <p className="text-sm text-gray-500 truncate font-medium">{chat.ultimoTexto}</p>
              </div>

              {chat.naoLidas > 0 && (
                <div className="w-6 h-6 bg-red-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md shadow-red-200">
                  {chat.naoLidas}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* MODAL DO CHAT / CONVERSA */}
        <Modal
          isOpen={!!selectedChat}
          onClose={() => setSelectedChat(null)}
          title={selectedChat?.nome || "Conversa"}
          icon="fas fa-comment-dots"
        >
          <div className="flex flex-col h-125">
            
            {/* CORPO DA MENSAGEM */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 rounded-2xl">
              {mensagensChat.map((m) => (
                <div key={m.id} className={`flex ${m.enviadoPor === "eu" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium shadow-sm ${
                    m.enviadoPor === "eu" 
                    ? "bg-gray-900 text-white rounded-tr-none" 
                    : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"
                  }`}>
                    <p>{m.texto}</p>
                    <span className={`block text-[9px] mt-1 font-bold uppercase tracking-widest ${
                      m.enviadoPor === "eu" ? "text-gray-400" : "text-gray-300"
                    }`}>
                      {m.hora}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT DE MENSAGEM */}
            <div className="pt-4 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escreva sua mensagem..."
                className="flex-1 px-5 py-3.5 bg-gray-100 border border-transparent rounded-2xl focus:bg-white focus:border-red-700 focus:ring-4 focus:ring-red-700/5 outline-none transition-all text-sm font-medium"
              />
              <button className="w-12 h-12 bg-red-700 text-white rounded-2xl flex items-center justify-center hover:bg-red-800 transition-all active:scale-90 shadow-lg shadow-red-200">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </Modal>

      </div>
    </SolicitanteLayout>
  );
}
