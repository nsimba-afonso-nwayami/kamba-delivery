import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../../assets/img/logo2.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const getDashboardLink = () => {
    switch (user?.tipo) {
      case "SOLICITANTE":
        return "/dashboard/solicitante";
      case "ENTREGADOR":
        return "/dashboard/entregador";
      case "ADMIN":
        return "/dashboard/admin";
      default:
        return "/";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Atualiza a aparência do header
      setScrolled(window.scrollY > 20);

      // Fecha o menu mobile automaticamente ao rolar a página
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  const navLinkStyles =
    "relative font-semibold text-sm tracking-wide text-red-900 hover:text-red-700 transition-colors duration-200 after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-red-700 hover:after:w-full after:transition-all after:duration-300";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-white py-4 md:py-5 border-b border-rose-200/60"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <img
            src={Logo}
            alt="Kamba Delivery"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* NAVEGAÇÃO DESKTOP & MOBILE */}
        <nav
          className={`
            absolute md:static top-full left-0 w-full md:w-auto
            bg-white md:bg-transparent
            border-b md:border-none border-rose-200
            shadow-lg md:shadow-none
            px-6 md:px-0 py-6 md:py-0
            flex flex-col md:flex-row gap-6 md:gap-8
            items-start md:items-center
            transition-all duration-300 ease-in-out
            ${
              menuOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-4 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto"
            }
          `}
        >
          <Link
            to="/"
            className={navLinkStyles}
            onClick={() => setMenuOpen(false)}
          >
            Início
          </Link>
          <HashLink
            smooth
            to="/#como-funciona"
            className={navLinkStyles}
            onClick={() => setMenuOpen(false)}
          >
            Como Funciona
          </HashLink>
          <HashLink
            smooth
            to="/#sou-solicitante"
            className={navLinkStyles}
            onClick={() => setMenuOpen(false)}
          >
            Solicitante
          </HashLink>
          <HashLink
            smooth
            to="/#sou-entregador"
            className={navLinkStyles}
            onClick={() => setMenuOpen(false)}
          >
            Entregador
          </HashLink>

          {/* BOTÕES DESLOGADO (DENTRO DO DROPDOWN NO MOBILE) */}
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-none border-rose-200">
              <Link
                to="/login"
                className="border border-rose-500 text-red-700 px-5 py-2 rounded-xl font-semibold text-sm hover:bg-rose-200/60 transition-all flex items-center justify-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <i className="far fa-user text-rose-500"></i>
                <span>Entrar</span>
              </Link>

              <Link
                to="/register"
                className="bg-red-700 text-white px-6 py-2 rounded-xl font-semibold text-sm shadow-md shadow-red-700/20 hover:bg-red-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <span>Cadastrar</span>
                <i className="fas fa-arrow-right text-xs"></i>
              </Link>
            </div>
          )}
        </nav>

        {/* ÁREA DA DIREITA: USUÁRIO LOGADO + HAMBÚRGUER */}
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <div className="flex items-center gap-2 bg-rose-200/40 p-1.5 rounded-xl border border-rose-200">
              <Link
                to={getDashboardLink()}
                className="flex items-center gap-2 text-red-700 px-3 py-1.5 rounded-lg hover:bg-white transition-all font-semibold text-sm shadow-xs"
                title="Ir para o Painel"
              >
                <i className="fas fa-gauge-high text-rose-500"></i>
                <span className="hidden sm:inline">Painel</span>
              </Link>
              <button
                onClick={logout}
                className="text-red-700 hover:text-red-900 w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all cursor-pointer"
                title="Sair da conta"
              >
                <i className="fas fa-right-from-bracket text-sm"></i>
              </button>
            </div>
          )}

          {/* BOTÃO HAMBÚRGUER (MOBILE) */}
          <button
            className="md:hidden text-red-700 p-2 hover:bg-rose-200/60 rounded-xl transition text-xl flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Alternar menu"
          >
            <i
              className={menuOpen ? "fas fa-times" : "fas fa-bars-staggered"}
            ></i>
          </button>
        </div>
      </div>
    </header>
  );
}
