import { Link } from "react-router-dom";

export default function CentroAjuda() {
  // Padronização de botões
  const btnRed =
    "bg-red-700 text-white px-8 py-3.5 rounded-xl font-bold text-center hover:bg-red-800 transition-all duration-200 active:scale-98 inline-flex items-center justify-center gap-2.5 cursor-pointer text-sm shadow-sm";

  const btnOutline =
    "bg-white border border-gray-300 text-gray-700 px-6 py-3.5 rounded-xl font-bold text-center hover:bg-gray-50 transition-all duration-200 active:scale-98 inline-flex items-center justify-center gap-2.5 cursor-pointer text-sm";

  const btnWhatsApp =
    "bg-emerald-600 text-white px-6 py-3.5 rounded-xl font-bold text-center hover:bg-emerald-700 transition-all duration-200 active:scale-98 inline-flex items-center justify-center gap-2.5 cursor-pointer text-sm shadow-sm";

  const categorias = [
    {
      icon: "fa-user",
      title: "Para Clientes",
      desc: "Como solicitar entregas, gerenciar pagamentos e acompanhar pedidos em tempo real.",
    },
    {
      icon: "fa-motorcycle",
      title: "Para Entregadores",
      desc: "Processo de cadastro, relatórios de ganhos semanais e navegação no aplicativo.",
    },
    {
      icon: "fa-headset",
      title: "Suporte Geral",
      desc: "Dúvidas sobre sua conta, segurança da plataforma, acessos e problemas técnicos.",
    },
  ];

  return (
    <>
      <title>Centro de Ajuda | Kamba Delivery</title>

      <section className="pt-32 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-6">
          
          {/* HEADER */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Centro de Ajuda
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
              Estamos aqui para ajudar. Encontre respostas rápidas para as dúvidas mais comuns da nossa comunidade.
            </p>
          </div>

          {/* CATEGORIAS */}
          <div className="grid md:grid-cols-3 gap-6">
            {categorias.map((cat, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200/80 rounded-2xl p-8 shadow-sm hover:border-gray-300 transition-all duration-200 flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 text-red-700 flex items-center justify-center text-lg mb-6 shrink-0">
                  <i className={`fas ${cat.icon}`}></i>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {cat.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CONTATO RÁPIDO */}
          <div className="mt-10 bg-white border border-gray-200/80 rounded-2xl p-8 sm:p-12 shadow-sm text-center">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Ainda precisa de ajuda?
            </h2>

            <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
              Fale diretamente com nossa equipa de suporte para resolver qualquer problema.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href="https://wa.me/244900000000"
                target="_blank"
                rel="noopener noreferrer"
                className={btnWhatsApp}
              >
                <i className="fab fa-whatsapp text-base"></i>
                <span>WhatsApp Suporte</span>
              </a>

              <a href="mailto:suporte@kambadelivery.com" className={btnOutline}>
                <i className="fas fa-envelope text-xs"></i>
                <span>Enviar Email</span>
              </a>
            </div>
          </div>

          {/* CTA FINAL */}
          <div className="mt-12 text-center">
            <Link to="/register" className={btnRed}>
              <span>Começar agora na Kamba</span>
              <i className="fas fa-arrow-right text-xs"></i>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
