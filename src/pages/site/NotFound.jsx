import { Link } from "react-router-dom";

export default function NotFound() {
  // Padronização dos botões para o estilo do projeto
  const btnPrimary = "bg-red-700 text-white px-8 py-3 rounded-xl font-bold text-center shadow-lg shadow-red-700/20 hover:bg-red-900 transition-all duration-300 active:scale-95 cursor-pointer";
  const btnOutline = "border-2 border-red-700 text-red-700 px-8 py-3 rounded-xl font-bold text-center hover:bg-rose-50 transition-all duration-300 active:scale-95 cursor-pointer";

  return (
    <>
      <title>Página não encontrada | Kamba Delivery</title>

      <section className="h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="text-center max-w-md">

          {/* ERRO */}
          <h1 className="text-7xl font-black text-red-700">
            404
          </h1>

          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Página não encontrada
          </h2>

          <p className="mt-4 text-gray-500 text-sm leading-relaxed">
            A página que você está tentando acessar não existe ou foi movida.
          </p>

          {/* ÍCONE */}
          <div className="mt-6 text-5xl text-red-700">
            <i className="fas fa-truck-fast"></i>
          </div>

          {/* BOTÕES PADRONIZADOS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

            <Link to="/" className={btnPrimary}>
              Voltar ao início
            </Link>

            <Link to="/register" className={btnOutline}>
              Criar conta
            </Link>

          </div>

        </div>
      </section>
    </>
  );
}
