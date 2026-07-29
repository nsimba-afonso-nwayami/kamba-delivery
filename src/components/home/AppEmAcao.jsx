import { Link } from "react-router-dom";
import AppMockup from "../../assets/img/download.jpg";

export default function AppEmAcao() {
  // Padronização dos botões conforme o design do projeto (IDÊNTICO AO SOUENTREGADOR)
  const btnBase = "group px-8 py-4 rounded-full font-bold text-center transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 w-full sm:w-fit tracking-wide text-xs uppercase";
  
  const btnPrimary = `${btnBase} bg-red-700 text-white shadow-lg shadow-red-700/20 hover:bg-red-800 hover:shadow-red-700/30`;

  // Dados dos Benefícios para renderização limpa
  const beneficiosEsquerda = [
    {
      icon: "fas fa-bolt",
      title: "Pedido em segundos",
      text: "Solicite uma entrega rapidamente sem complicações ou burocracia.",
    },
    {
      icon: "fas fa-map-marker-alt",
      title: "Rastreamento vivo",
      text: "Acompanhe o entregador no mapa em tempo real até a porta do destino.",
    },
  ];

  const beneficiosDireita = [
    {
      icon: "fas fa-shield-alt",
      title: "Segurança Total",
      text: "Entregadores verificados e garantia de cuidado em todas as suas encomendas.",
    },
    {
      icon: "fas fa-wallet",
      title: "Preço Justo",
      text: "Custo acessível calculado automaticamente por distância e peso.",
    },
  ];

  return (
    <section id="app-em-acao" className="py-24 bg-white relative overflow-hidden">
      {/* Detalhe de fundo sutil (consistência visual com as outras seções) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-rose-100 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* CABEÇALHO */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-red-900 tracking-tighter leading-tight">
            Veja a Kamba Delivery em <span className="text-red-700">ação</span>
          </h2>
          <p className="mt-4 text-gray-500 font-light text-[15px] leading-relaxed max-w-xl mx-auto">
            Uma experiência simples, rápida e feita para facilitar suas entregas no dia a dia em Luanda.
          </p>
        </div>

        {/* CONTEÚDO PRINCIPAL (3 COLUNAS) */}
        <div className="mt-16 grid lg:grid-cols-3 items-center gap-10 lg:gap-8">

          {/* BENEFÍCIOS ESQUERDA */}
          <div className="space-y-5">
            {beneficiosEsquerda.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-red-700/10 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-red-700 shadow-inner group-hover:bg-red-700 group-hover:text-white group-hover:border-red-700 transition-colors duration-300 shrink-0">
                  <i className={`${item.icon} text-lg`}></i>
                </div>
                <div>
                  <h3 className="font-bold text-red-900 text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-500 font-light text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* MOCKUP CENTRAL */}
          <div className="flex justify-center relative my-6 lg:my-0">
            <div className="relative group">
              {/* Moldura do celular */}
              <div className="w-72 h-140 rounded-[3rem] border-10 border-gray-900 shadow-2xl overflow-hidden bg-gray-900 relative transition-transform duration-500 group-hover:scale-[1.01]">
                
                {/* Notch / Ilha Superior */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4 bg-gray-900 rounded-full z-20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-gray-800 rounded-full mr-2" />
                  <div className="w-2 h-2 bg-gray-800 rounded-full" />
                </div>

                <img
                  src={AppMockup}
                  alt="App Kamba Delivery"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badge Flutuante 1 */}
              <div className="absolute -right-6 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">
                  <i className="fas fa-check"></i>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</p>
                  <p className="text-xs font-bold text-red-900">Motorista a caminho</p>
                </div>
              </div>

              {/* Badge Flutuante 2 */}
              <div className="absolute -left-6 bottom-1/4 bg-white p-3.5 rounded-2xl shadow-xl border border-gray-100 hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 bg-rose-50 text-red-700 rounded-xl flex items-center justify-center text-sm">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-red-900">100% Seguro</p>
                  <p className="text-[10px] text-gray-400">Entrega garantida</p>
                </div>
              </div>
            </div>
          </div>

          {/* BENEFÍCIOS DIREITA */}
          <div className="space-y-5">
            {beneficiosDireita.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-red-700/10 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-red-700 shadow-inner group-hover:bg-red-700 group-hover:text-white group-hover:border-red-700 transition-colors duration-300 shrink-0">
                  <i className={`${item.icon} text-lg`}></i>
                </div>
                <div>
                  <h3 className="font-bold text-red-900 text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-500 font-light text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* CTA FINAL PADRONIZADO */}
        <div className="mt-16 flex justify-center">
          <Link to="/register" className={btnPrimary}>
            <span>Começar Experiência</span>
            <i className="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
          </Link>
        </div>

      </div>
    </section>
  );
}
