import { Link } from "react-router-dom";

export default function CentroAjuda() {
  // Padronização de botões
  const btnRed = "bg-red-700 text-white px-8 py-3 rounded-xl font-bold text-center shadow-lg shadow-red-700/20 hover:bg-red-900 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer";
  const btnOutline = "border-2 border-red-700 text-red-700 px-8 py-3 rounded-xl font-bold text-center hover:bg-rose-50 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer";
  const btnWhatsApp = "bg-green-600 text-white px-8 py-3 rounded-xl font-bold text-center shadow-lg shadow-green-600/20 hover:bg-green-700 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer";

  const categorias = [
    { 
      icon: "fa-user", 
      title: "Para Clientes", 
      desc: "Como solicitar entregas, gerenciar pagamentos e acompanhar pedidos." 
    },
    { 
      icon: "fa-motorcycle", 
      title: "Para Entregadores", 
      desc: "Processo de cadastro, ganhos semanais e funcionamento do app." 
    },
    { 
      icon: "fa-headset", 
      title: "Suporte Geral", 
      desc: "Dúvidas sobre conta, segurança, acesso ou problemas técnicos." 
    }
  ];

  return (
    <>
      <title>Centro de Ajuda | Kamba Delivery</title>

      <section className="py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">

          {/* HEADER */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-red-900 leading-tight">
              Centro de Ajuda
            </h1>
            <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto">
              Estamos aqui para ajudar. Encontre respostas rápidas para as dúvidas mais comuns da nossa comunidade.
            </p>
          </div>

          {/* CATEGORIAS */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {categorias.map((cat, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-4xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-700/10 transition-all duration-500 text-center group cursor-default"
              >
                <div className="text-red-700 text-4xl mb-6 transition-transform duration-300 group-hover:scale-110">
                  <i className={`fas ${cat.icon}`}></i>
                </div>

                <h3 className="text-xl font-bold text-red-900">
                  {cat.title}
                </h3>

                <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CONTATO RÁPIDO */}
          <div className="mt-16 text-center bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h2 className="text-3xl font-black text-red-900">
              Ainda precisa de ajuda?
            </h2>

            <p className="mt-4 text-gray-500 text-lg">
              Fale diretamente com nossa equipa de suporte agora mesmo.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/244900000000" className={btnWhatsApp}>
                <i className="fab fa-whatsapp text-xl"></i>
                WhatsApp Suporte
              </a>

              <a href="mailto:suporte@kambadelivery.com" className={btnOutline}>
                <i className="fas fa-envelope"></i>
                Enviar Email
              </a>
            </div>
          </div>

          {/* CTA FINAL */}
          <div className="mt-16 text-center">
            <Link to="/register" className={btnRed}>
              Começar agora na Kamba
              <i className="fas fa-arrow-right text-xs"></i>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
