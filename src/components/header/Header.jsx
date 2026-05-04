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
      case "SOLICITANTE": return "/dashboard/solicitante";
      case "ENTREGADOR": return "/dashboard/entregador";
      case "ADMIN": return "/dashboard/admin";
      default: return "/";
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyles = "relative text-red-900 font-semibold uppercase text-[13px] tracking-widest hover:text-red-700 transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-red-700 hover:after:w-full after:transition-all";

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-lg py-3" : "bg-white py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Kamba Delivery" className="h-22 md:h-20 w-auto object-contain" />
        </Link>

        {/* ÁREA DE NAVEGAÇÃO E AÇÕES */}
        <div className="flex items-center gap-6">
          
          {/* MENU PRINCIPAL */}
          <nav
            className={`
              absolute md:static top-full left-0 w-full md:w-auto
              bg-white md:bg-transparent
              border-b md:border-none border-rose-200
              px-6 md:px-0 py-10 md:py-0
              flex flex-col md:flex-row gap-8 md:gap-10
              items-start md:items-center
              transition-all duration-500 ease-in-out
              ${menuOpen 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 -translate-y-10 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto"}
            `}
          >
            <Link to="/" className={navLinkStyles} onClick={() => setMenuOpen(false)}>Início</Link>
            <HashLink smooth to="/#como-funciona" className={navLinkStyles} onClick={() => setMenuOpen(false)}>Como Funciona</HashLink>
            <HashLink smooth to="/#sou-solicitante" className={navLinkStyles} onClick={() => setMenuOpen(false)}>Solicitante</HashLink>
            <HashLink smooth to="/#sou-entregador" className={navLinkStyles} onClick={() => setMenuOpen(false)}>Entregador</HashLink>

            {/* BOTÕES DE LOGIN/CADASTRO - Só aparecem se NÃO estiver logado */}
            {!isAuthenticated && (
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto mt-4 md:mt-0 pt-6 md:pt-0 border-t md:border-none border-rose-200">
                <Link
                  to="/login"
                  className="border-2 border-rose-500 text-red-700 px-7 py-2.5 rounded-xl font-bold text-center hover:bg-rose-200 transition-all flex items-center justify-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="far fa-user"></i>
                  Entrar
                </Link>

                <Link
                  to="/register"
                  className="bg-red-700 text-white px-8 py-2.5 rounded-xl font-bold text-center shadow-lg shadow-red-700/20 hover:bg-red-900 transition-all active:scale-95 flex items-center justify-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>Cadastrar</span>
                  <i className="fas fa-arrow-right text-xs"></i>
                </Link>
              </div>
            )}
          </nav>

          {/* ÍCONES DE AÇÃO RÁPIDA (DASHBOARD/LOGOUT) - Aparecem à direita se logado */}
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <div className="flex items-center gap-1 sm:gap-2">
                <Link
                  to={getDashboardLink()}
                  className="text-red-700 w-10 h-10 flex items-center justify-center hover:bg-rose-100 rounded-lg transition-all"
                  title="Dashboard"
                >
                  <i className="fas fa-gauge-high text-xl"></i>
                </Link>
                <button
                  onClick={logout}
                  className="text-red-700 w-10 h-10 flex items-center justify-center hover:bg-rose-100 rounded-lg transition-all cursor-pointer"
                  title="Sair"
                >
                  <i className="fas fa-right-from-bracket text-xl"></i>
                </button>
              </div>
            )}

            {/* BOTÃO MOBILE HAMBÚRGUER */}
            <button
              className="md:hidden text-2xl text-red-700 p-2 hover:bg-rose-200 rounded-lg transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className={menuOpen ? "fas fa-times" : "fas fa-bars-staggered"}></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}