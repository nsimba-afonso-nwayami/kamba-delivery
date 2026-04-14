import { Link } from "react-router-dom";
import ParallaxImg from "../../assets/img/parallax.jpg";

export default function ParallaxSection() {
  // Padronização dos botões Premium
  const btnPrimary = "bg-red-700 text-white px-8 py-3.5 rounded-xl font-bold text-center shadow-lg shadow-red-700/40 hover:bg-red-900 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 w-full md:w-fit";
  const btnSecondary = "border-2 border-white text-white px-8 py-3.5 rounded-xl font-bold text-center hover:bg-white hover:text-red-900 transition-all duration-300 flex items-center justify-center gap-2 w-full md:w-fit";

  return (
    <section
      className="relative h-[60vh] flex items-center justify-center bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${ParallaxImg})` }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CONTEÚDO */}
      <div className="relative z-10 text-center px-6 max-w-4xl text-white">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          Entregas rápidas, seguras e <span className="text-red-700">confiáveis</span> em Luanda
        </h2>

        <p className="mt-4 text-rose-200 text-lg md:text-xl font-light max-w-2xl mx-auto">
          A Kamba Delivery conecta clientes e entregadores de forma simples e eficiente.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/register" className={btnPrimary}>
            Começar agora
            <i className="fas fa-rocket text-xs"></i>
          </Link>

          <Link to="/#como-funciona" className={btnSecondary}>
            Saber mais
          </Link>
        </div>
      </div>
    </section>
  );
}
