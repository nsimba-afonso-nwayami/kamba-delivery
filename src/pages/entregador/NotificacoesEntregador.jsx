import { useState } from "react";
import EntregadorLayout from "./components/EntregadorLayout";

export default function NotificacoesEntregador() {
  const [notificacoes, setNotificacoes] = useState([
    {
      id: 1,
      tipo: "corrida",
      titulo: "Nova corrida disponível!",
      descricao: "Uma nova entrega foi solicitada próximo de você em Talatona.",
      horario: "Há 2 min",
      lida: false,
      icon: "fa-box",
      color: "text-blue-600 bg-blue-50"
    },
    {
      id: 2,
      tipo: "ganho",
      titulo: "Pagamento recebido",
      descricao: "Você recebeu 2.500 Kz por uma entrega concluída.",
      horario: "Há 20 min",
      lida: false,
      icon: "fa-wallet",
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      id: 3,
      tipo: "sistema",
      titulo: "Atualização de sistema",
      descricao: "Novas funcionalidades foram adicionadas ao app do entregador.",
      horario: "Ontem, 18:40",
      lida: true,
      icon: "fa-bell",
      color: "text-amber-600 bg-amber-50"
    }
  ]);

  const marcarComoLida = (id) => {
    setNotificacoes(
      notificacoes.map((n) =>
        n.id === id ? { ...n, lida: true } : n
      )
    );
  };

  const limparTodas = () => {
    setNotificacoes([]);
  };

  return (
    <>
      <title>Notificações | Kamba Delivery</title>

      <EntregadorLayout title="Notificações">
        <div className="space-y-6">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                Notificações
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                Acompanhe suas corridas e atualizações do sistema
              </p>
            </div>

            {notificacoes.length > 0 && (
              <button
                onClick={limparTodas}
                className="text-xs font-bold text-red-700 hover:text-red-900 uppercase tracking-widest transition-colors"
              >
                Limpar todas
              </button>
            )}
          </div>

          {/* LISTA */}
          <div className="space-y-3">
            {notificacoes.length > 0 ? (
              notificacoes.map((n) => (
                <div
                  key={n.id}
                  onClick={() => marcarComoLida(n.id)}
                  className={`group relative flex items-start gap-4 p-5 rounded-3xl border transition-all cursor-pointer ${
                    n.lida
                      ? "bg-white border-gray-100 opacity-75"
                      : "bg-white border-red-100 shadow-md shadow-red-50"
                  }`}
                >
                  {/* ÍCONE */}
                  <div
                    className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-lg ${n.color}`}
                  >
                    <i className={`fas ${n.icon}`}></i>
                  </div>

                  {/* CONTEÚDO */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h3
                        className={`text-sm font-bold ${
                          n.lida ? "text-gray-600" : "text-gray-800"
                        }`}
                      >
                        {n.titulo}
                      </h3>

                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        {n.horario}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                      {n.descricao}
                    </p>
                  </div>

                  {/* INDICADOR */}
                  {!n.lida && (
                    <div className="absolute top-5 right-5 w-2 h-2 bg-red-700 rounded-full"></div>
                  )}

                  {/* HOVER */}
                  <div className="absolute inset-0 bg-red-700/0 group-hover:bg-red-700/5 rounded-3xl transition-all"></div>
                </div>
              ))
            ) : (
              <div className="text-center py-24 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <i className="fas fa-bell-slash text-2xl text-gray-200"></i>
                </div>

                <h3 className="font-bold text-gray-800">
                  Sem notificações
                </h3>

                <p className="text-sm text-gray-400 font-medium mt-1">
                  Você não tem novas atualizações no momento.
                </p>
              </div>
            )}
          </div>

          {/* CONFIG */}
          {notificacoes.length > 0 && (
            <div className="mt-8 p-6 bg-gray-900 rounded-3xl flex items-center justify-between overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="text-white font-bold text-sm">
                  Gerenciar Alertas
                </h4>
                <p className="text-gray-400 text-xs font-medium">
                  Controle como deseja receber notificações.
                </p>
              </div>

              <button className="relative z-10 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold rounded-xl transition-all uppercase tracking-widest border border-white/10">
                Configurar
              </button>

              <i className="fas fa-cog absolute -right-4 -bottom-4 text-6xl text-white/5 rotate-12"></i>
            </div>
          )}

        </div>
      </EntregadorLayout>
    </>
  );
}
