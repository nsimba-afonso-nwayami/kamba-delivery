import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function CompleteSolicitante() {
  // Estados para os previews
  const [photoPreview, setPhotoPreview] = useState(null);
  const [biFrentePreview, setBiFrentePreview] = useState(null);
  const [biVersoPreview, setBiVersoPreview] = useState(null);

  // Referências para os inputs ocultos
  const fileInputRef = useRef(null);
  const biFrenteRef = useRef(null);
  const biVersoRef = useRef(null);

  // Função genérica para lidar com a seleção de arquivos
  const handleFileChange = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const btnPrimary = "w-full bg-red-700 text-white py-4 rounded-xl font-bold text-center shadow-lg shadow-red-700/20 hover:bg-red-800 transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2";
  
  const uploadBtnBI = "w-full h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-red-700 hover:text-red-700 transition-all font-bold text-xs bg-gray-50/30 group";

  return (
    <>
      <title>Completar cadastro | Solicitante</title>

      <section className="min-h-screen py-24 bg-gray-50 px-6 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-10 md:p-14 relative border border-gray-100">

          {/* LOGO */}
          <div className="flex justify-center mb-8">
            <div className="bg-red-700 text-white p-2.5 rounded-lg text-xl shadow-lg shadow-red-700/20">
              <i className="fas fa-truck-fast"></i>
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Complete seu cadastro
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Envie seus documentos para ativar sua conta
            </p>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>

            {/* FOTO DO ROSTO COM PREVIEW */}
            <div className="bg-gray-50/30 p-8 rounded-2xl border-2 border-dashed border-gray-200 text-center">
              <label className="text-sm font-bold text-gray-700 block mb-4">Foto do rosto</label>
              <input type="file" ref={fileInputRef} accept="image/*" capture="user" className="hidden" onChange={(e) => handleFileChange(e, setPhotoPreview)} />

              {!photoPreview ? (
                <button type="button" onClick={() => fileInputRef.current.click()} className="mx-auto flex flex-col items-center gap-3 text-red-700 hover:text-red-900 transition-colors group">
                  <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center group-hover:bg-red-100 transition-all">
                    <i className="fas fa-camera text-2xl"></i>
                  </div>
                  <span className="font-bold text-sm">Tirar ou carregar foto</span>
                </button>
              ) : (
                <div className="relative inline-block">
                  <img src={photoPreview} alt="Rosto" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mx-auto" />
                  <button type="button" onClick={() => setPhotoPreview(null)} className="absolute -top-2 -right-2 bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-red-900"><i className="fas fa-times text-xs"></i></button>
                </div>
              )}
            </div>

            {/* BI GRID COM PREVIEWS */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* BI FRENTE */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">BI (Frente)</label>
                <input type="file" ref={biFrenteRef} accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, setBiFrentePreview)} />
                
                {!biFrentePreview ? (
                  <button type="button" onClick={() => biFrenteRef.current.click()} className={uploadBtnBI}>
                    <i className="fas fa-id-card text-xl group-hover:scale-110 transition-transform"></i>
                    Carregar Frente
                  </button>
                ) : (
                  <div className="relative h-32 w-full">
                    <img src={biFrentePreview} alt="BI Frente" className="w-full h-full object-cover rounded-xl border border-gray-200 shadow-sm" />
                    <button type="button" onClick={() => setBiFrentePreview(null)} className="absolute -top-2 -right-2 bg-red-700 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md hover:bg-red-900"><i className="fas fa-times text-[10px]"></i></button>
                  </div>
                )}
              </div>

              {/* BI VERSO */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">BI (Verso)</label>
                <input type="file" ref={biVersoRef} accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, setBiVersoPreview)} />
                
                {!biVersoPreview ? (
                  <button type="button" onClick={() => biVersoRef.current.click()} className={uploadBtnBI}>
                    <i className="fas fa-id-card text-xl group-hover:scale-110 transition-transform"></i>
                    Carregar Verso
                  </button>
                ) : (
                  <div className="relative h-32 w-full">
                    <img src={biVersoPreview} alt="BI Verso" className="w-full h-full object-cover rounded-xl border border-gray-200 shadow-sm" />
                    <button type="button" onClick={() => setBiVersoPreview(null)} className="absolute -top-2 -right-2 bg-red-700 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md hover:bg-red-900"><i className="fas fa-times text-[10px]"></i></button>
                  </div>
                )}
              </div>

            </div>

            {/* MORADA */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Morada de residência</label>
              <div className="relative">
                <i className="fas fa-map-marker-alt absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input type="text" placeholder="Província, Município, Bairro e Rua" className="w-full pl-11 pr-4 py-4 border border-gray-200 rounded-xl bg-gray-50/50 focus:border-red-700 outline-none transition-all font-medium" />
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" className={btnPrimary}>
                Finalizar Cadastro
                <i className="fas fa-check-circle text-sm opacity-70"></i>
              </button>
            </div>
          </form>

          <div className="text-center mt-8">
            <Link to="/register" className="text-sm font-bold text-gray-400 hover:text-red-700 transition-colors flex items-center justify-center gap-2">
              <i className="fas fa-arrow-left text-[10px]"></i> Voltar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
