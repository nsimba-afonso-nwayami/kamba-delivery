import { useState } from "react";
import EntregadorLayout from "./components/EntregadorLayout";
import Modal from "./components/Modal";

export default function MensagensEntregador() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const conversas = [
    {
      id: 1,
      nome: "João Pedro",
      cargo: "Cliente",
      ultimoTexto: "Estou na entrada principal.",
      horario: "14:25",
      foto: "https://i.pravatar.cc/150?u=cliente1",
      online: true,
      naoLidas: 1,
    },
    {
      id: 2,
      nome: "Suporte Kamba",
      cargo: "Atendimento",
      ultimoTexto: "Precisa de ajuda com a entrega?",
      horario: "Ontem",
      foto: "https://i.pravatar.cc/150?u=suporte",
      online: false,
      naoLidas: 0,
    },
  ];

  const mensagensChat = [
    {
      id: 1,
      texto: "Olá! Já estou a caminho do local.",
      enviadoPor: "eu",
      hora: "14:20",
    },
    {
      id: 2,
      texto: "Ok, estou à espera aqui na portaria.",
      enviadoPor: "outro",
      hora: "14:22",
    },
    {
      id: 3,
      texto: "Perfeito, chego em 2 minutos.",
      enviadoPor: "eu",
      hora: "14:23",
    },
  ];

  return (
    <>
      <title>Mensagens | Kamba Delivery</title>

      <EntregadorLayout title="Mensagens">
        <div className="space-y-6">

          {/* HEADER */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">
              Conversas
            </h2>
            <p className="text-[11px] md:text-sm text-gray-500 font-medium leading-tight">
              Fale com clientes ou suporte
            </p>
          </div>

          {/* LISTA */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm w-full">
            {conversas.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className="w-full flex items-start sm:items-center gap-3 p-4 hover:bg-gray-50 transition-all border-b border-gray-50 last:border-0 text-left"
              >
                {/* Avatar */}
                <div className="relative shrink-0 mt-1 sm:mt-0">
                  <img
                    src={chat.foto}
                    className="w-12 h-12 rounded-2xl object-cover shadow-sm"
                    alt={chat.nome}
                  />
                  {chat.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="flex justify-between items-center gap-2">
                    <h3 className="font-bold text-gray-800 text-sm truncate">
                      {chat.nome}
                    </h3>
                    <span className="text-[9px] font-bold text-gray-400 uppercase">
                      {chat.horario}
                    </span>
                  </div>

                  <p className="text-red-700 font-bold uppercase tracking-widest text-[8px] mb-0.5">
                    {chat.cargo}
                  </p>

                  <p className="text-xs text-gray-500 truncate font-medium pr-2">
                    {chat.ultimoTexto}
                  </p>
                </div>

                {/* Notificação */}
                {chat.naoLidas > 0 && (
                  <div className="w-5 h-5 bg-red-700 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-md shadow-red-100">
                    {chat.naoLidas}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* MODAL CHAT */}
          <Modal
            isOpen={!!selectedChat}
            onClose={() => setSelectedChat(null)}
            title={selectedChat?.nome || "Conversa"}
            icon="fas fa-comment-dots"
          >
            <div className="flex flex-col h-[65vh] max-h-[75vh]">

              {/* MENSAGENS */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                {mensagensChat.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.enviadoPor === "eu"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`inline-block max-w-[85%] p-3 rounded-2xl text-[13px] font-medium shadow-sm ${
                        m.enviadoPor === "eu"
                          ? "bg-gray-900 text-white rounded-tr-none ml-auto"
                          : "bg-white text-gray-700 border border-gray-100 rounded-tl-none mr-auto"
                      }`}
                    >
                      <p className="leading-snug">{m.texto}</p>
                      <span className="block text-[8px] mt-1.5 font-bold uppercase tracking-widest opacity-60">
                        {m.hora}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* INPUT */}
              <div className="border-t border-gray-100 pt-3 flex gap-2 items-center bg-white px-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Mensagem..."
                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:bg-white focus:border-red-700 outline-none text-sm"
                  />
                </div>

                <button className="w-11 h-11 bg-red-700 text-white rounded-xl flex items-center justify-center hover:bg-red-800 transition shadow-lg shadow-red-200">
                  <i className="fas fa-paper-plane text-sm"></i>
                </button>
              </div>

            </div>
          </Modal>

        </div>
      </EntregadorLayout>
    </>
  );
}
