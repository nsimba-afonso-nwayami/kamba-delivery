import { useState } from "react";
import EntregadorLayout from "./components/EntregadorLayout";

export default function ConfigEntregador() {
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);

  const labelStyle = "text-xs font-bold text-gray-400 uppercase tracking-widest ml-1";
  const inputStyle = "w-full mt-2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-red-700 focus:ring-4 focus:ring-red-700/5 outline-none transition-all text-sm font-medium text-gray-700";
  const buttonStyle = "px-8 py-3.5 cursor-pointer bg-red-700 text-white rounded-2xl font-bold shadow-lg shadow-red-700/20 hover:bg-red-800 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70";

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setLoadingProfile(true);
    setTimeout(() => setLoadingProfile(false), 1500);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setLoadingPass(true);
    setTimeout(() => setLoadingPass(false), 1500);
  };

  return (
    <>
      <title>Configurações | Kamba Delivery</title>
      <EntregadorLayout title="Configurações">
        <div className="space-y-6">
          
          {/* HEADER */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Configurações da Conta</h2>
            <p className="text-sm text-gray-500 font-medium">Gerencie suas informações de acesso e preferências</p>
          </div>

          <div className="space-y-8">
            
            {/* FORMULÁRIO 1: DADOS PESSOAIS */}
            <section className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
                <div className="w-10 h-10 bg-red-50 text-red-700 rounded-xl flex items-center justify-center">
                  <i className="fas fa-user-edit text-sm"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Dados do Perfil</h3>
                  <p className="text-xs text-gray-400 font-medium">Atualize seu nome e informações de contato</p>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile}>
                <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                  {/* FOTO */}
                  <div className="relative group mx-auto md:mx-0">
                    <div className="w-28 h-28 rounded-3xl bg-gray-100 border-4 border-white shadow-xl overflow-hidden">
                      <img 
                        src="https://i.pravatar.cc/150?u=kamba" 
                        alt="Perfil" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button type="button" className="absolute -bottom-2 -right-2 w-10 h-10 bg-white shadow-lg border border-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:text-red-700 transition-all">
                      <i className="fas fa-camera text-sm"></i>
                    </button>
                  </div>

                  {/* CAMPOS */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    <div className="md:col-span-2">
                      <label className={labelStyle}>Nome Completo</label>
                      <input type="text" defaultValue="Cláudio Kamba" className={inputStyle} />
                    </div>
                    <div>
                      <label className={labelStyle}>E-mail</label>
                      <input type="email" defaultValue="claudio@exemplo.com" className={inputStyle} />
                    </div>
                    <div>
                      <label className={labelStyle}>Telefone (WhatsApp)</label>
                      <input type="text" defaultValue="+244 9XX XXX XXX" className={inputStyle} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-50">
                  <button type="submit" disabled={loadingProfile} className={buttonStyle}>
                    {loadingProfile ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-check"></i>}
                    {loadingProfile ? "Atualizando..." : "Atualizar Dados"}
                  </button>
                </div>
              </form>
            </section>

            {/* FORMULÁRIO 2: SEGURANÇA / SENHA */}
            <section className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                  <i className="fas fa-lock text-sm"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Alterar Senha</h3>
                  <p className="text-xs text-gray-400 font-medium">Mantenha sua conta segura com uma senha forte</p>
                </div>
              </div>

              <form onSubmit={handleUpdatePassword}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                  <div>
                    <label className={labelStyle}>Senha Atual</label>
                    <input type="password" placeholder="••••••••" className={inputStyle} />
                  </div>
                  <div>
                    <label className={labelStyle}>Nova Senha</label>
                    <input type="password" placeholder="••••••••" className={inputStyle} />
                  </div>
                  <div>
                    <label className={labelStyle}>Confirmar Nova Senha</label>
                    <input type="password" placeholder="••••••••" className={inputStyle} />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-50">
                  <button type="submit" disabled={loadingPass} className="px-8 py-3.5 cursor-pointer bg-gray-900 text-white rounded-2xl font-bold shadow-lg shadow-gray-200 hover:bg-red-700 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70">
                    {loadingPass ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-shield-alt"></i>}
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
      </EntregadorLayout>
    </>
  );
}
