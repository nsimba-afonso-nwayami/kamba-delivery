import { Link } from "react-router-dom";

export default function CTA() {
  // Botões adaptados para fundo colorido (Red-700)
  const btnWhite = "bg-white text-red-700 px-10 py-4 rounded-xl font-bold text-center shadow-xl shadow-black/10 hover:bg-rose-50 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 w-full md:w-fit cursor-pointer";
  const btnOutlineWhite = "border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-center hover:bg-white hover:text-red-700 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 w-full md:w-fit cursor-pointer";

  return (
    <section className="py-24 bg-red-700 relative overflow-hidden">
      
      {/* Elementos decorativos de fundo (Círculos sutis) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-20 -mb-20 blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 text-center text-white relative z-10">

        {/* TÍTULO */}
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          Pronto para começar a enviar ou ganhar dinheiro?
        </h2>

        <p className="mt-6 text-rose-100 text-lg md:text-xl font-light max-w-2xl mx-auto">
          Junte-se à <span className="font-bold">Kamba Delivery</span> e faça parte da nova era de logística inteligente em Luanda.
        </p>

        {/* BOTÕES PADRONIZADOS */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/register" className={btnWhite}>
            Criar conta grátis
            <i className="fas fa-rocket text-xs"></i>
          </Link>

          <Link to="/login" className={btnOutlineWhite}>
            Já tenho conta
          </Link>
        </div>

        {/* MICRO TEXTO / DIVIDERS */}
        <div className="mt-10 flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-rose-200/60">
          <span>Rápido</span>
          <span className="w-1 h-1 bg-rose-200/40 rounded-full" />
          <span>Seguro</span>
          <span className="w-1 h-1 bg-rose-200/40 rounded-full" />
          <span>Luanda</span>
        </div>

      </div>
    </section>
  );
}
