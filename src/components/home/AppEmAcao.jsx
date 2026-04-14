import { Link } from "react-router-dom";
import AppMockup from "../../assets/img/download.jpg";

export default function AppEmAcao() {
  // Padronização correta: RED-700 e RED-900
  const btnPrimary = "bg-red-700 text-white px-10 py-4 rounded-xl font-bold text-center shadow-lg shadow-red-700/20 hover:bg-red-900 transition-all duration-300 active:scale-95 inline-flex items-center justify-center gap-2";

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Detalhe de fundo em Rose/Red sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-red-700/5 rounded-full blur-3xl z-0" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">

        {/* CABEÇALHO */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-red-900 leading-tight">
            Veja a Kamba Delivery em <span className="text-red-700">ação</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg font-light">
            Uma experiência simples, rápida e feita para facilitar suas entregas no dia a dia em Luanda.
          </p>
        </div>

        {/* CONTEÚDO */}
        <div className="mt-20 grid md:grid-cols-3 items-center gap-12">

          {/* BENEFÍCIOS ESQUERDA */}
          <div className="space-y-12 text-left">
            <div className="group cursor-default">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center text-red-700 group-hover:bg-red-700 group-hover:text-white transition-colors duration-300">
                  <i className="fas fa-bolt"></i>
                </div>
                <h3 className="font-bold text-red-900 text-xl">Pedido em segundos</h3>
              </div>
              <p className="text-gray-500 leading-relaxed text-sm">
                Solicite uma entrega rapidamente sem complicações ou burocracia.
              </p>
            </div>

            <div className="group cursor-default">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center text-red-700 group-hover:bg-red-700 group-hover:text-white transition-colors duration-300">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h3 className="font-bold text-red-900 text-xl">Rastreamento vivo</h3>
              </div>
              <p className="text-gray-500 leading-relaxed text-sm">
                Acompanhe o entregador no mapa em tempo real até a porta do destino.
              </p>
            </div>
          </div>

          {/* MOCKUP CENTRAL */}
          <div className="flex justify-center relative">
            <div className="relative group">
              {/* Moldura do celular */}
              <div className="w-72 h-145 rounded-[3rem] border-10 border-gray-900 shadow-2xl overflow-hidden bg-gray-900 relative transition-transform duration-700 group-hover:scale-[1.02]">
                <img
                  src={AppMockup}
                  alt="App Kamba Delivery"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badge Flutuante */}
              <div className="absolute -right-6 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-rose-100 hidden lg:flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">
                  <i className="fas fa-check"></i>
                </div>
                <span className="text-[10px] font-black text-red-900 uppercase tracking-tighter">Motorista a caminho</span>
              </div>
            </div>
          </div>

          {/* BENEFÍCIOS DIREITA */}
          <div className="space-y-12 text-left md:text-right">
            <div className="group cursor-default">
              <div className="flex items-center gap-3 mb-2 md:flex-row-reverse">
                <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center text-red-700 group-hover:bg-red-700 group-hover:text-white transition-colors duration-300">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3 className="font-bold text-red-900 text-xl">Segurança Total</h3>
              </div>
              <p className="text-gray-500 leading-relaxed text-sm">
                Entregadores verificados e seguro em todas as suas encomendas.
              </p>
            </div>

            <div className="group cursor-default">
              <div className="flex items-center gap-3 mb-2 md:flex-row-reverse">
                <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center text-red-700 group-hover:bg-red-700 group-hover:text-white transition-colors duration-300">
                  <i className="fas fa-wallet"></i>
                </div>
                <h3 className="font-bold text-red-900 text-xl">Preço Justo</h3>
              </div>
              <p className="text-gray-500 leading-relaxed text-sm">
                Custo acessível calculado automaticamente por distância e peso.
              </p>
            </div>
          </div>

        </div>

        {/* CTA FINAL */}
        <div className="mt-16">
          <Link to="/register" className={btnPrimary}>
            Começar Experiência
            <i className="fas fa-arrow-right text-xs"></i>
          </Link>
        </div>

      </div>
    </section>
  );
}
