import { Link } from "react-router-dom";

export default function ComoFunciona() {
  // Padronização dos botões conforme o design do projeto
  const btnBase =
    "group px-8 py-4 rounded-full font-bold text-center transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 w-full sm:w-fit tracking-wide text-xs uppercase cursor-pointer";

  const btnPrimary = `${btnBase} bg-red-700 text-white shadow-lg shadow-red-700/20 hover:bg-red-800 hover:shadow-red-700/30`;

  const passos = [
    {
      id: 1,
      icon: "fas fa-map-marker-alt",
      title: "Faça o seu pedido",
      desc: "Informe o ponto de recolha e o destino final de forma rápida, simples e intuitiva no aplicativo.",
    },
    {
      id: 2,
      icon: "fas fa-motorcycle",
      title: "Acompanhe no mapa",
      desc: "Veja o seu entregador em tempo real no mapa com a rota exata até o local da entrega.",
    },
    {
      id: 3,
      icon: "fas fa-check-circle",
      title: "Entrega concluída",
      desc: "Receba a encomenda em mãos no destino com total segurança, rapidez e confirmação digital.",
    },
  ];

  return (
    <section
      id="como-funciona"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Detalhe de fundo sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-rose-100 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* CABEÇALHO */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-red-900 tracking-tighter leading-tight">
            Como funciona a <span className="text-red-700">Kamba</span>
          </h2>
          <p className="mt-4 text-gray-500 font-light text-[15px] leading-relaxed max-w-xl mx-auto">
            Uma experiência descomplicada e transparente para quem envia e
            agilidade total para quem recebe.
          </p>
        </div>

        {/* LAYOUT FLUIDO E MODERNO (SEM CARDS) */}
        <div className="mt-20 relative">
          {/* Linha conectora contínua (visível em desktop) */}
          <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-linear-to-r from-rose-200 via-red-300 to-rose-200 z-0" />

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16 relative z-10">
            {passos.map((passo) => (
              <div
                key={passo.id}
                className="flex flex-col items-center text-center group"
              >
                {/* Ícone Hub Flutuante */}
                <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 text-red-700 flex items-center justify-center text-2xl shadow-xl shadow-gray-200/50 group-hover:bg-red-700 group-hover:text-white group-hover:border-red-700 group-hover:scale-110 transition-all duration-300 relative">
                  <i
                    className={`${passo.icon} transition-transform group-hover:rotate-6`}
                  ></i>
                </div>

                {/* Conteúdo textual */}
                <h3 className="mt-8 font-bold text-red-900 text-xl tracking-tight">
                  {passo.title}
                </h3>
                <p className="mt-3 text-gray-500 font-light text-sm leading-relaxed max-w-sm">
                  {passo.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA FINAL PADRONIZADO */}
        <div className="mt-20 flex flex-col items-center justify-center">
          <Link to="/register" className={btnPrimary}>
            <span>Começar Agora</span>
            <i className="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
          </Link>
          <p className="mt-4 text-xs text-gray-400 font-medium">
            Atendimento rápido e seguro em toda a região de Luanda
          </p>
        </div>
      </div>
    </section>
  );
}
