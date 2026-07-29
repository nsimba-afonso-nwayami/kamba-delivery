import { Link } from "react-router-dom";
import ParallaxImg from "../../assets/img/parallax.jpg";

export default function ParallaxSection() {
  // Padronização dos botões conforme o novo design padrão do site (pílula, limpo)
  const btnBase =
    "group px-8 py-4 rounded-full font-bold text-center transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 w-full sm:w-fit tracking-wide text-xs uppercase";

  // Primário para fundo escuro
  const btnPrimary = `${btnBase} bg-red-700 text-white shadow-lg shadow-red-700/40 hover:bg-red-800 hover:shadow-red-700/50`;

  // Secundário para fundo escuro (borda branca para contraste)
  const btnSecondary = `${btnBase} border border-white/40 text-white hover:bg-white hover:text-red-900 hover:border-white`;

  return (
    <section
      // AUMENTADO: Altura aumentada para 85vh e adicionado min-h para garantir impacto em todas as telas
      className="relative h-[85vh] min-h-175 flex items-center justify-center bg-fixed bg-center bg-cover overflow-hidden"
      style={{ backgroundImage: `url(${ParallaxImg})` }}
    >
      {/* OVERLAYS DETALHADOS (Base sólida + Gradiente radial para profundidade) */}
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="absolute inset-0 bg-radial from-black/50 via-black/80 to-black/90 opacity-90"></div>

      {/* DETALHES VISUAIS SUTEIS (Bordas internas) */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/5 border-t border-white/5"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/5 border-b border-white/5"></div>

      {/* CONTEÚDO (Centralizado e refinado) */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto text-white">
        {/* Título com tracking mais justo para visual premium */}
        <h2 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tighter">
          Entregas rápidas, seguras e{" "}
          <span className="text-red-700 relative">
            confiáveis
            {/* Linha decorativa sutil sob a palavra destaque */}
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-red-700 rounded-full opacity-70"></span>
          </span>{" "}
          em Luanda
        </h2>

        {/* Parágrafo com melhor legibilidade e cor rose-200 suave */}
        <p className="mt-8 text-rose-200 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
          A <span className="text-white font-medium">Kamba Delivery</span>{" "}
          conecta clientes e entregadores de forma simples, eficiente e
          totalmente segura em toda a capital.
        </p>

        {/* Área de Botões (Usando o novo padrão pílula) */}
        <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link to="/register" className={btnPrimary}>
            <span>Começar agora</span>
            <i className="fas fa-rocket text-xs transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"></i>
          </Link>

          <Link to="/#como-funciona" className={btnSecondary}>
            Saber mais
          </Link>
        </div>
      </div>
    </section>
  );
}
