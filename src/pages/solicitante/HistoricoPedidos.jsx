import { useState, useEffect } from "react";
import SolicitanteLayout from "./components/SolicitanteLayout";
import { getPedidos } from "../../services/pedidosService";
import { formatPrice } from "../../utils/formatPrice";

export default function HistoricoPedidos() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("todos");
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 6;

  useEffect(() => {
    const loadHistorico = async () => {
      try {
        const data = await getPedidos();

        const formatados = data
          // só histórico (entregue ou cancelado)
          .filter((p) => ["ENTREGUE", "CANCELADO"].includes(p.status))
          .map((p) => ({
            id: p.id.slice(0, 8), // manter estilo curto tipo KD-xxxx
            titulo: p.titulo,
            data: new Date(p.criado_em).toLocaleDateString("pt-PT", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
            valor: Number(p.valor_final || p.valor_sugerido),
            status: p.status === "ENTREGUE" ? "concluido" : "cancelado",
            origem: p.origem_endereco,
            destino: p.destino_endereco,
            entregador: p.entregador ? "Motorista atribuído" : "N/A",
          }));

        setHistorico(formatados);
      } catch (err) {
        console.log("Erro ao carregar histórico:", err);
      } finally {
        setLoading(false);
      }
    };

    loadHistorico();
  }, []);

  const statusStyle = {
    concluido: "bg-emerald-50 text-emerald-700 border-emerald-100",
    cancelado: "bg-rose-50 text-rose-700 border-rose-100",
  };

  const filteredHistorico = historico.filter((item) => {
    const matchSearch = item.titulo.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "todos" ? true : 
                      filterType === "concluido" ? item.status === "concluido" : 
                      item.status === "cancelado";
    return matchSearch && matchType;
  });

  const historicoExibido = showAll
    ? filteredHistorico
    : filteredHistorico.slice(0, INITIAL_COUNT);

  return (
    <>
      <title>Histórico | Kamba Delivery</title>
      <SolicitanteLayout title="Histórico">
        <div className="space-y-6">
          
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">Arquivo de Entregas</h2>
              <p className="text-sm text-gray-500 font-medium">Consulte seus gastos e pedidos finalizados</p>
            </div>
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all">
              <i className="fas fa-download"></i> Exportar PDF
            </button>
          </div>

          {/* FILTROS E BUSCA */}
          <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-3 mb-8">
            <div className="relative flex-1 min-w-0">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="search"
                placeholder="Buscar por código ou descrição..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50/50 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-red-700/5 transition-all text-sm font-medium"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["todos", "concluido", "cancelado"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-5 py-3 cursor-pointer rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
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

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <i className="fas fa-spinner animate-spin text-red-700 text-3xl mb-4"></i>
              <p className="text-red-600 text-sm font-semibold">Carregando pedidos...</p>
            </div>
          )}

          {/*LISTA DE HISTÓRICO */}
          <div className="flex flex-col space-y-4">
            {filteredHistorico.length > 0 ? (
              historicoExibido.map((item) => (
                <div key={item.id} className="w-full bg-white border border-gray-100 rounded-2xl p-5 hover:border-red-100 transition-all shadow-sm">
                  <div className="flex flex-wrap justify-between items-start gap-4 w-full">
                    
                    {/* INFO PRINCIPAL */}
                    <div className="flex gap-4 min-w-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${statusStyle[item.status]}`}>
                        <i className={`fas ${item.status === 'concluido' ? 'fa-check-double' : 'fa-ban'}`}></i>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.id}</span>
                          <span className="text-[10px] text-gray-300">•</span>
                          <span className="text-xs font-bold text-gray-500">{item.data}</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg leading-tight mb-2 wrap-break-word">{item.titulo}</h3>
                        
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 wrap-break-word">
                              <i className="fas fa-circle text-[6px] text-gray-300"></i>
                              <span className="font-bold">De:</span> {item.origem}
                          </div>
                          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 wrap-break-word">
                              <i className="fas fa-circle text-[6px] text-red-400"></i>
                              <span className="font-bold">Para:</span> {item.destino}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* VALOR E STATUS */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800">{formatPrice(item.valor)}</p>
                      <span className={`inline-block mt-1 text-[10px] font-bold px-3 py-1 rounded-full border uppercase ${statusStyle[item.status]}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* AÇÕES DE HISTÓRICO */}
                  <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Entregador:</span>
                      <span className="text-xs font-bold text-gray-700 wrap-break-word">{item.entregador}</span>
                    </div>
                    
                    <div className="flex gap-2 flex-wrap">
                      {item.status === "concluido" && (
                        <button className="px-4 py-2 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-lg hover:bg-amber-100 transition-all uppercase tracking-tighter border border-amber-100">
                          <i className="fas fa-star mr-1"></i> Avaliar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                <i className="fas fa-box-open text-4xl text-gray-200 mb-4"></i>
                <p className="text-gray-400 font-bold">Nenhum pedido encontrado no histórico.</p>
              </div>
            )}
          </div>

          {filteredHistorico.length > INITIAL_COUNT && (
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
      </SolicitanteLayout>
    </>
  );
}
