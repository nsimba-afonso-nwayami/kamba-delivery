import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { entregadorSchema } from "../../validations/entregadorSchema";
import { createEntregador } from "../../services/entregadorService";
import toast from "react-hot-toast";

export default function CompleteEntregador() {
  const navigate = useNavigate();

  // Estados para os previews
  const [photoPreview, setPhotoPreview] = useState(null);
  const [biFrentePreview, setBiFrentePreview] = useState(null);
  const [biVersoPreview, setBiVersoPreview] = useState(null);
  const [cartaPreview, setCartaPreview] = useState(null);

  // Referências para os inputs ocultos
  const fileRef = useRef(null);
  const biFrenteRef = useRef(null);
  const biVersoRef = useRef(null);
  const cartaRef = useRef(null);

  const btnPrimary =
    "w-full bg-red-700 text-white py-4 rounded-xl font-bold text-center shadow-lg shadow-red-700/20 hover:bg-red-800 transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2";

  const uploadBtnStyle =
    "w-full h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-red-700 hover:text-red-700 transition-all font-bold text-xs bg-gray-50/30 group";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(entregadorSchema),
  });

  // FILE HANDLER (sem mexer no layout)
  const handleFileChange = (e, field, setPreview) => {
    const file = e.target.files[0];
    if (!file) return;

    setValue(field, file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    try {
      const userId = localStorage.getItem("user_id");

      const formData = new FormData();
      formData.append("foto_rosto", data.foto_rosto);
      formData.append("doc_frente", data.doc_frente);
      formData.append("doc_verso", data.doc_verso);
      formData.append("carta_conducao", data.carta_conducao);
      formData.append("matricula_veiculo", data.matricula_veiculo)
      formData.append("usuario", userId);

      await createEntregador(formData);

      toast.success("Cadastro de entregador finalizado!");
      navigate("/login");
    } catch (error) {
      console.log("=== ERRO ENTREGADOR ===");

      console.log("ERROR:", error);

      if (error.response) {
        console.log("STATUS:", error.response.status);
        console.log("DATA:", JSON.stringify(error.response.data, null, 2));
        console.log("HEADERS:", error.response.headers);
      }

      if (error.request) {
        console.log("REQUEST:", error.request);
      }

      console.log("MESSAGE:", error.message);

      toast.error("Erro ao finalizar cadastro");
    }
  };

  return (
    <>
      <title>Completar cadastro | Entregador</title>

      <section className="min-h-screen py-24 bg-gray-50 px-6 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-10 md:p-14 border border-gray-100 relative">

          {/* LOGO */}
          <div className="flex justify-center mb-8">
            <div className="bg-red-700 text-white p-2.5 rounded-lg text-xl shadow-lg shadow-red-700/20">
              <i className="fas fa-motorcycle"></i>
            </div>
          </div>

          {/* HEADER */}
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Cadastro de Entregador
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Envie seus documentos para começar a faturar
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>

            {/* FOTO DO ROSTO */}
            <div className="bg-gray-50/30 p-8 rounded-2xl border-2 border-dashed border-gray-200 text-center">
              <label className="text-sm font-bold text-gray-700 block mb-4">
                Foto do rosto
              </label>

              <input
                type="file"
                ref={fileRef}
                accept="image/*"
                capture="user"
                className="hidden"
                onChange={(e) =>
                  handleFileChange(e, "foto_rosto", setPhotoPreview)
                }
              />

              {!photoPreview ? (
                <button
                  type="button"
                  onClick={() => fileRef.current.click()}
                  className="mx-auto flex flex-col items-center gap-3 text-red-700 hover:text-red-900 transition-colors group"
                >
                  <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center group-hover:bg-red-100 transition-all">
                    <i className="fas fa-camera text-2xl"></i>
                  </div>
                  <span className="font-bold text-sm">
                    Tirar ou carregar foto
                  </span>
                </button>
              ) : (
                <div className="relative inline-block">
                  <img
                    src={photoPreview}
                    alt="Rosto"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mx-auto"
                  />
                  <button
                    type="button"
                    onClick={() => setPhotoPreview(null)}
                    className="absolute -top-2 -right-2 bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-red-900"
                  >
                    <i className="fas fa-times text-xs"></i>
                  </button>
                </div>
              )}

              <p className="text-red-500 text-xs">
                {errors.foto_rosto?.message}
              </p>
            </div>

            {/* BI + CARTA */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* BI FRENTE */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  BI (Frente)
                </label>

                <input
                  type="file"
                  ref={biFrenteRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFileChange(e, "doc_frente", setBiFrentePreview)
                  }
                />

                {!biFrentePreview ? (
                  <button
                    type="button"
                    onClick={() => biFrenteRef.current.click()}
                    className={uploadBtnStyle}
                  >
                    <i className="fas fa-id-card text-xl group-hover:scale-110 transition-transform"></i>
                    Carregar Frente
                  </button>
                ) : (
                  <div className="relative h-32 w-full">
                    <img
                      src={biFrentePreview}
                      alt="BI Frente"
                      className="w-full h-full object-cover rounded-xl border border-gray-200 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setBiFrentePreview(null)}
                      className="absolute -top-2 -right-2 bg-red-700 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md"
                    >
                      <i className="fas fa-times text-[10px]"></i>
                    </button>
                  </div>
                )}

                <p className="text-red-500 text-xs">
                  {errors.doc_frente?.message}
                </p>
              </div>

              {/* BI VERSO */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  BI (Verso)
                </label>

                <input
                  type="file"
                  ref={biVersoRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFileChange(e, "doc_verso", setBiVersoPreview)
                  }
                />

                {!biVersoPreview ? (
                  <button
                    type="button"
                    onClick={() => biVersoRef.current.click()}
                    className={uploadBtnStyle}
                  >
                    <i className="fas fa-id-card text-xl group-hover:scale-110 transition-transform"></i>
                    Carregar Verso
                  </button>
                ) : (
                  <div className="relative h-32 w-full">
                    <img
                      src={biVersoPreview}
                      alt="BI Verso"
                      className="w-full h-full object-cover rounded-xl border border-gray-200 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setBiVersoPreview(null)}
                      className="absolute -top-2 -right-2 bg-red-700 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md"
                    >
                      <i className="fas fa-times text-[10px]"></i>
                    </button>
                  </div>
                )}

                <p className="text-red-500 text-xs">
                  {errors.doc_verso?.message}
                </p>
              </div>

              {/* CARTA */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Carta de Condução
                </label>

                <input
                  type="file"
                  ref={cartaRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFileChange(e, "carta_conducao", setCartaPreview)
                  }
                />

                {!cartaPreview ? (
                  <button
                    type="button"
                    onClick={() => cartaRef.current.click()}
                    className={uploadBtnStyle}
                  >
                    <i className="fas fa-id-card-clip text-xl group-hover:scale-110 transition-transform"></i>
                    Carregar Carta de Condução
                  </button>
                ) : (
                  <div className="relative h-40 w-full">
                    <img
                      src={cartaPreview}
                      alt="Carta"
                      className="w-full h-full object-cover rounded-xl border border-gray-200 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setCartaPreview(null)}
                      className="absolute -top-2 -right-2 bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                    >
                      <i className="fas fa-times text-xs"></i>
                    </button>
                  </div>
                )}

                <p className="text-red-500 text-xs">
                  {errors.carta_conducao?.message}
                </p>
              </div>
            </div>

            {/* PLACA (NÃO ALTERADA) */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Placa do Veículo</label>
              <div className="relative">
                <i className="fas fa-car absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  {...register("matricula_veiculo")}
                  type="text"
                  placeholder="Ex: LD-12-34-HG"
                  className="w-full pl-11 pr-4 py-4 border border-gray-200 rounded-xl bg-gray-50/50 focus:border-red-700 outline-none transition-all font-medium uppercase tracking-widest"
                />
              </div>
              <p className="text-red-500 text-xs">{errors.matricula_veiculo?.message}</p>
            </div>

            {/* BOTÃO */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={btnPrimary}
              >
                {isSubmitting ? "Finalizando..." : "Finalizar Cadastro"}
                <i className="fas fa-check-circle text-sm opacity-70"></i>
              </button>
            </div>
          </form>

          <div className="text-center mt-8">
            <Link
              to="/register"
              className="text-sm font-bold text-gray-400 hover:text-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <i className="fas fa-arrow-left text-[10px]"></i> Voltar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
