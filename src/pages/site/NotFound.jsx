import { Link } from "react-router-dom";

export default function NotFound() {
  // Padronização dos botões para o estilo limpo do projeto
  const btnPrimary =
    "bg-red-700 text-white px-6 py-3.5 rounded-xl font-bold text-center hover:bg-red-800 transition-all duration-200 active:scale-98 inline-flex items-center justify-center gap-2.5 cursor-pointer text-sm shadow-sm";

  const btnOutline =
    "bg-white border border-gray-300 text-gray-700 px-6 py-3.5 rounded-xl font-bold text-center hover:bg-gray-50 transition-all duration-200 active:scale-98 inline-flex items-center justify-center gap-2 text-sm";

  return (
    <>
      <title>Página não encontrada | Kamba Delivery</title>

      <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-20">
        <div className="max-w-md w-full bg-white border border-gray-200/80 rounded-2xl p-8 sm:p-12 shadow-sm text-center">
          {/* BADGE / ÍCONE DE ERRO */}
          <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 text-red-700 flex items-center justify-center text-2xl mx-auto mb-6 shrink-0">
            <i className="fas fa-truck-fast"></i>
          </div>

          {/* CÓDIGO DE ERRO */}
          <span className="text-xs font-bold tracking-widest text-red-700 uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Erro 404
          </span>

          {/* TEXTOS */}
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Página não encontrada
          </h1>

          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            A página que você está tentando acessar não existe, foi movida ou a
            rota inserida está incorreta.
          </p>

          {/* BOTÕES PADRONIZADOS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className={btnPrimary}>
              <i className="fas fa-arrow-left text-xs"></i>
              <span>Voltar ao início</span>
            </Link>

            <Link to="/register" className={btnOutline}>
              <span>Criar conta</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
