import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validations/loginSchema";
import { loginUser } from "../../services/authService";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const btnPrimary =
    "w-full bg-red-700 text-white py-4 rounded-xl font-bold text-center shadow-lg shadow-red-700/20 hover:bg-red-800 transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      console.log("LOGIN RESPONSE:", response);

      const { access, refresh } = response;

      // limpar storage antes de salvar novos dados
      localStorage.clear();

      // salvar tokens e dados do usuário
      localStorage.setItem("access_token", response.access);
      localStorage.setItem("refresh_token", response.refresh);
      localStorage.setItem("user_id", response.id);
      localStorage.setItem("tipo", response.tipo);

      toast.success("Login efetuado com sucesso");

      const tipo = response?.tipo;

      if (response.tipo === "SOLICITANTE") {
        navigate("/dashboard/solicitante", { replace: true });
      } else if (response.tipo === "ENTREGADOR") {
        navigate("/dashboard/entregador", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

    } catch (error) {
      console.log("=== LOGIN ERROR ===");
      console.log(error);

      toast.error(
        error.response?.data?.detail || "Erro ao fazer login"
      );
    }
  };

  return (
    <>
      <title>Entrar | Kamba Delivery</title>

      <section className="py-24 bg-gray-50 px-6 flex justify-center items-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-10 relative border border-gray-100">

          {/* LOGO */}
          <div className="flex justify-center mb-8">
            <div className="bg-red-700 text-white p-2.5 rounded-lg text-xl shadow-lg shadow-red-700/20">
              <i className="fas fa-truck-fast"></i>
            </div>
          </div>

          {/* HEADER */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Bem-vindo de volta
            </h1>
            <p className="mt-2 text-gray-500 text-sm font-medium">
              Entre na sua conta para continuar
            </p>
          </div>

          {/* FORM */}
          <form
            className="mt-10 space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Email
              </label>

              <input
                {...register("email")}
                type="email"
                placeholder="exemplo@email.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all focus:border-red-700 bg-gray-50/50"
              />

              <p className="text-red-500 text-xs">
                {errors.email?.message}
              </p>
            </div>

            {/* SENHA */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-gray-700">
                  Senha
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-bold text-red-700 hover:text-red-900"
                >
                  Esqueci minha senha
                </Link>
              </div>

              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all focus:border-red-700 bg-gray-50/50"
              />

              <p className="text-red-500 text-xs">
                {errors.password?.message}
              </p>
            </div>

            {/* BOTÃO */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={btnPrimary}
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
            </div>
          </form>

          {/* DIVISOR */}
          <div className="my-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100"></div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              ou
            </span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          {/* LINK REGISTO */}
          <p className="text-center text-sm text-gray-500 font-medium">
            Ainda não tens conta?{" "}
            <Link
              to="/register"
              className="text-red-700 font-bold hover:underline underline-offset-4 transition-all"
            >
              Criar conta
            </Link>
          </p>

        </div>
      </section>
    </>
  );
}
