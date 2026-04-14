import { Link, useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();

  const btnPrimary =
    "w-full bg-red-700 text-white py-4 rounded-xl font-bold text-center shadow-lg shadow-red-700/20 hover:bg-red-800 transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2";

  return (
    <>
      <title>Redefinir senha | Kamba Delivery</title>

      <section className="py-24 bg-gray-50 px-6 flex justify-center items-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-10 border border-gray-100">

          {/* LOGO */}
          <div className="flex justify-center mb-8">
            <div className="bg-red-700 text-white p-2.5 rounded-lg text-xl shadow-lg shadow-red-700/20">
              <i className="fas fa-truck-fast"></i>
            </div>
          </div>

          {/* HEADER */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Redefinir senha
            </h1>
            <p className="mt-2 text-gray-500 text-sm font-medium">
              Crie uma nova senha segura para sua conta
            </p>
          </div>

          {/* FORM */}
          <form className="mt-10 space-y-5" onSubmit={(e) => e.preventDefault()}>

            {/* NOVA SENHA */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Nova senha
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all focus:border-red-700 bg-gray-50/50"
              />
            </div>

            {/* CONFIRMAR SENHA */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Confirmar senha
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all focus:border-red-700 bg-gray-50/50"
              />
            </div>

            {/* BOTÃO */}
            <div className="pt-2">
              <button type="submit" className={btnPrimary}>
                Atualizar senha
                <i className="fas fa-lock text-sm opacity-70"></i>
              </button>
            </div>

          </form>

          {/* DIVISOR */}
          <div className="my-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100"></div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              seguro
            </span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          {/* VOLTAR */}
          <p className="text-center text-sm text-gray-500 font-medium">
            Lembrou da senha?{" "}
            <Link
              to="/login"
              className="text-red-700 font-bold hover:underline underline-offset-4 transition-all"
            >
              Voltar ao login
            </Link>
          </p>

          {/* TOKEN (opcional debug) */}
          <p className="text-[10px] text-gray-300 text-center mt-6">
            token: {token}
          </p>

        </div>
      </section>
    </>
  );
}
