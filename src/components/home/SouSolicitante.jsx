import { Link } from "react-router-dom";
import Solicitante from "../../assets/img/solicitante.jpg";

export default function SouSolicitante() {
  // Padronização dos botões conforme o novo design (pílula, limpo)
  const btnBase =
    "group px-8 py-4 rounded-full font-bold text-center transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 w-full sm:w-fit tracking-wide text-xs uppercase";

  const btnPrimary = `${btnBase} bg-red-700 text-white shadow-lg shadow-red-700/20 hover:bg-red-800 hover:shadow-red-700/30`;

  const btnSecondary = `${btnBase} border border-red-700 text-red-700 hover:bg-rose-50 hover:border-red-800 hover:text-red-800`;

  // Dados dos Benefícios para renderização limpa
  const beneficios = [
    {
      icon: "fas fa-bolt",
      text: "Solicitação rápida e simples, em poucos cliques",
    },
    {
      icon: "fas fa-map-marker-alt",
      text: "Acompanhamento em tempo real no mapa LuandaProvince",
    },
    {
      icon: "fas fa-shield-alt",
      text: "Entregadores verificados e treinados",
    },
  ];

  return (
    <section
      id="sou-solicitante"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Detalhe de fundo sutil (consistência com outras seções) */}
      <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/3 w-125 h-125 bg-rose-100/50 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
        {/* IMAGEM (Com design de container limpo) */}
        <div className="w-full h-100 md:h-130 group relative">
          <div className="absolute inset-0 bg-red-900 rounded-3xl rotate-1 group-hover:rotate-0 transition-transform duration-500 opacity-5"></div>
          <img
            src={Solicitante}
            alt="Solicitante pedindo entrega"
            className="w-full h-full object-cover rounded-3xl shadow-xl shadow-gray-200/50 relative z-10 border border-gray-100 group-hover:scale-[1.01] transition-transform duration-500"
          />
        </div>

        {/* CONTEÚDO (Centralizado verticalmente na grid) */}
        <div className="flex flex-col items-start justify-center">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold text-red-900 tracking-tighter leading-tight">
              Precisa enviar <span className="text-red-700">algo?</span>
            </h2>
          </div>

          <p className="mt-6 text-gray-500 leading-relaxed font-light text-[15px] max-w-xl">
            Com a{" "}
            <span className="text-red-700 font-semibold">Kamba Delivery</span>,
            você solicita entregas em poucos cliques e acompanha tudo em tempo
            real. Rápido, seguro e sem complicações para o seu dia a dia.
          </p>

          {/* BENEFÍCIOS (Refatorado para Badges/Cards Limpos) */}
          <div className="mt-10 space-y-5 w-full">
            {beneficios.map((beneficio, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-rose-50 border border-rose-100 rounded-2xl p-5 hover:border-red-700/10 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300 group"
              >
                {/* Container do Ícone (Consistência com estilo de passos) */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-rose-100 text-red-700 shadow-inner group-hover:bg-red-700 group-hover:text-white group-hover:border-red-700 transition-colors duration-300">
                  <i className={`${beneficio.icon} text-lg`}></i>
                </div>
                <span className="text-gray-700 font-medium text-[15px]">
                  {beneficio.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA PADRONIZADO (Alinhado com novo estilo de botão) */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-fit">
            <Link to="/register" className={btnPrimary}>
              <span>Solicitar entrega agora</span>
              <i className="fas fa-chevron-right text-xs transition-transform group-hover:translate-x-1"></i>
            </Link>

            <Link to="/#como-funciona" className={btnSecondary}>
              Ver como funciona
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
