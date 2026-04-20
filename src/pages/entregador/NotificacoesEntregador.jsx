import { useState, useEffect } from "react";
import EntregadorLayout from "./components/EntregadorLayout";
import { getNotificacoes } from "../../services/notificacoesService";
import { useAuth } from "../../contexts/AuthContext";

export default function NotificacoesSolicitante() {
  const { user } = useAuth();
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 6;

  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        setLoading(true);

        const data = await getNotificacoes();

        const minhas = data.filter(
          (n) => n.usuario === user?.id
        );

        const formatted = minhas.map((n, index) => ({
          id: index + 1,
          tipo: "system",
          titulo: n.titulo,
          descricao: n.mensagem,
          horario: "Agora",
          lida: false,
          icon: "fa-bell",
          color: "text-red-600 bg-red-50"
        }));

        setNotificacoes(formatted);

      } catch (err) {
        console.error("Erro ao buscar notificações:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchNotificacoes();

  }, [user?.id]);

  const marcarComoLida = (id) => {
    setNotificacoes(notificacoes.map(n => n.id === id ? { ...n, lida: true } : n));
  };

  const limparTodas = () => {
    setNotificacoes([]);
  };

  // LISTA EXIBIDA (LIMITADA)
  const notificacoesExibidas = showAll
    ? notificacoes
    : notificacoes.slice(0, INITIAL_COUNT);

  return (
    <>
      <title>Notificações | Kamba Delivery</title>
      <EntregadorLayout title="Notificações">
        <div className="space-y-6">
          
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Suas Notificações</h2>
              <p className="text-sm text-gray-500 font-medium">Fique por dentro de tudo o que acontece com seus pedidos</p>
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

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <i className="fas fa-spinner animate-spin text-red-700 text-3xl mb-4"></i>
              <p className="text-red-600 text-sm font-semibold">
                Carregando notificações...
              </p>
            </div>
          )}

          {/* LISTA DE NOTIFICAÇÕES */}
          <div className="space-y-3">
            {!loading && notificacoesExibidas.length > 0 ? (
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
                  {/* ÍCONE DINÂMICO */}
                  <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-lg ${n.color}`}>
                    <i className={`fas ${n.icon}`}></i>
                  </div>

                  {/* CONTEÚDO */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h3 className={`text-sm font-bold ${n.lida ? "text-gray-600" : "text-gray-800"}`}>
                        {n.titulo}
                      </h3>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter shrink-0">
                        {n.horario}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                      {n.descricao}
                    </p>
                  </div>

                  {/* INDICADOR DE NÃO LIDA */}
                  {!n.lida && (
                    <div className="absolute top-5 right-5 w-2 h-2 bg-red-700 rounded-full"></div>
                  )}
                  
                  {/* OVERLAY DE HOVER PARA MARCAR COMO LIDA (OPCIONAL) */}
                  <div className="absolute inset-0 bg-red-700/0 group-hover:bg-red-700/1 rounded-3xl transition-all"></div>
                </div>
              ))
            ) : (
              <div className="text-center py-24 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <i className="fas fa-bell-slash text-2xl text-gray-200"></i>
                </div>
                <h3 className="font-bold text-gray-800">Tudo limpo por aqui!</h3>
                <p className="text-sm text-gray-400 font-medium mt-1">Você não tem novas notificações no momento.</p>
              </div>
            )}
          </div>

          {!loading && notificacoes.length > INITIAL_COUNT && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="px-6 py-3 cursor-pointer bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-all uppercase tracking-widest shadow-lg"
              >
                {showAll ? "Ver menos notificações" : "Ver mais notificações"}
              </button>
            </div>
          )}
        </div>
      </EntregadorLayout>
    </>
  );
}
