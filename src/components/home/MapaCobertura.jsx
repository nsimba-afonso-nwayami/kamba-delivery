import { Link } from "react-router-dom";

export default function MapaCobertura() {
  // Padronização dos botões conforme o design do projeto (IDÊNTICO AO SOUENTREGADOR E APPEMACAO)
  const btnBase =
    "group px-8 py-4 rounded-full font-bold text-center transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 w-full sm:w-fit tracking-wide text-xs uppercase";

  const btnPrimary = `${btnBase} bg-red-700 text-white shadow-lg shadow-red-700/20 hover:bg-red-800 hover:shadow-red-700/30`;

  // Dados das Zonas ajustados com ícones contextuais
  const zonas = [
    {
      nome: "Zona Centro",
      locais: "Maianga, Ingombota, Rangel, Samba",
      icon: "fas fa-city",
    },
    {
      nome: "Zona Sul",
      locais: "Talatona, Benfica, Kilamba, Camama",
      icon: "fas fa-building",
    },
    {
      nome: "Zona Norte",
      locais: "Cazenga, Viana, Cacuaco, Mulemba",
      icon: "fas fa-map-marked-alt",
    },
  ];

  return (
    <section
      id="cobertura"
      className="py-24 bg-gray-50 relative overflow-hidden"
    >
      {/* Detalhe de fundo sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-rose-100 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* CABEÇALHO PADRONIZADO */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-red-900 tracking-tighter leading-tight">
            Área de cobertura em <span className="text-red-700">Luanda</span>
          </h2>
          <p className="mt-4 text-gray-500 font-light text-[15px] leading-relaxed max-w-xl mx-auto">
            Operamos nas principais zonas da capital com um sistema de logística
            inteligente e expansão contínua.
          </p>
        </div>

        {/* MAPA GOOGLE COM MOLDURA PREMIUM */}
        <div className="mt-16 rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/80 border-8 border-white relative group">
          <iframe
            title="Mapa de Luanda - Kamba Delivery"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105284.86776494244!2d13.244960348445929!3d-8.877438410840751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f15cdc8d2c7d%3A0x850c1c5c5ecc5a92!2sLuanda!5e1!3m2!1spt-PT!2sao!4v1776154246183!5m2!1spt-PT!2sao"
            width="100%"
            height="480"
            loading="lazy"
            className="w-full grayscale-20 group-hover:grayscale-0 transition-all duration-700"
            style={{ border: 0 }}
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* ZONAS PADRONIZADAS COM CARD CLEAN */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
          {zonas.map((zona, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-red-700/10 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-red-700 shadow-inner group-hover:bg-red-700 group-hover:text-white group-hover:border-red-700 transition-colors duration-300 shrink-0">
                  <i className={`${zona.icon} text-lg`}></i>
                </div>
                <h4 className="font-bold text-red-900 text-lg tracking-tight">
                  {zona.nome}
                </h4>
              </div>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                {zona.locais}
              </p>
            </div>
          ))}
        </div>

        {/* CTA FINAL PADRONIZADO */}
        <div className="mt-16 flex justify-center">
          <Link to="/register" className={btnPrimary}>
            <span>Ver disponibilidade na minha zona</span>
            <i className="fas fa-search-location text-xs transition-transform group-hover:scale-110"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
