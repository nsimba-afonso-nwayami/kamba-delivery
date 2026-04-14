import React, { useState, useEffect } from "react";

// O Hook que você enviou
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

// Componente de Item Individual para disparar a animação
function StatItem({ icon, value, label, suffix = "" }) {
  // Extrai apenas os números para o Hook (ex: de "10K+" extrai 10)
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const count = useCountUp(numericValue);

  return (
    <div className="group p-10 rounded-4xl bg-rose-50 border border-transparent hover:border-red-700/20 hover:bg-white hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-500">
      <div className="text-4xl text-red-700 group-hover:scale-110 transition-transform duration-500">
        <i className={icon}></i>
      </div>
      
      <h3 className="mt-6 text-4xl font-bold text-red-900">
        {/* Se for a avaliação (4.9), tratamos diferente, senão usamos o count + sufixo */}
        {value.includes(".") ? "4.9" : `${count}${value.replace(/[0-9]/g, "")}`}
      </h3>
      
      <p className="text-gray-500 font-medium uppercase text-xs tracking-widest mt-2">
        {label}
      </p>
    </div>
  );
}

export default function Estatisticas() {
  const stats = [
    { id: 1, icon: "fas fa-shipping-fast", value: "10K+", label: "Entregas realizadas" },
    { id: 2, icon: "fas fa-users", value: "5K+", label: "Clientes ativos" },
    { id: 3, icon: "fas fa-motorcycle", value: "800+", label: "Entregadores parceiros" },
    { id: 4, icon: "fas fa-star", value: "4.9", label: "Avaliação média" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* CABEÇALHO */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-red-900 leading-tight">
            A confiança que cresce todos os dias
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg font-light">
            Milhares de pessoas em Luanda já usam a Kamba Delivery para transformar a forma como enviam e recebem encomendas.
          </p>
        </div>

        {/* GRID DE ESTATÍSTICAS */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat) => (
            <StatItem 
              key={stat.id}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
