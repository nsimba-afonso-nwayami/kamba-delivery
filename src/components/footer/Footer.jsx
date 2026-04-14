import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const linkStyles = "text-rose-200/80 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2";
  const titleStyles = "text-white font-bold uppercase text-xs tracking-[0.15em] mb-6";

  return (
    <footer className="bg-red-900 text-white border-t-4 border-red-700">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        
        <div className="grid gap-12 md:grid-cols-12 mb-16">
          
          {/* LOGO + DESCRIÇÃO */}
          <div className="md:col-span-5">
            <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 mb-6">
              <div className="bg-white text-red-900 p-1.5 rounded-lg">
                <i className="fas fa-truck-fast"></i>
              </div>
              <span>Kamba<span className="text-rose-500">Delivery</span></span>
            </Link>
            <p className="text-rose-200/70 leading-relaxed max-w-sm text-[15px]">
              A plataforma líder em logística urbana em Luanda. 
              Conectando o comércio local a entregadores eficientes com 
              tecnologia de ponta e segurança garantida.
            </p>
            
            {/* BADGES DE APP */}
            <div className="flex flex-wrap gap-3 mt-8">
               <div className="flex items-center gap-2 bg-red-950/50 border border-red-700 px-4 py-2 rounded-xl cursor-pointer hover:bg-red-800 transition">
                  <i className="fab fa-apple text-xl"></i>
                  <div className="text-[10px] leading-tight text-rose-100">Baixar na <br/><span className="text-xs font-bold">App Store</span></div>
               </div>
               <div className="flex items-center gap-2 bg-red-950/50 border border-red-700 px-4 py-2 rounded-xl cursor-pointer hover:bg-red-800 transition">
                  <i className="fab fa-google-play text-lg"></i>
                  <div className="text-[10px] leading-tight text-rose-100">Disponível no <br/><span className="text-xs font-bold">Google Play</span></div>
               </div>
            </div>
          </div>

          {/* NAVEGAÇÃO - Removido ul/li */}
          <div className="md:col-span-2">
            <h3 className={titleStyles}>Navegação</h3>
            <div className="flex flex-col gap-4 text-[14px]">
              <Link to="/" className={linkStyles}>Início</Link>
              <HashLink smooth to="/#como-funciona" className={linkStyles}>Como funciona</HashLink>
              <HashLink smooth to="/#sou-solicitante" className={linkStyles}>Sou solicitante</HashLink>
              <HashLink smooth to="/#sou-entregador" className={linkStyles}>Sou entregador</HashLink>
            </div>
          </div>

          {/* CONTA - Removido ul/li */}
          <div className="md:col-span-2">
            <h3 className={titleStyles}>Conta</h3>
            <div className="flex flex-col gap-4 text-[14px]">
              <Link to="/login" className={linkStyles}>Aceder Conta</Link>
              <Link to="/register" className={linkStyles}>Criar Registo</Link>
              <Link to="/ajuda" className={linkStyles}>Centro de Ajuda</Link>
            </div>
          </div>

          {/* REDES & SUPORTE */}
          <div className="md:col-span-3">
            <h3 className={titleStyles}>Conecte-se</h3>
            <div className="flex gap-3 mb-8">
              {[
                { icon: 'fa-facebook-f', link: '#' },
                { icon: 'fa-instagram', link: '#' },
                { icon: 'fa-linkedin-in', link: '#' },
                { icon: 'fa-whatsapp', link: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-red-800 border border-red-700 hover:bg-red-700 hover:-translate-y-1 transition-all duration-300"
                >
                  <i className={`fab ${social.icon} text-white`}></i>
                </a>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-rose-200">
                <i className="fas fa-phone text-rose-500 w-5"></i>
                <span className="text-sm font-medium">+244 900 000 000</span>
              </div>
              <div className="flex items-center gap-3 text-rose-200">
                <i className="fas fa-envelope text-rose-500 w-5"></i>
                <span className="text-sm font-medium">suporte@kamba.ao</span>
              </div>
            </div>
          </div>

        </div>

        {/* BASE */}
        <div className="pt-8 border-t border-red-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-rose-200/50 uppercase tracking-widest text-center md:text-left">
          <p>
            &copy; {currentYear} Kamba Delivery. Desenvolvido com <i className="fas fa-heart text-red-600 mx-1"></i> em Luanda.
          </p>
          <div className="flex gap-6">
            <Link to="/termos" className="hover:text-white transition">Termos de Uso</Link>
            <Link to="/privacidade" className="hover:text-white transition">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
