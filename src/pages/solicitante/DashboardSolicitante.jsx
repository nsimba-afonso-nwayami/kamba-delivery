import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SolicitanteLayout from "./components/SolicitanteLayout";
import Modal from "./components/Modal";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import toast from "react-hot-toast";
import { createPedido } from "../../services/pedidosService";
import { createNotificacao } from "../../services/notificacoesService";
import { getUsuarios } from "../../services/usuariosService";
import { formatPrice } from "../../utils/formatPrice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { pedidoSchema } from "../../validations/pedidoSchema";
import { useAuth } from "../../contexts/AuthContext";

export default function DashboardSolicitante() {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false); //loading de envio do pedido
  const [loadingRoute, setLoadingRoute] = useState(false); //loading de recalcular rota
  const navigate = useNavigate();

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);

  const [route, setRoute] = useState([]);

  // sugestões
  const [pickupSug, setPickupSug] = useState([]);
  const [dropoffSug, setDropoffSug] = useState([]);

  const [isUsingMyLocation, setIsUsingMyLocation] = useState(true);

  const [distanceKm, setDistanceKm] = useState(0);
  const [etaMin, setEtaMin] = useState(0);
  const [price, setPrice] = useState(0);

  const inputStyle = "w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-xl focus:border-red-700 focus:ring-2 focus:ring-red-700/5 outline-none transition-all bg-gray-50/50 text-sm font-medium";
  const labelStyle = "text-xs font-black text-red-900 uppercase tracking-wider ml-1";

  const getMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocalização não suportada");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];

        const address = await getAddressFromCoords(
          pos.coords.latitude,
          pos.coords.longitude
        );

        setPickupCoords(coords);
        setPickup(address); //AGORA vem o nome real
        setIsUsingMyLocation(true);

        toast.success("Localização obtida com sucesso");
      },
      (err) => {
        console.log(err);
        toast.error("Não foi possível obter a localização");
      }
    );
  };

  const getAddressFromCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );

      const data = await res.json();

      return data.display_name || "Minha localização";
    } catch (err) {
      return "Minha localização";
    }
  };

  const searchAddress = async (text, setSug) => {
    if (!text) return setSug([]);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${text}&countrycodes=ao&addressdetails=1&limit=5`
    );

    const data = await res.json();
    setSug(data.slice(0, 5));
  };

  useEffect(() => {
    getMyLocation();
  }, []);

  const getRoute = async (start, end) => {
    try {
      setLoadingRoute(true);

      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
      );

      const data = await res.json();

      if (!data.routes || data.routes.length === 0) return;

      const routeData = data.routes[0];

      const coords = routeData.geometry.coordinates.map(([lng, lat]) => [lat, lng]);

      setRoute(coords);

      setDistanceKm(routeData.distance / 1000);
      setEtaMin(routeData.duration / 60);

      const base = 500;
      const perKm = 300;
      setPrice(Math.round(base + (routeData.distance / 1000) * perKm));

    } catch (err) {
      console.log("Erro rota:", err);
    } finally {
      setLoadingRoute(false);
    }
  };

  useEffect(() => {
    if (!pickupCoords || !dropoffCoords) return;

    const isSame =
      pickupCoords[0] === dropoffCoords[0] &&
      pickupCoords[1] === dropoffCoords[1];

    if (isSame) return;

    getRoute(pickupCoords, dropoffCoords);
  }, [pickupCoords, dropoffCoords]);

  function FitRoute({ route }) {
    const map = useMap();

    useEffect(() => {
      if (!route || route.length < 2) return;

      map.fitBounds(route, {
        padding: [60, 60],
        maxZoom: 15,
      });
    }, [route]);

    return null;
  }

  //Envio do formulário
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(pedidoSchema),
  });

  const onSubmit = async (data) => {
    if (!pickupCoords || !dropoffCoords || route.length < 2) {
      toast.error("Defina origem e destino para gerar rota");
      return;
    }

    setLoading(true);

    const payload = {
      titulo: data.titulo,
      descricao: data.descricao,
      tipo_item: "",
      peso_kg: data.peso_kg ? Number(data.peso_kg) : null,
      tamanho: "",
      urgencia: data.urgencia || null,

      origem_endereco: data.origem,
      origem_latitude: pickupCoords?.[0],
      origem_longitude: pickupCoords?.[1],

      destino_endereco: data.destino,
      destino_latitude: dropoffCoords?.[0],
      destino_longitude: dropoffCoords?.[1],

      valor_sugerido: price ? Number(price) : null,

      solicitante: user?.id,
    };

    console.log("PAYLOAD FINAL:", payload);

    try {
      await createPedido(payload);

      toast.success("Pedido criado com sucesso!");

      // Notificação para o solicitante
      await createNotificacao({
        titulo: "Pedido criado",
        mensagem: `Seu pedido "${data.titulo}" foi criado com sucesso!`,
        usuario: user?.id,
      });

      // Notificação para todos os entregadores
      try {
        const usuarios = await getUsuarios();

        const entregadores = usuarios.filter(
          (u) => u.tipo === "ENTREGADOR"
        );

        await Promise.all(
          entregadores.map((entregador) =>
            createNotificacao({
              titulo: "Novo pedido disponível",
              mensagem: `Novo pedido: "${data.titulo}". Veja na lista de entregas.`,
              usuario: entregador.id,
            })
          )
        );
      } catch (err) {
        console.error("Erro ao notificar entregadores:", err);
      }

      reset(); // limpa form
      setPickup("");
      setDropoff("");
      setPickupCoords(null);
      setDropoffCoords(null);
      setRoute([]);
      setPrice(0);
      setDistanceKm(0);
      setEtaMin(0);

      setOpenModal(false);

      setTimeout(() => {
        navigate("/dashboard/solicitante/pedidos");
      }, 800);
    } catch (err) {
      console.log(err.response?.data);
      toast.error("Erro ao criar pedido");
    }
  };

  return (
    <>
      <title>Dashboard | Kamba Delivery</title>

      <SolicitanteLayout title="Início">
        
        {/* MAPA PRINCIPAL */}
        <section className="relative space-y-4 pb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                Entregadores próximos
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                Monitorando atividade em tempo real em Luanda
              </p>
            </div>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold border border-green-100">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              12 Disponíveis
            </div>
          </div>

          <div className="w-full h-125 rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-gray-200/50 relative">
            {pickupCoords && (
              <MapContainer
                center={pickupCoords}
                zoom={13}
                className="h-full w-full z-0"
                zoomControl={false}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={pickupCoords}>
                  <Tooltip
                    permanent
                    direction="top"
                    offset={[0, -10]}
                    opacity={1}
                  >
                    Sua localização atual
                  </Tooltip>
                </Marker>
              </MapContainer>
            )}
          </div>
        </section>

        {/* BARRA DE AÇÃO FIXA */}
        <div className="fixed bottom-0 left-0 md:left-64 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-gray-100 z-40 flex justify-center">
          <div className="max-w-4xl w-full">
            <button
              onClick={() => setOpenModal(true)}
              className="group cursor-pointer w-full py-4 bg-red-700 text-white text-lg font-bold rounded-2xl shadow-xl shadow-red-700/30 flex items-center justify-center gap-3 hover:bg-red-800 transition-all active:scale-[0.98]"
            >
              <div className="bg-white/20 p-2 rounded-lg group-hover:rotate-12 transition-transform">
                <i className="fas fa-motorcycle text-xl"></i>
              </div>
              SOLICITAR NOVO PEDIDO
            </button>
          </div>
        </div>

        {/* MODAL NOVO PEDIDO */}
        <Modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title="Novo Pedido"
          icon="fas fa-paper-plane"
        >
          <form className="space-y-6 pb-10" onSubmit={handleSubmit(onSubmit)}>

            <button
              type="button"
              onClick={getMyLocation}
              className="w-full cursor-pointer mb-3 py-2 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 transition"
            >
              <i className="fa-solid fa-location-crosshairs mr-2"></i> 
              Usar minha localização
            </button>
            
            {/* LINHA 1: TÍTULO E URGÊNCIA */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className={labelStyle}>O que você quer enviar?</label>
                <input
                  {...register("titulo")}
                  className={inputStyle}
                  placeholder="Ex: Chaves, Almoço, Documentos..."
                />
                {errors.titulo && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.titulo.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelStyle}>Prioridade</label>
                <select  {...register("urgencia")} className={inputStyle}>
                  <option value="NORMAL">Normal (Padrão)</option>
                  <option value="URGENTE">Urgente</option>
                  <option value="EXPRESS">Express</option>
                </select>
                {errors.urgencia && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.urgencia.message}
                  </p>
                )}
              </div>
            </div>

            {/* LINHA 2: PESO E DESCRIÇÃO */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className={labelStyle}>Peso Est.</label>
                <div className="relative">
                  <input
                    {...register("peso_kg")}
                    type="number"
                    className={inputStyle}
                    placeholder="2"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                    KG
                  </span>
                </div>
                {errors.peso_kg && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.peso_kg.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-3">
                <label className={labelStyle}>Instruções para o entregador</label>
                <input
                  {...register("descricao")}
                  className={inputStyle}
                  placeholder="Ex: Avisar na recepção, objeto frágil..."
                />
                {errors.descricao && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.descricao.message}
                  </p>
                )}
              </div>
            </div>

            {/* ORIGEM E DESTINO COM AUTOCOMPLETE (SEM STATES EXTERNOS ALTERADOS) */}
            <div className="space-y-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">

              {/* ORIGEM */}
              <div className="relative">
                <label className={labelStyle}>Ponto de Recolha</label>

                <div className="relative">
                  <i className="fas fa-circle-dot absolute left-4 top-1/2 -translate-y-1/2 text-red-500 text-[10px]"></i>

                  <input
                    {...register("origem")}
                    className={`${inputStyle} pl-10 bg-white`}
                    placeholder="Endereço de origem"
                    value={pickup}
                    onChange={(e) => {
                      setPickup(e.target.value);
                      searchAddress(e.target.value, setPickupSug);
                    }}
                  />

                  {errors.origem && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.origem.message}
                    </p>
                  )}

                  {/* SUGESTÕES ORIGEM */}
                  {pickupSug.length > 0 && (
                    <div className="absolute z-50 w-full bg-white border rounded-xl mt-1 shadow-lg max-h-48 overflow-auto">
                      {pickupSug.map((item, i) => (
                        <div
                          key={i}
                          className="p-2 text-xs hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setPickup(item.display_name);
                            setPickupCoords([Number(item.lat), Number(item.lon)]);
                            setPickupSug([]);
                            setIsUsingMyLocation(false);

                            toast.success("Ponto de recolha selecionado");
                          }}
                        >
                          {item.display_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* DESTINO */}
              <div className="relative">
                <label className={labelStyle}>Ponto de Entrega</label>

                <div className="relative">
                  <i className="fas fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-red-700"></i>

                  <input
                    {...register("destino")}
                    className={`${inputStyle} pl-10 bg-white`}
                    placeholder="Endereço de destino"
                    value={dropoff}
                    onChange={(e) => {
                      setDropoff(e.target.value);
                      searchAddress(e.target.value, setDropoffSug);
                    }}
                  />

                  {errors.destino && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.destino.message}
                    </p>
                  )}

                  {/* SUGESTÕES DESTINO */}
                  {dropoffSug.length > 0 && (
                    <div className="absolute z-50 w-full bg-white border rounded-xl mt-1 shadow-lg max-h-48 overflow-auto">
                      {dropoffSug.map((item, i) => (
                        <div
                          key={i}
                          className="p-2 text-xs hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setDropoff(item.display_name);
                            setDropoffCoords([Number(item.lat), Number(item.lon)]);
                            setDropoffSug([]);

                            toast.success("Ponto de entrega selecionado");
                          }}
                        >
                          {item.display_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* MAPA DE PREVIEW */}
            <div className="space-y-2">
              <label className={labelStyle}>Confirmação no mapa</label>

              <div className="w-full h-100 rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
                {pickupCoords && (
                  <MapContainer
                    center={pickupCoords}
                    zoom={13}
                    className="h-full w-full z-0"
                    zoomControl={false}
                  >
                    <TileLayer
                      attribution="&copy; OpenStreetMap"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <FitRoute route={route} />

                    <Marker position={pickupCoords}>
                      <Tooltip permanent direction="top" offset={[0, -10]}>
                        {isUsingMyLocation ? "Sua localização atual" : "Ponto de recolha"}
                    </Tooltip>
                    </Marker>

                    {!pickupCoords && (
                      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        Obtendo sua localização...
                      </div>
                    )}

                    {dropoffCoords && (
                      <Marker position={dropoffCoords}>
                        <Tooltip permanent direction="top" offset={[0, -10]}>
                          Ponto de entrega
                        </Tooltip>
                      </Marker>
                    )}

                    {Array.isArray(route) && route.length > 1 && (
                      <Polyline positions={route} color="red" />
                    )}
                  </MapContainer>
                )}
              </div>
            </div>

            {route.length > 1 && (
              <div className="bg-gray-50 p-3 rounded-xl text-sm font-medium text-gray-700 space-y-1">
                <p>
                  <i className="fa-solid fa-route text-red-700 mr-2"></i>
                  Distância: {distanceKm.toFixed(1)} km
                </p>

                <p>
                  <i className="fa-solid fa-clock text-red-700 mr-2"></i>
                  Tempo estimado: {etaMin.toFixed(0)} min
                </p>

                <p>
                  <i className="fa-solid fa-sack-dollar text-red-700 mr-2"></i>
                  Preço estimado: {formatPrice(price)}
                </p>

            </div>
          )}

          {route.length > 1 && (
            <button
              type="button"
              onClick={() => getRoute(pickupCoords, dropoffCoords)}
              disabled={loadingRoute || !pickupCoords || !dropoffCoords}
              className="w-full cursor-pointer mt-3 py-2 bg-red-50 text-red-700 font-bold rounded-xl 
                        hover:bg-red-100 transition disabled:opacity-50"
            >
              {loadingRoute ? "A recalcular..." : "Refazer rota"}
            </button>
          )}



            {/* BOTÕES DE AÇÃO */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
               <button 
                 type="button" 
                 onClick={() => setOpenModal(false)}
                 className="flex-1 cursor-pointer py-4 border-2 border-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-50 transition-all"
               >
                 Cancelar
               </button>
               <button 
                 type="submit"
                 disabled={loadingRoute}
                 className="flex-2 cursor-pointer py-4 bg-red-700 text-white font-black rounded-2xl shadow-lg shadow-red-700/20 hover:bg-red-800 transition-all disabled:opacity-60"
               >
                {loading ? "Criando pedido..." : "Confirmar e Buscar Entregador"}
               </button>
            </div>

          </form>
        </Modal>
      </SolicitanteLayout>
    </>
  );
}
