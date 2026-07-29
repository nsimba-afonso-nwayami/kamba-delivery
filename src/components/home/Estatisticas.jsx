import React, { useState, useEffect } from "react";

// Hook de Contagem Regressiva / Animação de Números
function useCountUp(end, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      setCount(Math.floor(percentage * end));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
}

// Item Individual Bento Card
function StatCard({ icon, value, label, subtext }) {
  const isDecimal = value.includes(".");
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const count = useCountUp(numericValue);
  const suffix = value.replace(/[0-9]/g, "").replace(".", "");

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-8 hover:border-red-700/20 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between">
      {/* Linha vermelha de destaque no topo ao passar o mouse */}
      <div className="absolute top-0 left-0 w-full h-1 bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Cabeçalho do Card: Ícone Padronizado + Indicador Ativo */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-red-700 shadow-inner group-hover:bg-red-700 group-hover:text-white group-hover:border-red-700 transition-colors duration-300 shrink-0">
            <i className={`${icon} text-lg`}></i>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Valor da Estatística Animado */}
        <h3 className="text-4xl lg:text-5xl font-extrabold text-red-900 tracking-tight">
          {isDecimal ? value : `${count}${suffix}`}
        </h3>

        {/* Rótulo Principal */}
        <p className="text-gray-800 font-bold text-base mt-2">{label}</p>
      </div>

      {/* Micro Descrição Contextual */}
      <p className="text-gray-400 font-light text-xs mt-6 pt-4 border-t border-gray-100">
        {subtext}
      </p>
    </div>
  );
}

export default function Estatisticas() {
  const stats = [
    {
      id: 1,
      icon: "fas fa-shipping-fast",
      value: "10K+",
      label: "Entregas Realizadas",
      subtext: "Concluídas com sucesso em Luanda",
    },
    {
      id: 2,
      icon: "fas fa-users",
      value: "5K+",
      label: "Clientes Ativos",
      subtext: "Empresas e particulares atendidos",
    },
    {
      id: 3,
      icon: "fas fa-motorcycle",
      value: "800+",
      label: "Entregadores Parceiros",
      subtext: "Prontos e ativos em todas as zonas",
    },
    {
      id: 4,
      icon: "fas fa-star",
      value: "4.9",
      label: "Avaliação Média",
      subtext: "Satisfação comprovada pelos usuários",
    },
  ];

  return (
    <section
      id="estatisticas"
      className="py-24 bg-gray-50 relative overflow-hidden"
    >
      {/* Detalhe de fundo sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-rose-100 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* CABEÇALHO PADRONIZADO */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-red-900 tracking-tighter leading-tight">
            A confiança que cresce{" "}
            <span className="text-red-700">todos os dias</span>
          </h2>
          <p className="mt-4 text-gray-500 font-light text-[15px] leading-relaxed max-w-xl mx-auto">
            Milhares de pessoas em Luanda já usam a Kamba Delivery para
            transformar a forma como enviam e recebem encomendas.
          </p>
        </div>

        {/* BENTO GRID DE ESTATÍSTICAS */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              subtext={stat.subtext}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
