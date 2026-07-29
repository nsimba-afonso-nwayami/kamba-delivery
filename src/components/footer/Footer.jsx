import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const linkStyles =
    "text-rose-200/80 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 text-sm";
  const titleStyles =
    "text-white font-bold uppercase text-xs tracking-wider mb-5 flex items-center gap-2";

  return (
    <footer className="bg-red-900 text-white border-t-4 border-red-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid gap-10 md:grid-cols-12 mb-12">
          {/* LOGO + DESCRIÇÃO */}
          <div className="md:col-span-5">
            <Link
              to="/"
              className="text-2xl font-black tracking-tight flex items-center gap-2.5 mb-4 group w-fit"
            >
              <div className="bg-white text-red-900 p-2 rounded-xl shadow-xs transition-transform group-hover:scale-105">
                <i className="fas fa-truck-fast"></i>
              </div>
              <span>
                Kamba<span className="text-rose-500">Delivery</span>
              </span>
            </Link>

            <p className="text-rose-200/80 leading-relaxed max-w-sm text-sm mb-6">
              A plataforma líder em logística urbana em Luanda. Conectando o
              comércio local a entregadores eficientes com tecnologia de ponta e
              segurança garantida.
            </p>

            {/* BADGES DE APP */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="flex items-center gap-3 bg-white/5 border border-rose-500/30 px-4 py-2.5 rounded-xl hover:bg-red-700 hover:border-red-700 transition-all duration-300 group"
              >
                <i className="fab fa-apple text-2xl text-rose-200 group-hover:text-white transition-colors"></i>
                <div className="text-[10px] leading-tight text-rose-200/90 group-hover:text-white transition-colors">
                  Baixar na <br />
                  <span className="text-xs font-bold text-white">
                    App Store
                  </span>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 bg-white/5 border border-rose-500/30 px-4 py-2.5 rounded-xl hover:bg-red-700 hover:border-red-700 transition-all duration-300 group"
              >
                <i className="fab fa-google-play text-xl text-rose-200 group-hover:text-white transition-colors"></i>
                <div className="text-[10px] leading-tight text-rose-200/90 group-hover:text-white transition-colors">
                  Disponível no <br />
                  <span className="text-xs font-bold text-white">
                    Google Play
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* NAVEGAÇÃO */}
          <div className="md:col-span-2">
            <h3 className={titleStyles}>
              Navegação
            </h3>
            <nav className="flex flex-col gap-3">
              <Link to="/" className={linkStyles}>
                Início
              </Link>
              <HashLink smooth to="/#como-funciona" className={linkStyles}>
                Como funciona
              </HashLink>
              <HashLink smooth to="/#sou-solicitante" className={linkStyles}>
                Sou solicitante
              </HashLink>
              <HashLink smooth to="/#sou-entregador" className={linkStyles}>
                Sou entregador
              </HashLink>
            </nav>
          </div>

          {/* CONTA */}
          <div className="md:col-span-2">
            <h3 className={titleStyles}>
              Conta
            </h3>
            <nav className="flex flex-col gap-3">
              <Link to="/login" className={linkStyles}>
                Aceder Conta
              </Link>
              <Link to="/register" className={linkStyles}>
                Criar Registo
              </Link>
              <Link to="/ajuda" className={linkStyles}>
                Centro de Ajuda
              </Link>
            </nav>
          </div>

          {/* REDES & SUPORTE */}
          <div className="md:col-span-3">
            <h3 className={titleStyles}>
              Conecte-se
            </h3>

            <div className="flex gap-2.5 mb-6">
              {[
                { icon: "fa-facebook-f", link: "#", label: "Facebook" },
                { icon: "fa-instagram", link: "#", label: "Instagram" },
                { icon: "fa-linkedin-in", link: "#", label: "LinkedIn" },
                { icon: "fa-whatsapp", link: "#", label: "WhatsApp" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-rose-500/30 hover:bg-red-700 hover:border-red-700 hover:-translate-y-1 transition-all duration-200"
                >
                  <i
                    className={`fab ${social.icon} text-rose-200 hover:text-white text-sm`}
                  ></i>
                </a>
              ))}
            </div>

            <div className="space-y-3 pt-1">
              <a
                href="tel:+244900000000"
                className="flex items-center gap-3 text-rose-200/90 hover:text-white transition-colors text-sm group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-rose-500/20 flex items-center justify-center text-rose-500 group-hover:bg-red-700 group-hover:text-white transition-all">
                  <i className="fas fa-phone text-xs"></i>
                </div>
                <span className="font-medium">+244 900 000 000</span>
              </a>

              <a
                href="mailto:suporte@kamba.ao"
                className="flex items-center gap-3 text-rose-200/90 hover:text-white transition-colors text-sm group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-rose-500/20 flex items-center justify-center text-rose-500 group-hover:bg-red-700 group-hover:text-white transition-all">
                  <i className="fas fa-envelope text-xs"></i>
                </div>
                <span className="font-medium">suporte@kamba.ao</span>
              </a>
            </div>
          </div>
        </div>

        {/* BASE / COPYRIGHT */}
        <div className="pt-8 border-t border-rose-500/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-rose-200/60 uppercase tracking-widest text-center md:text-left">
          <p>
            &copy; {currentYear} Kamba Delivery. Desenvolvido com{" "}
            <i className="fas fa-heart text-rose-500 mx-0.5"></i> em Luanda.
          </p>
          <div className="flex gap-6">
            <Link to="/termos" className="hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <Link
              to="/privacidade"
              className="hover:text-white transition-colors"
            >
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
