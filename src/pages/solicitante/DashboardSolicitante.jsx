import { useState } from "react";
import SolicitanteLayout from "./components/SolicitanteLayout";
import Modal from "./components/Modal";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function DashboardSolicitante() {
  const [openModal, setOpenModal] = useState(false);
  const position = [-8.838333, 13.234444];

  const inputStyle = "w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-xl focus:border-red-700 focus:ring-2 focus:ring-red-700/5 outline-none transition-all bg-gray-50/50 text-sm font-medium";
  const labelStyle = "text-xs font-black text-red-900 uppercase tracking-wider ml-1";

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
            <MapContainer
              center={position}
              zoom={13}
              className="h-full w-full z-0"
              zoomControl={false} // Limpa a UI para um look mais app
            >
              <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>Sua localização atual</Popup>
              </Marker>
            </MapContainer>
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
          <form className="space-y-6 pb-10" onSubmit={(e) => e.preventDefault()}>
            
            {/* LINHA 1: TÍTULO E URGÊNCIA */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className={labelStyle}>O que você quer enviar?</label>
                <input className={inputStyle} placeholder="Ex: Chaves, Almoço, Documentos..." />
              </div>
              <div>
                <label className={labelStyle}>Prioridade</label>
                <select className={inputStyle}>
                  <option>Normal (Padrão)</option>
                  <option>Urgente</option>
                  <option>Express</option>
                </select>
              </div>
            </div>

            {/* LINHA 2: PESO E DESCRIÇÃO */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className={labelStyle}>Peso Est.</label>
                <div className="relative">
                   <input type="number" className={inputStyle} placeholder="2" />
                   <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 mt-0.5">KG</span>
                </div>
              </div>
              <div className="md:col-span-3">
                <label className={labelStyle}>Instruções para o entregador</label>
                <input className={inputStyle} placeholder="Ex: Avisar na recepção, objeto frágil..." />
              </div>
            </div>

            {/* ORIGEM E DESTINO COM ÍCONES */}
            <div className="space-y-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="relative">
                <label className={labelStyle}>Ponto de Recolha</label>
                <div className="relative">
                  <i className="fas fa-circle-dot absolute left-4 top-1/2 -translate-y-1/2 text-red-500 text-[10px]"></i>
                  <input className={`${inputStyle} pl-10 bg-white`} placeholder="Endereço de origem" />
                </div>
              </div>
              <div className="relative">
                <label className={labelStyle}>Ponto de Entrega</label>
                <div className="relative">
                  <i className="fas fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-red-700"></i>
                  <input className={`${inputStyle} pl-10 bg-white`} placeholder="Endereço de destino" />
                </div>
              </div>
            </div>

            {/* MAPA DE PREVIEW NO MODAL */}
            <div className="space-y-2">
               <label className={labelStyle}>Confirmação no mapa</label>
               <div className="w-full h-48 rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
                <MapContainer center={position} zoom={12} className="h-full w-full">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={position} />
                </MapContainer>
              </div>
            </div>

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
                 className="flex-2 cursor-pointer py-4 bg-red-700 text-white font-black rounded-2xl shadow-lg shadow-red-700/20 hover:bg-red-800 transition-all"
               >
                 Confirmar e Buscar Entregador
               </button>
            </div>

          </form>
        </Modal>
      </SolicitanteLayout>
    </>
  );
}
