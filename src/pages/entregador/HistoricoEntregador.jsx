import { useState, useEffect } from "react";
import EntregadorLayout from "./components/EntregadorLayout";
import { getHistoricoEntregador } from "../../services/pedidosService";
import { getUsuarioById } from "../../services/usuariosService";
import { useAuth } from "../../contexts/AuthContext";
import { formatPrice } from "../../utils/formatPrice";

export default function HistoricoEntregador() {
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("todos");
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_COUNT = 6;

  // GANHOS DINÂMICOS (como estava antes)
  const [ganhos, setGanhos] = useState({
    diario: 0,
    semanal: 0,
    mensal: 0,
  });

  useEffect(() => {
    const loadHistorico = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);

        const data = await getHistoricoEntregador(user.id);
        console.log("Dados API:", data);

        const hoje = new Date();

        const formatados = await Promise.all(
          data.map(async (p) => {
            let solicitanteNome = "Solicitante";

            // buscar nome real pelo ID do solicitante
            if (p.solicitante) {
              try {
                const usuario = await getUsuarioById(p.solicitante);
                solicitanteNome = usuario?.nome || "Solicitante";
              } catch (err) {
                console.log("Erro ao buscar solicitante:", err);
              }
            }

            return {
              id: String(p.id).slice(0, 8),
              titulo: p.titulo,
              data: new Date(p.criado_em).toLocaleDateString("pt-PT", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }),
              valor: Number(p.valor_final || p.valor_sugerido || 0),
              status: p.status === "ENTREGUE" ? "concluido" : "cancelado",
              origem: p.origem_endereco,
              destino: p.destino_endereco,
              solicitante: solicitanteNome,
              criado_em: p.criado_em,
            };
          })
        );

        setHistorico(formatados);

        // CÁLCULO DOS GANHOS (igual ao anterior)
        const diario = formatados
          .filter((p) => {
            const dataPedido = new Date(p.criado_em);

            return (
              dataPedido.toDateString() === hoje.toDateString() &&
              p.status === "concluido"
            );
          })
          .reduce((acc, p) => acc + p.valor, 0);

        const semanal = formatados
          .filter((p) => {
            const dataPedido = new Date(p.criado_em);

            const diffDias =
              (hoje - dataPedido) / (1000 * 60 * 60 * 24);

            return diffDias <= 7 && p.status === "concluido";
          })
          .reduce((acc, p) => acc + p.valor, 0);

        const mensal = formatados
          .filter((p) => {
            const dataPedido = new Date(p.criado_em);

            return (
              dataPedido.getMonth() === hoje.getMonth() &&
              dataPedido.getFullYear() === hoje.getFullYear() &&
              p.status === "concluido"
            );
          })
          .reduce((acc, p) => acc + p.valor, 0);

        setGanhos({
          diario,
          semanal,
          mensal,
        });
      } catch (err) {
        console.log("Erro ao carregar histórico:", err);
      } finally {
        setLoading(false);
      }
    };

    loadHistorico();
  }, [user?.id]);

  

  const statusStyle = {
    concluido:
      "bg-emerald-50 text-emerald-700 border-emerald-100",
    cancelado:
      "bg-rose-50 text-rose-700 border-rose-100",
  };

  const filteredHistorico = historico.filter((item) => {
    const matchSearch =
      item.titulo.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());

    const matchType =
      filterType === "todos"
        ? true
        : filterType === "concluido"
        ? item.status === "concluido"
        : item.status === "cancelado";

    return matchSearch && matchType;
  });

  const historicoExibido = showAll
    ? filteredHistorico
    : filteredHistorico.slice(0, INITIAL_COUNT);

  return (
    <>
      <title>Histórico | Kamba Delivery</title>

      <EntregadorLayout title="Histórico">
        <div className="space-y-6">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
                Histórico de Entregas
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                Consulte suas corridas e ganhos
              </p>
            </div>

            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all">
              <i className="fas fa-download"></i> Exportar PDF
            </button>
          </div>

          {/* GANHOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs text-gray-400">Hoje</p>
              <p className="text-xl font-bold text-red-700 mt-1">
                {formatPrice(ganhos.diario)}
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs text-gray-400">Esta semana</p>
              <p className="text-xl font-bold text-red-700 mt-1">
                {formatPrice(ganhos.semanal)}
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs text-gray-400">Este mês</p>
              <p className="text-xl font-bold text-red-700 mt-1">
                {formatPrice(ganhos.mensal)}
              </p>
            </div>

          </div>

          {/* FILTROS */}
          <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-3 mb-8">

            <div className="relative flex-1">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                placeholder="Buscar por código ou descrição..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50/50 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-red-700/5 text-sm"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {["todos", "concluido", "cancelado"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-5 py-3 cursor-pointer rounded-xl text-xs font-bold uppercase transition-all ${
                    filterType === type
                      ? "bg-red-700 text-white shadow-md shadow-red-200"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {type === "todos" ? "Todos" : type}
                </button>
              ))}
            </div>

          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center py-20">
              <i className="fas fa-spinner animate-spin text-3xl text-red-700 mb-4"></i>
              <p className="text-sm font-semibold text-gray-500">
                Carregando histórico...
              </p>
            </div>
          )}

          {/* LISTA */}
          {!loading && (
            <div className="flex flex-col space-y-4">
              {filteredHistorico.length > 0 ? (
                historicoExibido.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-red-100 transition-all"
                  >
                    <div className="flex justify-between gap-4 flex-wrap">

                      {/* INFO */}
                      <div className="flex gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${statusStyle[item.status]}`}
                        >
                          <i
                            className={`fas ${
                              item.status === "concluido"
                                ? "fa-check-double"
                                : "fa-ban"
                            }`}
                          ></i>
                        </div>

                        <div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase">
                            {item.id}
                          </span>

                          <h3 className="font-bold text-gray-800">
                            {item.titulo}
                          </h3>

                          <p className="text-xs text-gray-500 mt-1">
                            {item.origem} → {item.destino}
                          </p>

                          <p className="text-xs text-gray-400">
                            {item.data}
                          </p>
                        </div>
                      </div>

                      {/* VALOR */}
                      <div className="text-right">
                        <p className="font-bold text-gray-800">
                          {formatPrice(item.valor)}
                        </p>

                        <span
                          className={`text-[10px] font-bold px-3 py-1 rounded-full border ${statusStyle[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>

                    {/* FOOTER */}
                    <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center flex-wrap gap-3">
                      <div className="text-xs text-gray-500">
                        Solicitante:{" "}
                        <span className="font-bold text-gray-700">
                          {item.solicitante}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                  <i className="fas fa-box-open text-4xl text-gray-200 mb-4"></i>
                  <p className="text-gray-400 font-bold">
                    Nenhuma entrega encontrada.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* VER MAIS / VER MENOS */}
          {!loading && filteredHistorico.length > INITIAL_COUNT && (
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
      </EntregadorLayout>
    </>
  );
}