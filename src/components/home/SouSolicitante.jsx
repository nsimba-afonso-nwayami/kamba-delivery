import { Link } from "react-router-dom";
import Solicitante from "../../assets/img/solicitante.jpg";

export default function SouSolicitante() {
  // Padronização dos botões conforme as seções anteriores
  const btnPrimary = "bg-red-700 text-white px-8 py-3.5 rounded-xl font-bold text-center shadow-lg shadow-red-700/20 hover:bg-red-900 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 w-full md:w-fit";
  const btnSecondary = "border-2 border-red-700 text-red-700 px-8 py-3.5 rounded-xl font-bold text-center hover:bg-rose-50 transition-all duration-300 flex items-center justify-center gap-2 w-full md:w-fit";

  return (
    <section id="sou-solicitante" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* IMAGEM */}
        <div className="w-full h-100 md:h-125">
          <img
            src={Solicitante}
            alt="Solicitante"
            className="w-full h-full object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* CONTEÚDO */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-red-900">
            Precisa enviar algo?
          </h2>

          <p className="mt-4 text-gray-500 leading-relaxed">
            Com a Kamba Delivery, você solicita entregas em poucos cliques e acompanha tudo em tempo real. 
            Rápido, seguro e sem complicações.
          </p>

          {/* BENEFÍCIOS */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <i className="fas fa-check-circle text-red-700"></i>
              <span className="text-gray-600 font-medium">
                Solicitação rápida e simples
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
                Entregadores verificados
              </span>
            </div>
          </div>

          {/* CTA PADRONIZADO */}
          <div className="mt-10 flex flex-col md:flex-row gap-4">
            <Link to="/register" className={btnPrimary}>
              Solicitar entrega
              <i className="fas fa-arrow-right text-xs"></i>
            </Link>

            <Link to="/#como-funciona" className={btnSecondary}>
              Ver como funciona
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
