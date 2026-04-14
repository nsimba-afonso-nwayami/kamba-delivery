import { Link } from "react-router-dom";

export default function Privacidade() {
  // Botão padronizado Premium
  const btnPrimary = "bg-red-700 text-white px-10 py-4 rounded-xl font-bold text-center shadow-lg shadow-red-700/20 hover:bg-red-900 transition-all duration-300 active:scale-95 inline-flex items-center justify-center gap-2 cursor-pointer";

  return (
    <>
      <title>Privacidade | Kamba Delivery</title>

      <section className="py-28 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">

          {/* CABEÇALHO */}
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold text-red-900">
              Política de Privacidade
            </h1>
            <p className="text-gray-500 font-light">
              Última atualização: Abril 2026
            </p>
            <div className="w-20 h-1 bg-red-700 mx-auto rounded-full"></div>
          </div>

          {/* CONTEÚDO DENTRO DE CARD */}
          <div className="space-y-10 text-gray-600 leading-relaxed text-sm md:text-base bg-white p-8 md:p-12 rounded-4xl shadow-sm border border-gray-100">

            {/* 1 */}
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-3">
                1. Informações que coletamos
              </h2>
              <p>
                Para oferecer um serviço de excelência, coletamos informações essenciais como nome completo, dados de contacto, localização em tempo real e detalhes das encomendas. Estes dados são fundamentais para a operação logística da plataforma.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-3">
                2. Como usamos suas informações
              </h2>
              <p>
                Seus dados são processados para validar pedidos, otimizar rotas entre clientes e entregadores, melhorar continuamente nossa interface e garantir camadas adicionais de segurança em cada transação realizada.
              </p>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-3">
                3. Compartilhamento de dados
              </h2>
              <p>
                O compartilhamento de informações ocorre estritamente entre as partes envolvidas na entrega (cliente e entregador) para viabilizar o serviço. Reforçamos que a Kamba Delivery não comercializa dados pessoais com terceiros.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-3">
                4. Segurança das informações
              </h2>
              <p>
                Utilizamos protocolos modernos de criptografia e medidas organizacionais rigorosas para mitigar riscos de acessos não autorizados, garantindo que sua privacidade seja preservada durante todo o uso da plataforma.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-3">
                5. Cookies e Navegação
              </h2>
              <p>
                Empregamos cookies para personalizar sua experiência, lembrar suas preferências de navegação e analisar métricas de desempenho que nos ajudam a tornar o app mais ágil para o seu dia a dia.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-3">
                6. Seus direitos
              </h2>
              <p>
                Você detém total controle sobre seus dados. A qualquer momento, através dos nossos canais de suporte, é possível solicitar o acesso, a retificação ou a exclusão permanente das suas informações de nossa base de dados.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-3">
                7. Alterações nesta política
              </h2>
              <p>
                Esta política pode ser revista para se adequar a novas funcionalidades ou regulamentações. Recomendamos que visite esta página periodicamente para se manter informado sobre como protegemos sua privacidade.
              </p>
            </div>

          </div>

          {/* CTA PADRONIZADO */}
          <div className="mt-16 text-center">
            <Link to="/register" className={btnPrimary}>
              Concordar e Começar
              <i className="fas fa-arrow-right text-xs"></i>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
