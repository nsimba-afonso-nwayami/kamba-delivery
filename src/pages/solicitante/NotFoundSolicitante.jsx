import { Link } from "react-router-dom"; // Ou o sistema de rotas que estiver usando
import SolicitanteLayout from "./components/SolicitanteLayout";

export default function NotFoundSolicitante() {
  return (
    <>
      <title>Página não encontrada | Kamba Delivery</title>
      <SolicitanteLayout title="Página não encontrada">
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
          
          {/* ILUSTRAÇÃO/ÍCONE */}
          <div className="relative mb-8">
            <div className="text-[120px] font-bold text-gray-100 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-red-50 rounded-[35%_65%_70%_30%/30%_40%_60%_70%] animate-pulse flex items-center justify-center">
                <i className="fas fa-map-location-dot text-4xl text-red-700"></i>
              </div>
            </div>
          </div>

          {/* MENSAGEM */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Caminho perdido!
          </h2>
          <p className="text-gray-500 font-medium max-w-md mb-10 leading-relaxed">
            Parece que o endereço que você tentou acessar não existe ou foi movido. 
            Não se preocupe, nossos entregadores são melhores em rotas do que nossos links!
          </p>

          {/* BOTÕES DE ATALHO */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <Link 
              to="/dashboard/solicitante" 
              className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-gray-200 active:scale-95 flex items-center justify-center gap-3"
            >
              <i className="fas fa-home"></i>
              Voltar ao Início
            </Link>
            
            <Link 
              to="/dashboard/solicitante/pedidos" 
              className="flex-1 bg-white border border-gray-100 text-gray-600 px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <i className="fas fa-box"></i>
              Meus Pedidos
            </Link>
          </div>

          {/* SUPORTE RÁPIDO */}
          <div className="mt-12 pt-8 border-t border-gray-100 w-full max-w-xs">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter mb-4">
              Ainda precisa de ajuda?
            </p>
            <div className="flex justify-center gap-6">
              <a href="/ajuda" className="text-gray-400 hover:text-red-700 transition-colors">
                <i className="fas fa-question-circle mr-2"></i> Centro de Ajuda
              </a>
              <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                <i className="fab fa-whatsapp mr-2"></i> Suporte
              </a>
            </div>
          </div>

        </div>
      </SolicitanteLayout>
    </>
  );
}
