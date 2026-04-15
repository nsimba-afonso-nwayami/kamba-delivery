import { useState } from "react";
import SolicitanteLayout from "./components/SolicitanteLayout";

export default function NotificacoesSolicitante() {
  const [notificacoes, setNotificacoes] = useState([
    {
      id: 1,
      tipo: "pedido",
      titulo: "Pedido em rota!",
      descricao: "O entregador Carlos Miguel já recolheu seu pedido e está a caminho.",
      horario: "Há 5 min",
      lida: false,
      icon: "fa-motorcycle",
      color: "text-blue-600 bg-blue-50"
    },
    {
      id: 2,
      tipo: "promo",
      titulo: "Cupom de Desconto",
      descricao: "Use o código KAMBA500 para ganhar 500 Kz de desconto na próxima entrega.",
      horario: "Há 1 hora",
      lida: false,
      icon: "fa-ticket-alt",
      color: "text-amber-600 bg-amber-50"
    },
    {
      id: 3,
      tipo: "seguranca",
      titulo: "Login Detectado",
      descricao: "Um novo acesso foi realizado na sua conta a partir de um dispositivo Chrome em Luanda.",
      horario: "Ontem, 18:40",
      lida: true,
      icon: "fa-shield",
      color: "text-emerald-600 bg-emerald-50"
    }
  ]);

  const marcarComoLida = (id) => {
    setNotificacoes(notificacoes.map(n => n.id === id ? { ...n, lida: true } : n));
  };

  const limparTodas = () => {
    setNotificacoes([]);
  };

  return (
    <>
      <title>Notificações | Kamba Delivery</title>
      <SolicitanteLayout title="Notificações">
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

          {/* LISTA DE NOTIFICAÇÕES */}
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

          {/* DICA DE CONFIGURAÇÃO */}
          {notificacoes.length > 0 && (
            <div className="mt-8 p-6 bg-gray-900 rounded-3xl flex items-center justify-between overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="text-white font-bold text-sm">Gerenciar Alertas</h4>
                <p className="text-gray-400 text-xs font-medium">Escolha como quer receber seus avisos.</p>
              </div>
              <button className="relative z-10 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold rounded-xl transition-all uppercase tracking-widest border border-white/10">
                Configurar
              </button>
              <i className="fas fa-cog absolute -right-4 -bottom-4 text-6xl text-white/5 rotate-12"></i>
            </div>
          )}
        </div>
      </SolicitanteLayout>
    </>
  );
}
