import { Link } from "react-router-dom";
import DownloadImg from "../../assets/img/download.jpg";

export default function Download() {
  // Padronização dos botões conforme o novo design padrão do site (pílula, limpo)
  const btnBase =
    "group px-8 py-4 rounded-full font-bold text-center transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 w-full sm:w-fit tracking-wide text-xs uppercase cursor-pointer";

  // Primário para fundo claro
  const btnPrimary = `${btnBase} bg-red-700 text-white shadow-lg shadow-red-700/20 hover:bg-red-800 hover:shadow-red-700/30`;

  // Secundário para fundo claro
  const btnSecondary = `${btnBase} border border-red-700 text-red-700 hover:bg-rose-50 hover:border-red-800 hover:text-red-800`;

  // Dados dos Benefícios para renderização limpa e iconografia específica
  const beneficiosDownload = [
    {
      icon: "fas fa-thumbs-up",
      text: "Rápido e fácil de usar, solicite em segundos",
    },
    {
      icon: "fas fa-map-marker-alt",
      text: "Acompanhamento em tempo real no mapa de Luanda",
    },
    {
      icon: "fas fa-clock",
      text: "Disponível 24/7, onde quer que você esteja",
    },
  ];

  return (
    <section
      id="download"
      className="py-24 bg-gray-50 relative overflow-hidden"
    >
      {/* Detalhe de fundo sutil (consistência com outras seções) */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-125 h-125 bg-rose-100/50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
        {/* IMAGEM (ESQUERDA) */}
        <div className="order-1 w-full h-100 md:h-130 group relative">
          <div className="absolute inset-0 bg-red-900 rounded-3xl -rotate-1 group-hover:rotate-0 transition-transform duration-500 opacity-5"></div>
          <img
            src={DownloadImg}
            alt="Baixar aplicativo móvel Kamba Delivery em Luanda"
            className="w-full h-full object-cover rounded-3xl shadow-xl shadow-gray-200/50 relative z-10 border border-gray-100 group-hover:scale-[1.01] transition-transform duration-500"
          />
        </div>

        {/* CONTEÚDO (DIREITA) */}
        <div className="flex flex-col items-start justify-center order-2">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold text-red-900 tracking-tighter leading-tight">
              Baixe a{" "}
              <span className="text-red-700 relative">
                Kamba Delivery
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-red-700 rounded-full opacity-70"></span>
              </span>
            </h2>
          </div>

          <p className="mt-8 text-gray-500 leading-relaxed font-light text-[15px] max-w-xl">
            Tenha a melhor experiência de entregas na palma da sua mão.
            Solicite, acompanhe e receba tudo em tempo real na{" "}
            <span className="text-red-700 font-semibold">Kamba Delivery</span>,
            onde quer que você esteja em toda a província de Luanda.
          </p>

          {/* BENEFÍCIOS */}
          <div className="mt-10 space-y-5 w-full">
            {beneficiosDownload.map((beneficio, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-red-700/10 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-red-700 shadow-inner group-hover:bg-red-700 group-hover:text-white group-hover:border-red-700 transition-colors duration-300 shrink-0">
                  <i className={`${beneficio.icon} text-lg`}></i>
                </div>
                <span className="text-gray-700 font-medium text-[15px]">
                  {beneficio.text}
                </span>
              </div>
            ))}
          </div>

          {/* BOTÕES PADRONIZADOS COM ÍCONE DA PLAY STORE / DOWNLOAD */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-fit">
            <a href="#" className={btnPrimary}>
              <i className="fab fa-google-play text-sm transition-transform group-hover:scale-110"></i>
              <span>Baixar App Agora</span>
            </a>

            <Link to="/register" className={btnSecondary}>
              Criar conta grátis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
