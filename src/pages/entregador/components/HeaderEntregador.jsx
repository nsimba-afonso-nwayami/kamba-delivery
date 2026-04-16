import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function HeaderEntregador({ sidebarOpen, setSidebarOpen, title }) {
  const { user } = useAuth();

  // Estilo padrão para os botões de ação do header
  const actionBtnStyle = "relative w-10 h-10 cursor-pointer flex items-center justify-center rounded-xl bg-red-800 hover:bg-red-700 text-rose-100 transition-all duration-300 shadow-sm group";
  
  // Badge de notificação estilizada
  const badgeStyle = "absolute -top-1 -right-1 bg-white text-red-900 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-md border-2 border-red-900 group-hover:scale-110 transition-transform";

  return (
    <header
      className="
        bg-red-900/95 backdrop-blur-sm text-white
        border-b border-red-800/50
        fixed top-0 right-0 left-0 md:left-64
        h-20 flex items-center justify-between
        px-6
        z-30 transition-all duration-300
      "
    >
      {/* LEFT: Menu Mobile e Título */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-2xl text-rose-200 hover:text-white transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <i className="fas fa-bars-staggered"></i>
        </button>

        <div className="hidden sm:block h-8 w-px bg-red-800/50 mx-2"></div>

        <h2 className="text-lg font-bold text-white tracking-tight">
          {title}
        </h2>
      </div>

      {/* RIGHT: Ações e Perfil */}
      <div className="flex items-center gap-3 sm:gap-5">
        
        {/* MENSAGENS */}
        <Link to="/dashboard/entregador/mensagens" className={actionBtnStyle}>
          <i className="fas fa-comment-dots text-lg"></i>
          <span className={badgeStyle}>
            3
          </span>
        </Link>

        {/* NOTIFICAÇÕES */}
        <Link to="/dashboard/entregador/notificacoes" className={actionBtnStyle}>
          <i className="fas fa-bell text-lg"></i>
          <span className={badgeStyle}>
            5
          </span>
        </Link>

        {/* DIVIDER */}
        <div className="h-8 w-px bg-red-800/50 mx-1 hidden sm:block"></div>

        {/* USER INFO & AVATAR */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="text-right hidden lg:block">
            <p className="text-sm text-white font-bold leading-none">
              {user?.nome || "Usuário"}
            </p>
            <p className="text-[10px] text-rose-300/60 uppercase font-black tracking-widest mt-1">
              {user?.tipo || "Entregador"}
            </p>
          </div>

          <Link
            to="/dashboard/entregador/configuracoes"
            className="
              w-11 h-11
              cursor-pointer
              bg-white text-red-900
              rounded-xl flex items-center justify-center
              hover:bg-rose-100 hover:scale-105
              transition-all duration-300 shadow-lg shadow-black/10
              overflow-hidden border-2 border-transparent hover:border-rose-400
            "
          >
            {/* Ícone fallback, mas pronto para <img> no futuro */}
            <i className="fas fa-user-tie text-lg"></i>
          </Link>
        </div>
      </div>
    </header>
  );
}
