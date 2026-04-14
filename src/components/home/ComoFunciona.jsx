import { Link } from "react-router-dom";

export default function ComoFunciona() {
  const passos = [
    {
      id: "01",
      icon: "fas fa-map-marker-alt",
      title: "Faça seu pedido",
      desc: "Informe o local de coleta e o destino da entrega de forma simples e intuitiva.",
    },
    {
      id: "02",
      icon: "fas fa-motorcycle",
      title: "Acompanhe tudo",
      desc: "Veja o entregador a caminho e acompanhe sua encomenda em tempo real no mapa.",
    },
    {
      id: "03",
      icon: "fas fa-box",
      title: "Entrega concluída",
      desc: "Receba sua encomenda no destino final com total rapidez e segurança garantida.",
    },
  ];

  return (
    <section id="como-funciona" className="py-24 bg-white relative overflow-hidden">
      {/* Detalhe de fundo sutil */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-rose-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* CABEÇALHO */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-red-900">
            Como funciona a <span className="text-red-700">Kamba</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
            Experiência simplificada para quem envia e agilidade total para quem recebe.
          </p>
        </div>

        {/* GRID DE PASSOS */}
        <div className="mt-20 grid gap-12 md:grid-cols-3 relative">
          
          {/* Linha conectora (visível apenas em Desktop) */}
          <div className="hidden md:block absolute top-1/4 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-rose-200 to-transparent" />

          {passos.map((passo) => (
            <div 
              key={passo.id} 
              className="group relative bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 hover:border-red-700/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Número do Passo (Badge flutuante) */}
              <span className="absolute -top-4 -right-4 w-12 h-12 bg-rose-50 text-red-700 font-black flex items-center justify-center rounded-2xl text-xl group-hover:bg-red-700 group-hover:text-white transition-colors duration-500">
                {passo.id}
              </span>

              {/* Ícone com gradiente sutil */}
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-linear-to-br from-red-700 to-red-900 text-white text-2xl shadow-lg shadow-red-700/30 group-hover:scale-110 transition-transform duration-500">
                <i className={passo.icon}></i>
              </div>

              <h3 className="mt-8 font-bold text-xl text-red-900">
                {passo.title}
              </h3>

              <p className="mt-4 text-gray-500 leading-relaxed">
                {passo.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA FINAL */}
        <div className="mt-20 text-center">
          <Link
            to="/register"
            className="inline-flex items-center gap-3 bg-red-700 text-white px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-red-900 hover:shadow-2xl hover:shadow-red-700/40 transition-all duration-300 active:scale-95"
          >
            Começar Agora
            <i className="fas fa-chevron-right text-xs"></i>
          </Link>
          <p className="mt-6 text-sm text-gray-400 font-medium italic">
            * Disponível em toda a região de Luanda
          </p>
        </div>

      </div>
    </section>
  );
}
