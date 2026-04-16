import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import SolicitanteLayout from "./components/SolicitanteLayout";
import { useAuth } from "../../contexts/AuthContext";
import { patchUsuario } from "../../services/usuariosService";
import { getSolicitante } from "../../services/solicitanteService";
import { updateUsuarioSchema } from "../../validations/updateUsuarioSchema";
import { passwordSchema } from "../../validations/passwordSchema";

export default function ConfigSolicitante() {
  const { user, setUser } = useAuth();

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);
  const [perfil, setPerfil] = useState(null);

  const labelStyle =
    "text-xs font-bold text-gray-400 uppercase tracking-widest ml-1";

  const inputStyle =
    "w-full mt-2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-red-700 focus:ring-4 focus:ring-red-700/5 outline-none transition-all text-sm font-medium text-gray-700";

  const buttonStyle =
    "px-8 py-3.5 cursor-pointer bg-red-700 text-white rounded-2xl font-bold shadow-lg shadow-red-700/20 hover:bg-red-800 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70";

  // FORM PERFIL
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateUsuarioSchema),
  });

  // FORM SENHA
  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    reset: resetPass,
    formState: { errors: passErrors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  // preencher dados automaticamente
  useEffect(() => {
    if (user) {
      reset({
        nome: user.nome || "",
        email: user.email || "",
        telefone: user.telefone || "",
      });
    }
  }, [user, reset]);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        if (!user?.solicitanteperfil?.id) return;

        const data = await getSolicitante(user.solicitanteperfil.id);

        console.log("RAW:", data?.foto_rosto);
        console.log("FORMATADO:", formatImageUrl(data?.foto_rosto));

        setPerfil(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPerfil();
  }, [user]);

  // ATUALIZAR PERFIL
  const handleUpdateProfile = async (data) => {
    if (
      data.nome === user.nome &&
      data.email === user.email &&
      data.telefone === user.telefone
    ) {
      return toast("Nenhuma alteração feita");
    }

    try {
      setLoadingProfile(true);

      const updated = await patchUsuario(user.id, data);

      setUser((prev) => ({
        ...prev,
        ...updated,
      }));

      toast.success("Dados atualizados com sucesso");
    } catch (err) {
      toast.error("Erro ao atualizar perfil");
    } finally {
      setLoadingProfile(false);
    }
  };

  // ATUALIZAR SENHA
  const handleUpdatePassword = async (data) => {
    try {
      setLoadingPass(true);

      await patchUsuario(user.id, {
        password: data.new_password,
      });

      resetPass();
      toast.success("Senha atualizada com sucesso");
    } catch (err) {
      toast.error("Erro ao atualizar senha");
    } finally {
      setLoadingPass(false);
    }
  };

  const formatImageUrl = (url) => {
    if (!url) return "";
    return url.replace("/media/", "/api/media/");
  };

  return (
    <>
      <title>Configurações | Kamba Delivery</title>

      <SolicitanteLayout title="Configurações">
        <div className="space-y-6">

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
              Configurações da Conta
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              Gerencie suas informações de acesso e preferências
            </p>
          </div>

          <div className="space-y-8">

            {/* PERFIL */}
            <section className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
                <div className="w-10 h-10 bg-red-50 text-red-700 rounded-xl flex items-center justify-center">
                  <i className="fas fa-user-edit text-sm"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Dados do Perfil</h3>
                  <p className="text-xs text-gray-400 font-medium">
                    Atualize seu nome e informações de contato
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit(handleUpdateProfile)}>
                <div className="flex flex-col md:flex-row gap-8 items-start mb-8">

                  {/* FOTO (somente leitura) */}
                  <div className="relative group mx-auto md:mx-0">
                    <div className="w-28 h-28 rounded-3xl bg-gray-100 border-4 border-white shadow-xl overflow-hidden">
                      <img
                        src={
                          perfil?.foto_rosto
                          ? formatImageUrl(perfil.foto_rosto)
                          : "https://i.pravatar.cc/150"
                        }
                        alt="Perfil"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* CAMPOS */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    <div className="md:col-span-2">
                      <label className={labelStyle}>Nome Completo</label>
                      <input
                        {...register("nome")}
                        type="text"
                        className={inputStyle}
                      />
                      <p className="text-red-500 text-xs">{errors.nome?.message}</p>
                    </div>

                    <div>
                      <label className={labelStyle}>E-mail</label>
                      <input
                        {...register("email")}
                        type="email"
                        className={inputStyle}
                      />
                      <p className="text-red-500 text-xs">{errors.email?.message}</p>
                    </div>

                    <div>
                      <label className={labelStyle}>Telefone</label>
                      <input
                        {...register("telefone")}
                        type="text"
                        className={inputStyle}
                      />
                      <p className="text-red-500 text-xs">{errors.telefone?.message}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-50">
                  <button type="submit" disabled={loadingProfile} className={buttonStyle}>
                    {loadingProfile ? (
                      <i className="fas fa-circle-notch animate-spin"></i>
                    ) : (
                      <i className="fas fa-check"></i>
                    )}
                    {loadingProfile ? "Atualizando..." : "Atualizar Dados"}
                  </button>
                </div>
              </form>
            </section>

            {/* SENHA */}
            <section className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                  <i className="fas fa-lock text-sm"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Alterar Senha</h3>
                  <p className="text-xs text-gray-400 font-medium">
                    Mantenha sua conta segura
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmitPass(handleUpdatePassword)}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                  <div>
                    <label className={labelStyle}>Senha Atual</label>
                    <input
                      {...registerPass("current_password")}
                      type="password"
                      className={inputStyle}
                    />
                    <p className="text-red-500 text-xs">
                      {passErrors.current_password?.message}
                    </p>
                  </div>

                  <div>
                    <label className={labelStyle}>Nova Senha</label>
                    <input
                      {...registerPass("new_password")}
                      type="password"
                      className={inputStyle}
                    />
                    <p className="text-red-500 text-xs">
                      {passErrors.new_password?.message}
                    </p>
                  </div>

                  <div>
                    <label className={labelStyle}>Confirmar</label>
                    <input
                      {...registerPass("confirm_password")}
                      type="password"
                      className={inputStyle}
                    />
                    <p className="text-red-500 text-xs">
                      {passErrors.confirm_password?.message}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-50">
                  <button
                    type="submit"
                    disabled={loadingPass}
                    className="px-8 py-3.5 cursor-pointer bg-gray-900 text-white rounded-2xl font-bold shadow-lg hover:bg-red-700 transition-all"
                  >
                    {loadingPass ? "Alterando..." : "Salvar Nova Senha"}
                  </button>
                </div>
              </form>
            </section>

            {/* SEÇÃO 3: PREFERÊNCIAS E CONTA */}
            <section className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <i className="fas fa-sliders text-sm"></i>
                </div>
                <h3 className="font-bold text-gray-800">Preferências do Sistema</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors group">
                  <div>
                    <p className="text-sm font-bold text-gray-700">Notificações no WhatsApp</p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">Status dos pedidos em tempo real</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-red-700" />
                </label>

                <button className="flex items-center justify-between p-4 bg-rose-50 rounded-2xl cursor-pointer hover:bg-rose-100 transition-all border border-rose-100 text-left">
                  <div>
                    <p className="text-sm font-bold text-rose-700">Excluir Conta Permanentemente</p>
                    <p className="text-[10px] text-rose-400 font-medium uppercase tracking-tight">Esta ação não pode ser desfeita</p>
                  </div>
                  <i className="fas fa-chevron-right text-rose-300"></i>
                </button>
              </div>
            </section>

          </div>
        </div>
      </SolicitanteLayout>
    </>
  );
}