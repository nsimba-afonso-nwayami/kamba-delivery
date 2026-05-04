import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EntregadorLayout from "./components/EntregadorLayout";
import ModalSmall from "./components/ModalSmall";
import { getPedidos, getPedidosPublicos, getMeusPedidosAtivos, getHistoricoEntregador,  aceitarPedido } from "../../services/pedidosService";
import { getAvaliacoes } from "../../services/avaliacoesService";
import { createNotificacao } from "../../services/notificacoesService";
import { useAuth } from "../../contexts/AuthContext";
import { formatPrice } from "../../utils/formatPrice";
import toast from "react-hot-toast";

export default function DashboardEntregador() {
  const [isSaldoOpen, setIsSaldoOpen] = useState(false);
  const [isDadosBancariosOpen, setIsDadosBancariosOpen] = useState(false);
  const { user } = useAuth();
  const [ganhosHoje, setGanhosHoje] = useState(0);
  const [corridasHoje, setCorridasHoje] = useState(0);
  const [avaliacao, setAvaliacao] = useState(0);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const INITIAL_COUNT = 6;
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const refreshDashboard = async () => {
    if (!user?.id) return;

    try {
      const [historico, avaliacoes] = await Promise.all([
        getHistoricoEntregador(user.id),
        getAvaliacoes(),
      ]);

      const hoje = new Date().toISOString().split("T")[0];

      const corridasHoje = historico.filter((p) => {
        const dataPedido = (p.criado_em)?.split("T")[0];
        return dataPedido === hoje && p.status === "ENTREGUE";
      });

      const ganhos = corridasHoje.reduce((acc, p) => {
        return acc + Number(p.valor_final || p.valor_sugerido || 0);
      }, 0);

      const minhasAvaliacoes = avaliacoes.filter((a) =>
        historico.some((h) => String(h.id) === String(a.pedido || a.pedido_id))
      );

      const media =
        minhasAvaliacoes.length > 0
          ? minhasAvaliacoes.reduce((acc, a) => acc + Number(a.estrelas || a.nota || 0), 0) /
            minhasAvaliacoes.length
          : 0;

      setCorridasHoje(corridasHoje.length);
      setGanhosHoje(ganhos);
      setAvaliacao(media.toFixed(1));

    } catch (err) {
      console.log("Erro refresh dashboard:", err);
    }
  };

  useEffect(() => {
    refreshDashboard();

    const interval = setInterval(() => {
      refreshDashboard();
    }, 5000); // ou 10000 se quiseres menos carga

    return () => clearInterval(interval);
  }, [user?.id]);

  const statsCards = [
    {
      label: "Ganhos de Hoje",
      value: formatPrice(ganhosHoje),
      extra: null,
      align: "left",
    },
    {
      label: "Corridas",
      value: corridasHoje,
      extra: "Finalizadas",
      align: "split",
    },
    {
      label: "Avaliação",
      value: `${avaliacao}/5.0` || 0,
      extra: null,
      align: "split",
      stars: true,
    },
  ];

  useEffect(() => {
    const loadPedidos = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);

        const publicos = await getPedidosPublicos();

        const ordenados = publicos.sort(
          (a, b) => new Date(b.criado_em) - new Date(a.criado_em)
        );

        setPedidos(ordenados);

      } catch (err) {
        console.log("Erro ao carregar pedidos:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPedidos();
  }, [user?.id]);

  const pedidosExibidos = showAll
  ? pedidos
  : pedidos.slice(0, INITIAL_COUNT);

  const handleAceitarPedido = async (pedidoId) => {
    try {
      const pedidoSelecionado = pedidos.find((p) => p.id === pedidoId);

      if (!pedidoSelecionado) {
        toast.error("Pedido não encontrado.");
        return;
      }

      // chama backend primeiro (fonte da verdade)
      const response = await aceitarPedido(pedidoId);

      // remove da UI só se backend confirmar
      const updated = await getPedidosPublicos();

      const ordenados = updated.sort(
        (a, b) => new Date(b.criado_em) - new Date(a.criado_em)
      );

      setPedidos(ordenados);

      toast.success("Pedido aceite com sucesso!");
      
      navigate("/dashboard/entregador/entregas");

      // NOTIFICAÇÃO (corrigida defensivamente)
      if (pedidoSelecionado?.solicitante) {
        await createNotificacao({
          titulo: "Pedido aceite",
          mensagem: `O pedido "${pedidoSelecionado?.titulo}" (${formatPrice(pedidoSelecionado?.valor_sugerido)}) foi aceite por ${user?.nome}.`,
          usuario: pedidoSelecionado.solicitante,
        });
      }

    } catch (err) {
      console.log("Erro ao aceitar pedido:", err?.response?.data || err);

      toast.error(
        err?.response?.data?.erro ||
        "Erro ao aceitar pedido"
      );
    }
  };

  return (
    <>
      <title>Dashboard | Kamba Delivery</title>

      <EntregadorLayout title="Início">
        <div className="space-y-6">

          {/* SEÇÃO DE AÇÕES RÁPIDAS - Sem alturas fixas */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={() => setIsSaldoOpen(true)}
              className="flex-1 bg-red-900 py-10 px-6 rounded-2xl flex flex-col items-center justify-center gap-4 shadow-xl active:scale-95 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-rose-500/20 transition-colors shrink-0">
                <i className="fas fa-wallet text-white text-lg"></i>
              </div>
              <span className="text-[10px] font-bold text-rose-200 uppercase tracking-[0.2em] text-center leading-relaxed max-w-40">
                Saldo de Operação
              </span>
            </button>

            <button 
              onClick={() => setIsDadosBancariosOpen(true)}
              className="flex-1 bg-white py-10 px-6 rounded-2xl flex flex-col items-center justify-center gap-4 border border-rose-200 shadow-sm active:scale-95 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-rose-200/30 rounded-full flex items-center justify-center group-hover:bg-rose-200/50 transition-colors shrink-0">
                <i className="fas fa-university text-red-700 text-lg"></i>
              </div>
              <span className="text-[10px] font-bold text-red-700 uppercase tracking-[0.2em] text-center leading-relaxed max-w-40">
                Carregar Carteira
              </span>
            </button>
          </div>

          {/* SEÇÃO DE ESTATÍSTICAS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {statsCards.map((card, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm flex justify-between items-end"
              >
                <div className="text-left">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    {card.label}
                  </p>

                  <p className="text-2xl font-black text-red-900">
                    {card.value}
                  </p>
                </div>

                {/* EXTRA (Finalizadas / estrelas etc) */}
                {card.extra && (
                  <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl uppercase">
                    {card.extra}
                  </div>
                )}

                {/* ESTRELAS (só para avaliação) */}
                {card.stars && (
                  <div className="flex gap-0.5 text-rose-500 text-[10px] mb-2">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* LISTAGEM DE PEDIDOS */}
          <div className="space-y-4">
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <i className="fas fa-spinner animate-spin text-red-700 text-3xl mb-4"></i>
                  <p className="text-red-600 text-sm font-semibold">
                    Carregando pedidos...
                  </p>
                </div>
              ) : pedidosExibidos.length > 0 ? (
                <>
                <div className="flex items-center justify-between mb-4 px-2">
                  <h2 className="text-lg font-bold text-red-900 tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-red-700 rounded-full"></span>
                    Pedidos em Aberto
                  </h2>
                  <span className="text-[9px] font-black text-red-700 bg-rose-200 px-3 py-1 rounded-full uppercase tracking-tighter animate-pulse">Radar Ativo</span>
                </div>

                {pedidosExibidos.map((pedido) => (
                  <div key={pedido.id} className="bg-white border border-rose-200/60 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-start gap-4 mb-6 flex-wrap">
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{pedido.titulo} • {pedido.peso_kg}kg</span>
                        <h3 className="font-black text-red-900 text-2xl tracking-tight">{formatPrice(pedido.valor_sugerido)}</h3>
                      </div>
                      <button
                        onClick={() => handleAceitarPedido(pedido.id)}
                        className="bg-red-700 text-white px-8 py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-[0.15em] shadow-lg shadow-red-200 hover:bg-red-600 active:scale-95 transition-all cursor-pointer ml-auto">
                        Aceitar
                      </button>
                    </div>

                    {/* Linha do tempo recuperada e fluida */}
                    <div className="space-y-5 relative">
                      <div className="absolute left-2.25 top-3 bottom-3 w-0.5 bg-rose-200/50"></div>
                      
                      <div className="flex items-start gap-4 relative z-10">
                        <div className="w-5 h-5 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5 tracking-wider">Recolha</p>
                          <p className="text-sm font-bold text-gray-700 truncate">{pedido.origem_endereco}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 relative z-10">
                        <div className="w-5 h-5 bg-white border-2 border-red-700 rounded-full flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 bg-red-700 rounded-full"></div>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5 tracking-wider">Entrega</p>
                          <p className="text-sm font-bold text-gray-700 truncate">{pedido.destino_endereco}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                <i className="fas fa-box-open text-4xl text-gray-200 mb-4"></i>
                <p className="text-gray-400 font-bold">
                  Nenhum pedido disponível no momento.
                </p>
              </div>
            )}
          </div>

          {pedidos.length > INITIAL_COUNT && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="px-6 py-3 cursor-pointer bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-all uppercase tracking-widest shadow-lg"
              >
                {showAll ? "Ver menos" : "Ver mais"}
              </button>
            </div>
          )}
        </div>

        {/* MODAIS */}
        <ModalSmall isOpen={isSaldoOpen} onClose={() => setIsSaldoOpen(false)} title="Carteira de Trabalho">
          <div className="text-center py-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Saldo Atual para Serviços</p>
            <h2 className="text-4xl font-black text-red-900 tracking-tight text-center">
              8.500 <span className="text-lg text-red-700 font-bold">Kz</span>
            </h2>
            <div className="mt-6 p-4 bg-gray-50 rounded-xl text-left border border-gray-100">
              <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                Este valor é utilizado para garantir a aceitação de novos pedidos. Mantenha o saldo acima de 1.000 Kz para continuar a receber alertas.
              </p>
            </div>
            <button 
              onClick={() => {setIsSaldoOpen(false); setIsDadosBancariosOpen(true);}}
              className="mt-6 w-full py-4 bg-red-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all cursor-pointer"
            >
              Adicionar Fundo
            </button>
          </div>
        </ModalSmall>

        <ModalSmall isOpen={isDadosBancariosOpen} onClose={() => setIsDadosBancariosOpen(false)} title="Carregar Carteira">
          <div className="space-y-3 py-2">
            <p className="text-[11px] text-gray-500 font-medium mb-5 text-center leading-relaxed px-2">
              Deposite para os dados abaixo para carregar o seu saldo de trabalho.
            </p>
            <div className="p-4 bg-rose-200/10 rounded-xl border border-rose-200/30">
              <p className="text-[8px] font-bold text-rose-500 uppercase tracking-widest mb-1 text-left">Banco Oficial (Kamba)</p>
              <p className="text-sm font-bold text-red-900 text-left">BFA - Kamba Delivery</p>
            </div>
            <div className="p-4 bg-rose-200/10 rounded-xl border border-rose-200/30">
              <p className="text-[8px] font-bold text-rose-500 uppercase tracking-widest mb-1 text-left">IBAN para Transferência</p>
              <p className="text-xs font-bold text-red-900 tracking-tighter text-left break-all">AO06 0006 0000 1234 5678 9012 3</p>
            </div>
            <button className="mt-4 w-full py-4 bg-red-700 text-white rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-red-100 active:scale-95 transition-all cursor-pointer">
              Copiar Dados de Pagamento
            </button>
          </div>
        </ModalSmall>
      </EntregadorLayout>
    </>
  );
}
