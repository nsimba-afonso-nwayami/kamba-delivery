import { useState } from "react";
import EntregadorLayout from "./components/EntregadorLayout";
import ModalSmall from "./components/ModalSmall";

export default function DashboardEntregador() {
  const [isSaldoOpen, setIsSaldoOpen] = useState(false);
  const [isDadosBancariosOpen, setIsDadosBancariosOpen] = useState(false);

  const pedidosDisponiveis = [
    {
      id: "KD-2001",
      cliente: "Mauro Silva",
      distancia: "2.4 km",
      valor: "1.500 Kz",
      origem: "Patriota, Bomba da Sonangol",
      destino: "Talatona, Belas Business Park"
    },
    {
      id: "KD-2005",
      cliente: "Ana Paula",
      distancia: "5.1 km",
      valor: "3.200 Kz",
      origem: "Maianga, Largo do Sagrada",
      destino: "Viana, Ponte amarela"
    }
  ];

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
            <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 text-left">Ganhos de Hoje</p>
              <p className="text-2xl font-black text-red-900 tracking-tight text-left">12.450 <span className="text-sm font-bold text-red-700">Kz</span></p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm flex justify-between items-end">
              <div className="text-left">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Corridas</p>
                <p className="text-2xl font-black text-red-900">14</p>
              </div>
              <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl uppercase">Finalizadas</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm flex justify-between items-end">
              <div className="text-left">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Avaliação</p>
                <p className="text-2xl font-black text-red-900">4.9</p>
              </div>
              <div className="flex gap-0.5 text-rose-500 text-[10px] mb-2">
                {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
              </div>
            </div>
          </div>

          {/* LISTAGEM DE PEDIDOS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-lg font-bold text-red-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-5 bg-red-700 rounded-full"></span>
                Pedidos em Aberto
              </h2>
              <span className="text-[9px] font-black text-red-700 bg-rose-200 px-3 py-1 rounded-full uppercase tracking-tighter animate-pulse">Radar Ativo</span>
            </div>

            {pedidosDisponiveis.map((pedido) => (
              <div key={pedido.id} className="bg-white border border-rose-200/60 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-start gap-4 mb-6 flex-wrap">
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{pedido.id} • {pedido.distancia}</span>
                    <h3 className="font-black text-red-900 text-2xl tracking-tight">{pedido.valor}</h3>
                  </div>
                  <button className="bg-red-700 text-white px-8 py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-[0.15em] shadow-lg shadow-red-200 hover:bg-red-600 active:scale-95 transition-all cursor-pointer ml-auto">
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
                      <p className="text-sm font-bold text-gray-700 truncate">{pedido.origem}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-5 h-5 bg-white border-2 border-red-700 rounded-full flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 bg-red-700 rounded-full"></div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5 tracking-wider">Entrega</p>
                      <p className="text-sm font-bold text-gray-700 truncate">{pedido.destino}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
