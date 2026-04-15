import { Link, useLocation } from "react-router-dom";

export default function SidebarEntregador({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm";

  const normalStyle = "text-rose-100/70 hover:text-white hover:bg-red-800/50";
  const activeStyle = "bg-red-800 text-white shadow-lg shadow-black/10";

  return (
    <>
      <aside
        className={`
          bg-red-900 border-r border-red-800/50
          w-64 fixed top-0 left-0 h-screen
          transition-transform duration-300 overflow-y-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}
          md:translate-x-0
          z-50 flex flex-col
          p-6
        `}
      >
        {/* CLOSE MOBILE */}
        <button
          className="md:hidden absolute top-4 right-4 text-2xl text-rose-200 hover:text-white transition"
          onClick={() => setSidebarOpen(false)}
        >
          <i className="fas fa-times"></i>
        </button>

        {/* LOGO */}
        <div className="mb-10 pt-2">
          <Link
            to="/dashboard/entregador"
            className="text-xl font-black tracking-tight flex items-center gap-2"
          >
            <div className="bg-white text-red-900 p-1.5 rounded-lg shadow-md">
              <i className="fas fa-truck-fast"></i>
            </div>
            <span className="text-white">
              Kamba<span className="text-rose-400">Delivery</span>
            </span>
          </Link>

          <p className="text-[10px] text-rose-300/50 mt-4 uppercase font-black tracking-[0.2em]">
            Painel do entregador
          </p>
        </div>

        {/* NAV */}
        <nav className="space-y-2 flex-1">
          <Link
            to="/dashboard/entregador"
            className={`${linkStyle} ${
              isActive("/dashboard/entregador") ? activeStyle : normalStyle
            }`}
          >
            <i
              className={`fas fa-gauge-high ${
                isActive("/dashboard/entregador")
                  ? "text-white"
                  : "text-rose-400"
              }`}
            ></i>
            Dashboard
          </Link>

          <Link
            to="/dashboard/entregador/entregas"
            className={`${linkStyle} ${
              isActive("/dashboard/entregador/entregas")
                ? activeStyle
                : normalStyle
            }`}
          >
            <i
              className={`fas fa-motorcycle ${
                isActive("/dashboard/entregador/entregas")
                  ? "text-white"
                  : "text-rose-400"
              }`}
            ></i>
            Entregas
          </Link>

          <Link
            to="/dashboard/entregador/historico"
            className={`${linkStyle} ${
              isActive("/dashboard/entregador/historico")
                ? activeStyle
                : normalStyle
            }`}
          >
            <i
              className={`fas fa-clock-rotate-left ${
                isActive("/dashboard/entregador/historico")
                  ? "text-white"
                  : "text-rose-400"
              }`}
            ></i>
            Histórico
          </Link>

          <Link
            to="/dashboard/entregador/configuracoes"
            className={`${linkStyle} ${
              isActive("/dashboard/entregador/configuracoes")
                ? activeStyle
                : normalStyle
            }`}
          >
            <i
              className={`fas fa-user-gear ${
                isActive("/dashboard/entregador/configuracoes")
                  ? "text-white"
                  : "text-rose-400"
              }`}
            ></i>
            Perfil & Conta
          </Link>
        </nav>

        {/* LOGOUT */}
        <div className="pt-6 border-t border-red-800/50">
          <button className="flex items-center gap-3 cursor-pointer w-full px-4 py-3 rounded-xl text-rose-200/60 hover:text-white hover:bg-red-600 transition-all font-bold text-sm group">
            <i className="fas fa-arrow-right-from-bracket group-hover:translate-x-1 transition-transform"></i>
            Sair da conta
          </button>
        </div>
      </aside>

      {/* OVERLAY MOBILE */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
