import { Link } from "react-router-dom";

export default function MapaCobertura() {
  // Botão padronizado conforme o estilo premium estabelecido
  const btnPrimary = "bg-red-700 text-white px-10 py-4 rounded-xl font-bold text-center shadow-lg shadow-red-700/20 hover:bg-red-900 transition-all duration-300 active:scale-95 inline-flex items-center justify-center gap-2";

  const zonas = [
    { nome: "Zona Centro", locais: "Maianga, Ingombota, Rangel" },
    { nome: "Zona Sul", locais: "Talatona, Benfica, Kilamba" },
    { nome: "Zona Norte", locais: "Cazenga, Viana, Cacuaco" }
  ];

  return (
    <section id="cobertura" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* CABEÇALHO */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-red-900 leading-tight">
            Área de cobertura em <span className="text-red-700">Luanda</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg font-light">
            Operamos nas principais zonas da capital com um sistema de logística inteligente e expansão contínua.
          </p>
        </div>

        {/* MAPA GOOGLE COM MOLDURA PREMIUM */}
        <div className="mt-16 rounded-4xl overflow-hidden shadow-2xl shadow-red-900/5 border-8 border-white relative group">
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

        {/* ZONAS ESTILIZADAS */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
          {zonas.map((zona, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl border border-transparent hover:border-red-700/20 hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-red-700 group-hover:bg-red-700 group-hover:text-white transition-colors">
                  <i className="fas fa-location-dot"></i>
                </div>
                <h4 className="font-bold text-red-900 text-lg tracking-tight">
                  {zona.nome}
                </h4>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                {zona.locais}
              </p>
            </div>
          ))}
        </div>

        {/* CTA FINAL */}
        <div className="mt-16">
          <Link to="/register" className={btnPrimary}>
            Ver disponibilidade na minha zona
            <i className="fas fa-search-location text-xs"></i>
          </Link>
        </div>

      </div>
    </section>
  );
}
