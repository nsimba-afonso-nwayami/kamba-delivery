import { Link } from "react-router-dom";
import Entregador from "../../assets/img/entregador.jpg";

export default function SouEntregador() {
  // Padronização dos botões conforme o novo design (pílula, limpo) - IDÊNTICO AO SOLICITANTE
  const btnBase =
    "group px-8 py-4 rounded-full font-bold text-center transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 w-full sm:w-fit tracking-wide text-xs uppercase";

  const btnPrimary = `${btnBase} bg-red-700 text-white shadow-lg shadow-red-700/20 hover:bg-red-800 hover:shadow-red-700/30`;

  const btnSecondary = `${btnBase} border border-red-700 text-red-700 hover:bg-rose-50 hover:border-red-800 hover:text-red-800`;

  // Dados dos Benefícios para renderização limpa (Adaptado para Entregador)
  const beneficios = [
    {
      icon: "fas fa-hand-holding-usd",
      text: "Renda extra ou principal, você decide",
    },
    {
      icon: "fas fa-calendar-alt",
      text: "Total flexibilidade de horários",
    },
    {
      icon: "fas fa-rocket",
      text: "Cadastro simples e aprovação rápida",
    },
  ];

  return (
    <section
      id="sou-entregador"
      className="py-24 bg-gray-50 relative overflow-hidden"
    >
      {/* Detalhe de fundo sutil (consistência visual, mas no canto oposto ao solicitante) */}
      <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/3 w-125 h-125 bg-rose-100 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
        {/* CONTEÚDO ( order-2 no mobile para ficar abaixo da imagem, order-1 no desktop ) */}
        <div className="flex flex-col items-start justify-center order-2 md:order-1">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold text-red-900 tracking-tighter leading-tight">
              Torne-se um entregador{" "}
              <span className="text-red-700">parceiro</span>
            </h2>
          </div>

          <p className="mt-6 text-gray-500 leading-relaxed font-light text-[15px] max-w-xl">
            Ganhe dinheiro fazendo entregas com total flexibilidade. Na{" "}
            <span className="text-red-700 font-semibold">Kamba Delivery</span>,
            você escolhe quando e onde trabalhar, sendo seu próprio chefe e
            aumentando sua renda.
          </p>

          {/* BENEFÍCIOS (Refatorado para Badges/Cards Limpos) */}
          <div className="mt-10 space-y-5 w-full">
            {beneficios.map((beneficio, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-red-700/10 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300 group"
              >
                {/* Container do Ícone (Consistência com estilo do Solicitante) */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-red-700 shadow-inner group-hover:bg-red-700 group-hover:text-white group-hover:border-red-700 transition-colors duration-300">
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
              <span>Quero ser entregador</span>
              <i className="fas fa-motorcycle text-xs transition-transform group-hover:translate-x-1"></i>
            </Link>

            <Link to="/#como-funciona" className={btnSecondary}>
              Como funciona
            </Link>
          </div>
        </div>

        {/* IMAGEM (Com design de container limpo e efeito hover) */}
        <div className="order-1 md:order-2 w-full h-100 md:h-130 group relative">
          <div className="absolute inset-0 bg-red-900 rounded-3xl -rotate-1 group-hover:rotate-0 transition-transform duration-500 opacity-5"></div>
          <img
            src={Entregador}
            alt="Entregador parceiro Kamba Delivery"
            className="w-full h-full object-cover rounded-3xl shadow-xl shadow-gray-200/50 relative z-10 border border-gray-100 group-hover:scale-[1.01] transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
}
