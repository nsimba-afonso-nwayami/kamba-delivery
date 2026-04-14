import { Link } from "react-router-dom";
import Entregador from "../../assets/img/entregador.jpg";

export default function SouEntregador() {
  // Mantendo a padronização de botões que definimos
  const btnPrimary = "bg-red-700 text-white px-8 py-3.5 rounded-xl font-bold text-center shadow-lg shadow-red-700/20 hover:bg-red-900 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 w-full md:w-fit";
  const btnSecondary = "border-2 border-red-700 text-red-700 px-8 py-3.5 rounded-xl font-bold text-center hover:bg-rose-50 transition-all duration-300 flex items-center justify-center gap-2 w-full md:w-fit";

  return (
    <section id="sou-entregador" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* CONTEÚDO */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold text-red-900">
            Torne-se um entregador parceiro
          </h2>

          <p className="mt-4 text-gray-500 leading-relaxed">
            Ganhe dinheiro fazendo entregas com total flexibilidade.
            Você escolhe quando e onde trabalhar, sendo seu próprio chefe.
          </p>

          {/* BENEFÍCIOS */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <i className="fas fa-check-circle text-red-700"></i>
              <span className="text-gray-600 font-medium">
                Renda extra ou principal
              </span>
            </div>

            <div className="flex items-center gap-3">
              <i className="fas fa-check-circle text-red-700"></i>
              <span className="text-gray-600 font-medium">
                Horários flexíveis
              </span>
            </div>

            <div className="flex items-center gap-3">
              <i className="fas fa-check-circle text-red-700"></i>
              <span className="text-gray-600 font-medium">
                Comece a trabalhar rapidamente
              </span>
            </div>
          </div>

          {/* CTA PADRONIZADO */}
          <div className="mt-10 flex flex-col md:flex-row gap-4">
            <Link to="/register" className={btnPrimary}>
              Quero ser entregador
              <i className="fas fa-motorcycle text-xs"></i>
            </Link>

            <Link to="/#como-funciona" className={btnSecondary}>
              Como funciona
            </Link>
          </div>
        </div>

        {/* IMAGEM */}
        <div className="order-1 md:order-2 w-full h-100 md:h-125">
          <img
            src={Entregador}
            alt="Entregador"
            className="w-full h-full object-cover rounded-2xl shadow-md"
          />
        </div>

      </div>
    </section>
  );
}
