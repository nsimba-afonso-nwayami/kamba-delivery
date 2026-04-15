import { useState } from "react";
import SolicitanteLayout from "./components/SolicitanteLayout";

export default function HistoricoPedidos() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("todos");

  const historico = [
    {
      id: "KD-9821",
      titulo: "Entrega de Peças Automotivas",
      data: "12 de Março, 2026",
      valor: "4.500 Kz",
      status: "concluido",
      origem: "Viana, Estalagem",
      destino: "Kilamba, Quarteirão A",
      entregador: "Mateus Silva"
    },
    {
      id: "KD-9750",
      titulo: "Documentos Jurídicos",
      data: "10 de Março, 2026",
      valor: "2.800 Kz",
      status: "cancelado",
      origem: "Ingombotas, Rua Rainha Ginga",
      destino: "Talatona, Via AL15",
      entregador: "N/A"
    },
    {
      id: "KD-9612",
      titulo: "Compras de Supermercado",
      data: "05 de Março, 2026",
      valor: "3.200 Kz",
      status: "concluido",
      origem: "Maianga, Hipermercado",
      destino: "Samba, Condomínio Girassol",
      entregador: "António Manuel"
    }
  ];

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
                type="text"
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
                  className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
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

          {/* TABELA / LISTA DE HISTÓRICO */}
          <div className="flex flex-col space-y-4">
            {filteredHistorico.length > 0 ? (
              filteredHistorico.map((item) => (
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
                      <p className="text-lg font-bold text-gray-800">{item.valor}</p>
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
                      <button className="px-4 py-2 bg-gray-900 text-white text-[10px] font-bold rounded-lg hover:bg-red-700 transition-all uppercase tracking-tighter shadow-sm">
                        Reencomendar
                      </button>
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
        </div>
      </SolicitanteLayout>
    </>
  );
}
