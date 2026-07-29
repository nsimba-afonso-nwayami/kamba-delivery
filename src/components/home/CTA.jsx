import { Link } from "react-router-dom";

export default function CTA() {
  // Padronização dos botões para fundo colorido (Red-700)
  const btnBase = "group px-8 py-4 rounded-full font-bold text-center transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 w-full sm:w-fit tracking-wide text-xs uppercase cursor-pointer";

  const btnWhite = `${btnBase} bg-white text-red-700 shadow-xl shadow-black/10 hover:bg-rose-50 hover:shadow-black/20`;

  const btnOutlineWhite = `${btnBase} border border-white text-white hover:bg-white hover:text-red-700`;

  return (
    <section className="py-24 bg-red-700 relative overflow-hidden">

      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full -ml-20 -mb-20 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center text-white relative z-10">

        {/* CABEÇALHO PADRONIZADO */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
            Pronto para começar a enviar ou ganhar dinheiro?
          </h2>
          <p className="mt-4 text-rose-100 font-light text-[15px] md:text-base leading-relaxed max-w-xl mx-auto">
            Junte-se à <span className="font-semibold text-white">Kamba Delivery</span> e faça parte da nova era de logística inteligente em Luanda.
          </p>
        </div>

        {/* BOTÕES PADRONIZADOS */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/register" className={btnWhite}>
            <span>Criar conta grátis</span>
            <i className="fas fa-rocket text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
          </Link>

          <Link to="/login" className={btnOutlineWhite}>
            <span>Já tenho conta</span>
          </Link>
        </div>

        {/* MICRO TEXTO / DIVIDERS */}
        <div className="mt-12 flex items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-rose-200/70">
          <span>Rápido</span>
          <span className="w-1.5 h-1.5 bg-rose-200/50 rounded-full" />
          <span>Seguro</span>
          <span className="w-1.5 h-1.5 bg-rose-200/50 rounded-full" />
          <span>Luanda</span>
        </div>

      </div>
    </section>
  );
}
