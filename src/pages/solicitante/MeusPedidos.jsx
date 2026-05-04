import { useState, useEffect } from "react";
import SolicitanteLayout from "./components/SolicitanteLayout";
import Modal from "./components/Modal";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getPedidos, cancelarPedido } from "../../services/pedidosService";
import { getUsuarioById } from "../../services/usuariosService";
import { getUltimaPosicaoEntregador } from "../../services/rastreamentoService";
import { formatPrice } from "../../utils/formatPrice";
import toast from "react-hot-toast";

export default function MeusPedidos() {
  // ESTADO DA PÁGINA
  const [pedidos, setPedidos] = useState([]);          // lista de pedidos da API
  const [loading, setLoading] = useState(true);        // loading inicial
  const [showAll, setShowAll] = useState(false);       // controlar "ver mais"
  const INITIAL_COUNT = 6;                              // limite inicial da lista
  const [search, setSearch] = useState("");            // busca
  const [statusFilter, setStatusFilter] = useState("todos"); // filtro status
  const [selectedPedido, setSelectedPedido] = useState(null); // pedido aberto no modal
  const [posicaoEntregador, setPosicaoEntregador] = useState(null);         // progresso da entrega (mapa)
  const [routeInfo, setRouteInfo] = useState(null);     // info da rota (OSRM)
  const [rotaCaminho, setRotaCaminho] = useState([]);

  useEffect(() => {
    const loadRoute = async () => {
      if (!selectedPedido) return;

      const origem = [
        selectedPedido.origem_latitude,
        selectedPedido.origem_longitude,
      ];

      const destino = [
        selectedPedido.destino_latitude,
        selectedPedido.destino_longitude,
      ];

      const info = await calcularRotaOSRM(origem, destino);

      setRouteInfo(info);
    };

    loadRoute();
  }, [selectedPedido]);


  // AJUDA DO MAPA (LEAFLET)

  // Corrige bug de renderização do mapa no modal
  function FixMapSize() {
    const map = useMap();

    useEffect(() => {
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    }, [map]);

    return null;
  }


  // Ajusta zoom automático entre origem e destino
  function FitBounds({ origem, destino }) {
    const map = useMap();

    useEffect(() => {
      if (!origem || !destino) return;

      const bounds = [origem, destino];

      setTimeout(() => {
        map.fitBounds(bounds, {
          padding: [60, 60],
          maxZoom: 15,
        });
      }, 200);
    }, [origem, destino, map]);

    return null;
  }

  // CARREGAR PEDIDOS
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const data = await getPedidos();
        console.log("Pedidos recebidos da API:", data);

        // ENRIQUECER pedidos com dados do entregador
        const pedidosComEntregador = await Promise.all(
          data.map(async (pedido) => {

            // se API só manda ID do entregador
            if (pedido.entregador && typeof pedido.entregador === "number") {
              try {
                const usuario = await getUsuarioById(pedido.entregador);

                return {
                  ...pedido,
                  entregadorData: usuario, // aqui fica o objeto completo
                };
              } catch {
                return pedido; // fallback se falhar API
              }
            }

            return pedido;
          })
        );

        setPedidos(pedidosComEntregador);

      } catch (err) {
        console.log("Erro ao buscar pedidos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  const calcularRotaReal = async (lat1, lon1, lat2, lon2) => {
    try {
      const resp = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=full&geometries=geojson`
      );

      const data = await resp.json();

      if (data.routes?.length > 0) {
        const coordinates = data.routes[0].geometry.coordinates.map(
          (p) => [p[1], p[0]]
        );

        setRotaCaminho(coordinates);
      }
    } catch (err) {
      console.log("Erro ao calcular rota real:", err);
    }
  };

  // NORMALIZA STATUS
  const mapStatus = (status) => {
    switch (status) {
      case "AGUARDANDO_PROPOSTAS":
        return "pendente";
      case "PROPOSTA_ACEITA":
        return "aceita";
      case "EM_ROTA":
        return "em_rota";
      case "ENTREGUE":
        return "entregue";
      case "CANCELADO":
        return "cancelado";
      default:
        return "pendente";
    }
  };

  // CONFIG VISUAL DOS STATUS
  const statusConfig = {
    pendente: {
      label: "Pendente",
      icon: "fa-clock",
      style: "bg-yellow-100 text-yellow-700 border-yellow-200",
    },
    aceita: {
      label: "Aceita",
      icon: "fa-handshake",
      style: "bg-purple-100 text-purple-700 border-purple-200",
    },
    em_rota: {
      label: "Em rota",
      icon: "fa-truck",
      style: "bg-blue-100 text-blue-700 border-blue-200",
    },
    entregue: {
      label: "Entregue",
      icon: "fa-check",
      style: "bg-green-100 text-green-700 border-green-200",
    },
    cancelado: {
      label: "Cancelado",
      icon: "fa-circle-xmark",
      style: "bg-red-100 text-red-700 border-red-200",
    },
  };

  // FILTRAR PEDIDOS
  const filteredPedidos = pedidos.filter((p) => {
    const uiStatus = mapStatus(p.status);

    // remove cancelados desta página (vão para histórico)
    if (uiStatus === "cancelado") return false;

    // busca por texto
    const matchSearch =
      p.titulo?.toLowerCase().includes(search.toLowerCase()) ||
      p.id?.toLowerCase().includes(search.toLowerCase());

    // filtro de status
    const matchStatus =
      statusFilter === "todos" ? true : uiStatus === statusFilter;

    return matchSearch && matchStatus;
  });

  // CALCULAR ROTA (OSRM)
  const calcularRotaOSRM = async (origem, destino) => {
    if (!origem || !destino) return null;

    try {
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/` +
        `${origem[1]},${origem[0]};${destino[1]},${destino[0]}?overview=false`
      );

      const data = await res.json();

      if (!data.routes || data.routes.length === 0) return null;

      const route = data.routes[0];

      return {
        distanciaKm: route.distance / 1000,
        tempoMin: Math.round(route.duration / 60),
      };

    } catch (err) {
      console.log("Erro OSRM:", err);
      return null;
    }
  };

  useEffect(() => {
    if (
      selectedPedido?.origem_latitude &&
      selectedPedido?.destino_latitude
    ) {
      calcularRotaReal(
        selectedPedido.origem_latitude,
        selectedPedido.origem_longitude,
        selectedPedido.destino_latitude,
        selectedPedido.destino_longitude
      );
    }
  }, [selectedPedido]);

  // FORMATAR TEMPO
  const formatTempo = (min) => {
    if (min < 60) return `${Math.round(min)} min`;

    const h = Math.floor(min / 60);
    const m = Math.round(min % 60);

    return `${h}h ${m}min`;
  };

  // CALCULAR POSIÇÃO DO ENTREGADOR
  useEffect(() => {
  if (!selectedPedido?.id) return;

  const fetchPosicao = async () => {
    const pos = await getUltimaPosicaoEntregador(
        selectedPedido.id
      );

      if (pos) {
        setPosicaoEntregador(pos);
      }
    };

    fetchPosicao();

    const interval = setInterval(fetchPosicao, 5000);

    return () => clearInterval(interval);
  }, [selectedPedido?.id]);

  // VALORES DERIVADOS
  const distanciaKm = routeInfo?.distanciaKm || 0;
  const tempoMin = routeInfo?.tempoMin || 0;

  const precoInicial = selectedPedido
    ? Number(selectedPedido.valor_sugerido || 0)
    : 0;

  const precoFinal = selectedPedido?.valor_final
    ? Number(selectedPedido.valor_final)
    : null;

  // LISTA EXIBIDA
  const pedidosExibidos = showAll
    ? filteredPedidos
    : filteredPedidos.slice(0, INITIAL_COUNT);

  // CANCELAR PEDIDO
  const handleCancelarPedido = async (id) => {
    try {
      await cancelarPedido(id);

      // atualiza UI sem reload
      setPedidos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: "CANCELADO" } : p
        )
      );

      toast.success("Pedido cancelado com sucesso");

    } catch (err) {
      console.log("Erro ao cancelar pedido:", err);

      toast.error(
        err.response?.data?.detail ||
        "Erro ao cancelar pedido"
      );
    }
  };

  return (
    <>
      <title>Meus pedidos | Kamba Delivery</title>
      <SolicitanteLayout title="Meus Pedidos">
        <div className="space-y-6">
          
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
                type="search"
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
              <option value="aceita">Aceites</option>
              <option value="em_rota">Em rota</option>
              <option value="entregue">Entregues</option>
              <option value="cancelado">Cancelados</option>
            </select>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <i className="fas fa-spinner animate-spin text-red-700 text-3xl mb-4"></i>
              <p className="text-red-600 text-sm font-semibold">Carregando pedidos...</p>
            </div>
          )}

          {/* LISTAGEM */}
          {!loading && filteredPedidos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <i className="fas fa-box-open text-4xl mb-4"></i>
              <h3 className="font-bold text-lg text-gray-600">
                Nenhum pedido encontrado
              </h3>
              <p className="text-sm">
                Você ainda não fez nenhum pedido ou não há resultados.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5">
              {pedidosExibidos.map((pedido) => {
                  const uiStatus = mapStatus(pedido.status);
                  const precoTotal = pedido.valor_sugerido;

                  return (
                    <div key={pedido.id} className="bg-white border border-gray-100 rounded-3xl p-6 transition-all hover:shadow-xl hover:shadow-gray-200/40">

                      <div className="flex flex-wrap justify-between items-start gap-4">
                        
                        <div className="flex gap-4 min-w-0">
                          <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-xl ${statusConfig[uiStatus].style}`}>
                            <i className={`fas ${statusConfig[uiStatus].icon}`}></i>
                          </div>

                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block truncate">
                              {pedido.id.slice(0, 8)}
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
                                <span className="text-gray-700 truncate">{pedido.origem_endereco}</span>
                              </div>

                              <div className="flex items-center gap-3 text-xs font-bold text-gray-600 min-w-0">
                                <div className="w-5 h-5 flex items-center justify-center bg-red-50 rounded-full shrink-0">
                                  <i className="fas fa-location-dot text-red-800 text-[10px]"></i>
                                </div>
                                <span className="text-gray-400 uppercase text-[9px] w-12 shrink-0 font-bold">Destino:</span>
                                <span className="text-gray-700 truncate">{pedido.destino_endereco}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="text-xl font-black text-gray-900 tracking-tight whitespace-nowrap">
                            {formatPrice(precoTotal)}
                          </span>

                          <span className={`text-[10px] uppercase font-bold px-4 py-1.5 rounded-full border ${statusConfig[uiStatus].style}`}>
                            {statusConfig[uiStatus].label}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-8 pt-5 border-t border-gray-50 flex flex-wrap justify-between items-center gap-4">
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => setSelectedPedido(pedido)}
                            className="px-6 py-3 cursor-pointer bg-gray-900 text-white text-[11px] font-bold rounded-xl hover:bg-red-700 transition-all uppercase tracking-widest shadow-lg shadow-gray-200"
                          >
                            {uiStatus === "entregue" ? "Ver Detalhes" : "Rastrear Rota"}
                          </button>

                          {pedido.status === "AGUARDANDO_PROPOSTAS" && (
                            <button
                              onClick={() => handleCancelarPedido(pedido.id)}
                              className="px-6 py-3 cursor-pointer bg-white text-rose-600 text-[11px] font-bold rounded-xl hover:bg-rose-50 transition-all uppercase tracking-widest border border-rose-100"
                            >
                              Cancelar
                            </button>
                          )}

                          {uiStatus === "entregue" && (
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
                              <p className="text-xs font-bold text-gray-800 leading-none">{pedido.entregadorData?.nome}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {filteredPedidos.length > INITIAL_COUNT && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="px-6 py-3 cursor-pointer bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-all uppercase tracking-widest shadow-lg"
              >
                {showAll ? "Ver menos pedidos" : "Ver mais pedidos"}
              </button>
            </div>
          )}

          {/* MODAL DETALHADO */}
          <Modal
            isOpen={!!selectedPedido}
            onClose={() => {
              setSelectedPedido(null);
              setRotaCaminho([]);
            }}
            title={`Detalhes da Corrida ${selectedPedido?.titulo}`}
            icon="fas fa-receipt"
          >
            {selectedPedido && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* PREÇO INICIAL */}
                  <div className="bg-gray-900 p-4 rounded-3xl text-white">
                    <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">
                      Preço inicial
                    </p>
                    <p className="text-lg font-black leading-none">
                      {formatPrice(precoInicial)}
                    </p>
                  </div>

                  {/* PREÇO FINAL */}
                  <div className="bg-red-900 p-4 rounded-3xl text-white">
                    <p className="text-[9px] font-bold text-red-200 uppercase tracking-widest mb-1">
                      Preço final
                    </p>

                    <p className="text-lg font-bold leading-none">
                      {precoFinal ? formatPrice(precoFinal) : "A aguardar proposta..."}
                    </p>
                  </div>

                  {/* DISTÂNCIA + TEMPO */}
                  <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Distância & tempo
                    </p>

                    <p className="text-lg font-bold text-gray-800 leading-none">
                      {distanciaKm.toFixed(1)} km
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      ~ {formatTempo(tempoMin)} estimado
                    </p>
                  </div>

                </div>

                {/* MAPA */}
                <div className="w-full h-100 rounded-3xl overflow-hidden border-4 border-white shadow-xl relative z-0">
                  {selectedPedido?.origem_latitude && selectedPedido?.destino_latitude ? (
                    <MapContainer
                      center={[
                        selectedPedido.origem_latitude,
                        selectedPedido.origem_longitude
                      ]}
                      zoom={13}
                      className="h-full w-full"
                    >
                      <FitBounds
                        origem={[
                          selectedPedido.origem_latitude,
                          selectedPedido.origem_longitude
                        ]}
                        destino={[
                          selectedPedido.destino_latitude,
                          selectedPedido.destino_longitude
                        ]}
                      />
                    <FixMapSize />
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker
                      position={[
                        selectedPedido.origem_latitude,
                        selectedPedido.origem_longitude
                      ]}
                    >
                      <Tooltip permanent direction="top" offset={[0, -10]}>
                        Origem: {selectedPedido.origem_endereco}
                      </Tooltip>
                    </Marker>
                    <Marker
                      position={[
                        selectedPedido.destino_latitude,
                        selectedPedido.destino_longitude
                      ]}
                    >
                      <Tooltip permanent direction="top" offset={[0, -10]}>
                        Destino: {selectedPedido.destino_endereco}
                      </Tooltip>
                    </Marker>
                    {posicaoEntregador && (
                      <Marker position={posicaoEntregador}>
                        <Tooltip
                          permanent
                          direction="top"
                          offset={[0, -10]}
                        >
                          Entregador em tempo real
                        </Tooltip>
                      </Marker>
                    )}
                    {rotaCaminho.length > 0 && (
                      <Polyline
                        positions={rotaCaminho}
                        color="red"
                        weight={4}
                        opacity={0.7}
                      />
                    )}
                    </MapContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Sem coordenadas disponíveis
                    </div>
                  )}
                </div>

                {/* PONTOS DE ROTA */}
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-start gap-3">
                    <i className="fas fa-circle-dot text-red-500 mt-1"></i>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Origem da Recolha</p>
                      <p className="text-sm font-bold text-gray-700">{selectedPedido.origem_endereco}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-start gap-3">
                    <i className="fas fa-location-dot text-red-800 mt-1"></i>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Destino da Entrega</p>
                      <p className="text-sm font-bold text-gray-700">{selectedPedido.destino_endereco}</p>
                    </div>
                  </div>
                </div>

                {/* MOTORISTA */}
                {selectedPedido.entregador && (
                  <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden p-5 flex flex-col sm:flex-row items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <img src={selectedPedido.entregador.foto} className="w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-white" />
                      <div>
                        <h4 className="font-bold text-gray-800">{selectedPedido?.entregadorData?.nome}</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Motorista Verificado</p>
                        <p className="text-xs font-bold text-gray-600 mt-1">{selectedPedido?.entregadorData?.telefone}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <a href={`tel:${selectedPedido?.entregadorData?.telefone}`} className="flex-1 sm:flex-none h-12 px-5 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all active:scale-95 border border-gray-200">
                        <i className="fas fa-phone"></i>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Ligar</span>
                      </a>
                      <a href={`https://wa.me/${selectedPedido?.entregadorData?.telefone}`} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none h-12 px-5 flex items-center justify-center gap-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all active:scale-95 border border-green-100">
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
