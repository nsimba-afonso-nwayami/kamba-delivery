import { Link } from "react-router-dom";

export default function Register() {
  // Botão padronizado Premium (font-bold e rounded-xl)
  const btnPrimary = "w-full bg-red-700 text-white py-4 rounded-xl font-bold text-center shadow-lg shadow-red-700/20 hover:bg-red-800 transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2";

  return (
    <>
      <title>Criar conta | Kamba Delivery</title>

      <section className="min-h-screen py-24 bg-gray-50 px-6 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-10 relative border border-gray-100">

          {/* LOGO IDENTIDADE */}
          <div className="flex justify-center mb-8">
            <div className="bg-red-700 text-white p-2.5 rounded-lg text-xl shadow-lg shadow-red-700/20">
              <i className="fas fa-truck-fast"></i>
            </div>
          </div>

          {/* HEADER */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Criar conta
            </h1>
            <p className="mt-2 text-gray-500 text-sm font-medium">
              Junte-se à Kamba Delivery agora
            </p>
          </div>

          {/* FORM COM GRID PARA CAMPOS LADO A LADO */}
          <form className="mt-10 space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* NOME */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">Nome completo</label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all focus:border-red-700 bg-gray-50/50"
                />
              </div>

              {/* EMAIL */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                <input
                  type="email"
                  placeholder="exemplo@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all focus:border-red-700 bg-gray-50/50"
                />
              </div>

              {/* TELEFONE */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">Telefone</label>
                <input
                  type="tel"
                  placeholder="+244 9XX XXX XXX"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all focus:border-red-700 bg-gray-50/50"
                />
              </div>

              {/* TIPO DE USUÁRIO */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">Tipo de usuário</label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all focus:border-red-700 bg-gray-50/50 cursor-pointer"
                >
                  <option value="">Selecione seu perfil</option>
                  <option value="cliente">Cliente</option>
                  <option value="entregador">Entregador</option>
                </select>
              </div>

              {/* SENHA */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">Senha</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all focus:border-red-700 bg-gray-50/50"
                />
              </div>

              {/* CONFIRMAR SENHA */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">Confirmar senha</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all focus:border-red-700 bg-gray-50/50"
                />
              </div>

            </div>

            {/* BOTÃO REGISTO */}
            <div className="pt-4">
              <button type="submit" className={btnPrimary}>
                Criar minha conta
                <i className="fas fa-user-plus text-[10px] opacity-70"></i>
              </button>
            </div>

          </form>

          {/* DIVISOR */}
          <div className="my-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100"></div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ou</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          {/* LINK LOGIN */}
          <p className="text-center text-sm text-gray-500 font-medium">
            Já tens conta?{" "}
            <Link to="/login" className="text-red-700 font-bold hover:underline underline-offset-4 transition-all">
              Fazer login
            </Link>
          </p>

        </div>
      </section>
    </>
  );
}
