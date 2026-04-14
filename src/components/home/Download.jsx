import { Link } from "react-router-dom";
import DownloadImg from "../../assets/img/download.jpg";

export default function Download() {
  // Padronização dos botões Premium
  const btnPrimary = "bg-red-700 text-white px-8 py-3.5 rounded-xl font-bold text-center shadow-lg shadow-red-700/20 hover:bg-red-900 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 w-full md:w-fit";
  const btnSecondary = "border-2 border-red-700 text-red-700 px-8 py-3.5 rounded-xl font-bold text-center hover:bg-rose-50 transition-all duration-300 flex items-center justify-center gap-2 w-full md:w-fit";

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* IMAGEM (ESQUERDA) */}
        <div className="order-1 w-full h-100 md:h-125">
          <img
            src={DownloadImg}
            alt="Download app"
            className="w-full h-full object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* CONTEÚDO (DIREITA) */}
        <div className="order-2">
          <h2 className="text-3xl md:text-4xl font-bold text-red-900">
            Baixe a Kamba Delivery
          </h2>

          <p className="mt-4 text-gray-500 leading-relaxed">
            Tenha a melhor experiência de entregas na palma da sua mão.
            Solicite, acompanhe e receba tudo em tempo real, onde quer que você esteja em Luanda.
          </p>

          {/* BENEFÍCIOS */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <i className="fas fa-check-circle text-red-700"></i>
              <span className="text-gray-600 font-medium">
                Rápido e fácil de usar
              </span>
            </div>

            <div className="flex items-center gap-3">
              <i className="fas fa-check-circle text-red-700"></i>
              <span className="text-gray-600 font-medium">
                Acompanhamento em tempo real
              </span>
            </div>

            <div className="flex items-center gap-3">
              <i className="fas fa-check-circle text-red-700"></i>
              <span className="text-gray-600 font-medium">
                Disponível 24/7
              </span>
            </div>
          </div>

          {/* BOTÕES PADRONIZADOS */}
          <div className="mt-10 flex flex-col md:flex-row gap-4">
            <a href="#" className={btnPrimary}>
              <i className="fas fa-mobile-alt text-sm"></i>
              Baixar App
            </a>

            <Link to="/register" className={btnSecondary}>
              Criar conta
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
