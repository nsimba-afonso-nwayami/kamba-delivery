import { useState, useEffect } from "react";
import SolicitanteLayout from "./components/SolicitanteLayout";
import Modal from "./components/Modal";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MeusPedidos() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [progress, setProgress] = useState(0);

  // --- LÓGICA DE CÁLCULO DE CORRIDA ---
  
  const calcularDistancia = (coords1, coords2) => {
    const [lat1, lon1] = coords1;
    const [lat2, lon2] = coords2;
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calcularPreco = (distancia) => {
    const base = 500;
    const taxaKm = 200;
    const total = base + (distancia * taxaKm);
    return total.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' }).replace('AOA', 'Kz');
  };

  // --- EFEITOS E AUXILIARES ---

  useEffect(() => {
    if (!selectedPedido || selectedPedido.status !== "em_rota") {
      setProgress(0);
      return;
    }
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 2));
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedPedido]);

  const getDriverPosition = (pedido) => {
    if (!pedido) return null;
    const [lat1, lng1] = pedido.origemCoords;
    const [lat2, lng2] = pedido.destinoCoords;
    return [
      lat1 + (lat2 - lat1) * (progress / 100),
      lng1 + (lng2 - lng1) * (progress / 100),
    ];
  };

  const pedidos = [
    {
      id: "KD-1092",
      titulo: "Entrega de documentos",
      origem: "Talatona, Via AL15",
      destino: "Ingombotas, Rua Rainha Ginga",
      status: "pendente",
      data: "Hoje, 14:20",
      origemCoords: [-8.9176, 13.1964],
      destinoCoords: [-8.8159, 13.2302],
      entregador: null,
    },
    {
      id: "KD-1088",
      titulo: "Entrega de comida",
      origem: "Maianga, Av. Portugal",
      destino: "Rangel, Rua da Indonésia",
      status: "em_rota",
      data: "Hoje, 12:10",
      origemCoords: [-8.8345, 13.2340],
      destinoCoords: [-8.8150, 13.2590],
      entregador: {
        nome: "Carlos Miguel",
        telefone: "+244 923 333 444",
        whatsapp: "244923333444",
        foto: "https://i.pravatar.cc/150?u=carlos",
      },
    },
    {
      id: "KD-1050",
      titulo: "Pacote de Roupas",
      origem: "Viana, Estalagem",
      destino: "Belas, Centralidade do Kilamba",
      status: "entregue",
      data: "Ontem, 09:30",
      origemCoords: [-8.9375, 13.2813],
      destinoCoords: [-8.9140, 13.3100],
      entregador: {
        nome: "José António",
        telefone: "+244 912 555 666",
        whatsapp: "244912555666",
        foto: "https://i.pravatar.cc/150?u=jose",
      },
    },
  ];

  const statusConfig = {
    pendente: { label: "Pendente", style: "bg-amber-50 text-amber-700 border-amber-100", icon: "fa-clock" },
    em_rota: { label: "Em rota", style: "bg-blue-50 text-blue-700 border-blue-100", icon: "fa-motorcycle" },
    entregue: { label: "Entregue", style: "bg-emerald-50 text-emerald-700 border-emerald-100", icon: "fa-check-circle" },
    cancelado: { label: "Cancelado", style: "bg-gray-50 text-gray-500 border-gray-100", icon: "fa-times" },
  };

  const filteredPedidos = pedidos.filter((p) => {
    const matchSearch = p.titulo.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "todos" ? true : p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <>
      <title>Meus pedidos | Kamba Delivery</title>
      <SolicitanteLayout title="Meus Pedidos">
        <div className="max-w-5xl mx-auto pb-24 overflow-x-hidden px-3 sm:px-0">
          
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Suas Entregas</h2>
              <p className="text-sm text-gray-500 font-medium">Histórico detalhado e rastreio em tempo real</p>
            </div>
            <div className="bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm text-xs font-bold text-red-900 uppercase tracking-widest">
              {filteredPedidos.length} Pedidos Encontrados
            </div>
          </div>

          {/* FILTROS */}
          <div className="bg-white p-3 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-3 mb-8">
            <div className="relative flex-1 min-w-0">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por ID ou título..."
                className="w-full pl-11 pr-4 py-3 bg-gray-50/50 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-red-700/5 transition-all text-sm font-medium"
              />
            </div>

            {/* SELECT RESPONSIVO */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-auto px-6 py-3 bg-gray-50/50 rounded-2xl outline-none text-sm font-bold text-gray-600 border-none cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <option value="todos">Todos os status</option>
              <option value="pendente">Pendentes</option>
              <option value="em_rota">Em rota</option>
              <option value="entregue">Entregues</option>
              <option value="cancelado">Cancelados</option>
            </select>
          </div>

          {/* LISTAGEM */}
          <div className="grid grid-cols-1 gap-5">
            {filteredPedidos.map((pedido) => {
              const distancia = calcularDistancia(pedido.origemCoords, pedido.destinoCoords);
              const precoTotal = calcularPreco(distancia);

              return (
                <div key={pedido.id} className="bg-white border border-gray-100 rounded-3xl p-6 transition-all hover:shadow-xl hover:shadow-gray-200/40">

                  <div className="flex flex-wrap justify-between items-start gap-4">
                    
                    <div className="flex gap-4 min-w-0">
                      <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-xl ${statusConfig[pedido.status].style.split(' ')[0]} ${statusConfig[pedido.status].style.split(' ')[1]}`}>
                        <i className={`fas ${statusConfig[pedido.status].icon}`}></i>
                      </div>

                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block truncate">
                          {pedido.id} • {distancia.toFixed(1)} km
                        </span>

                        <h3 className="font-bold text-gray-800 text-lg leading-tight mb-3 truncate">
                          {pedido.titulo}
                        </h3>

                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-xs font-bold text-gray-600 min-w-0">
                            <div className="w-5 h-5 flex items-center justify-center bg-red-50 rounded-full shrink-0">
                              <i className="fas fa-circle-dot text-red-500 text-[8px]"></i>
                            </div>
                            <span className="text-gray-400 uppercase text-[9px] w-12 shrink-0 font-bold">Origem:</span>
                            <span className="text-gray-700 truncate">{pedido.origem}</span>
                          </div>

                          <div className="flex items-center gap-3 text-xs font-bold text-gray-600 min-w-0">
                            <div className="w-5 h-5 flex items-center justify-center bg-red-50 rounded-full shrink-0">
                              <i className="fas fa-location-dot text-red-800 text-[10px]"></i>
                            </div>
                            <span className="text-gray-400 uppercase text-[9px] w-12 shrink-0 font-bold">Destino:</span>
                            <span className="text-gray-700 truncate">{pedido.destino}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-xl font-black text-gray-900 tracking-tight whitespace-nowrap">
                        {precoTotal}
                      </span>
                      <span className={`text-[10px] uppercase font-bold px-4 py-1.5 rounded-full border ${statusConfig[pedido.status].style}`}>
                        {statusConfig[pedido.status].label}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-5 border-t border-gray-50 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setSelectedPedido(pedido)}
                        className="px-6 py-3 cursor-pointer bg-gray-900 text-white text-[11px] font-bold rounded-xl hover:bg-red-700 transition-all uppercase tracking-widest shadow-lg shadow-gray-200"
                      >
                        {pedido.status === "entregue" ? "Ver Detalhes" : "Rastrear Rota"}
                      </button>

                      {(pedido.status === "pendente" || pedido.status === "em_rota") && (
                        <button className="px-6 py-3 cursor-pointer bg-white text-rose-600 text-[11px] font-bold rounded-xl hover:bg-rose-50 transition-all uppercase tracking-widest border border-rose-100">
                          Cancelar
                        </button>
                      )}

                      {pedido.status === "entregue" && (
                        <button className="px-6 py-3 bg-amber-100 text-amber-700 text-[11px] font-bold rounded-xl hover:bg-amber-200 transition-all uppercase tracking-widest border border-amber-200">
                          <i className="fas fa-star mr-1"></i> Avaliar
                        </button>
                      )}
                    </div>

                    {pedido.entregador && (
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
                        <img src={pedido.entregador.foto} className="w-8 h-8 rounded-xl object-cover" />
                        <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase leading-none mb-1">Entregador</p>
                          <p className="text-xs font-bold text-gray-800 leading-none">{pedido.entregador.nome}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* MODAL DETALHADO */}
          <Modal
            isOpen={!!selectedPedido}
            onClose={() => setSelectedPedido(null)}
            title={`Detalhes da Corrida ${selectedPedido?.id}`}
            icon="fas fa-receipt"
          >
            {selectedPedido && (
              <div className="space-y-6">
                {/* RESUMO DE VALORES RESPONSIVO */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-red-900 p-4 rounded-3xl text-white">
                    <p className="text-[9px] font-bold text-red-200 uppercase tracking-widest mb-1">Total</p>
                    <p className="text-lg font-black leading-none">
                      {calcularPreco(calcularDistancia(selectedPedido.origemCoords, selectedPedido.destinoCoords))}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100 text-center">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Distância</p>
                    <p className="text-lg font-bold text-gray-800 leading-none">
                      {calcularDistancia(selectedPedido.origemCoords, selectedPedido.destinoCoords).toFixed(1)} km
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100 text-right sm:text-right">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Previsão</p>
                    <p className="text-lg font-bold text-gray-800 leading-none">
                      {selectedPedido.status === "entregue" ? "Finalizado" : `~${Math.max(1, 30 - Math.floor(progress / 3.3))}m`}
                    </p>
                  </div>
                </div>

                {/* MAPA */}
                <div className="w-full h-64 rounded-3xl overflow-hidden border-4 border-white shadow-xl relative z-0">
                  <MapContainer center={selectedPedido.origemCoords} zoom={13} className="h-full w-full">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={selectedPedido.origemCoords}><Popup>Origem</Popup></Marker>
                    <Marker position={selectedPedido.destinoCoords}><Popup>Destino</Popup></Marker>
                    {selectedPedido.status === "em_rota" && (
                      <Marker position={getDriverPosition(selectedPedido)}>
                        <Popup>Motorista</Popup>
                      </Marker>
                    )}
                    <Polyline positions={[selectedPedido.origemCoords, selectedPedido.destinoCoords]} color="#b91c1c" weight={4} dashArray="10, 10" opacity={0.5} />
                  </MapContainer>
                </div>

                {/* PONTOS DE ROTA */}
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-start gap-3">
                    <i className="fas fa-circle-dot text-red-500 mt-1"></i>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Origem da Recolha</p>
                      <p className="text-sm font-bold text-gray-700">{selectedPedido.origem}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-start gap-3">
                    <i className="fas fa-location-dot text-red-800 mt-1"></i>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Destino da Entrega</p>
                      <p className="text-sm font-bold text-gray-700">{selectedPedido.destino}</p>
                    </div>
                  </div>
                </div>

                {/* MOTORISTA */}
                {selectedPedido.entregador && (
                  <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden p-5 flex flex-col sm:flex-row items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <img src={selectedPedido.entregador.foto} className="w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-white" />
                      <div>
                        <h4 className="font-bold text-gray-800">{selectedPedido.entregador.nome}</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Motorista Verificado</p>
                        <p className="text-xs font-bold text-gray-600 mt-1">{selectedPedido.entregador.telefone}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <a href={`tel:${selectedPedido.entregador.telefone}`} className="flex-1 sm:flex-none h-12 px-5 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all active:scale-95 border border-gray-200">
                        <i className="fas fa-phone"></i>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Ligar</span>
                      </a>
                      <a href={`https://wa.me/${selectedPedido.entregador.whatsapp}`} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none h-12 px-5 flex items-center justify-center gap-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all active:scale-95 border border-green-100">
                        <i className="fab fa-whatsapp text-lg"></i>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Zap</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Modal>
        </div>
      </SolicitanteLayout>
    </>
  );
}
