import { Link } from "react-router-dom";

export default function Privacidade() {
  // Botão padronizado limpo e elegante
  const btnPrimary =
    "bg-red-700 text-white px-8 py-3.5 rounded-xl font-bold text-center hover:bg-red-800 transition-all duration-200 active:scale-98 inline-flex items-center justify-center gap-2.5 cursor-pointer text-sm shadow-sm";

  return (
    <>
      <title>Política de Privacidade | Kamba Delivery</title>
      <section className="pt-32 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-6">
          {/* CABEÇALHO */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Política de Privacidade
            </h1>
            <p className="mt-3 text-sm text-gray-500">
              Última atualização:{" "}
              <span className="font-medium text-gray-700">Abril de 2026</span>
            </p>
          </div>

          {/* DOCUMENTO ÚNICO */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-8 sm:p-12 shadow-sm text-gray-600 leading-relaxed text-sm md:text-base space-y-8">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                1. Informações que coletamos
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Para oferecer um serviço de excelência, coletamos informações
                essenciais como nome completo, dados de contacto, localização em
                tempo real e detalhes das encomendas. Estes dados são
                fundamentais para a operação logística da plataforma.
              </p>
            </section>

            <hr className="border-gray-100" />

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                2. Como usamos suas informações
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Seus dados são processados para validar pedidos, otimizar rotas
                entre clientes e entregadores, melhorar continuamente nossa
                interface e garantir camadas adicionais de segurança em cada
                transação realizada.
              </p>
            </section>

            <hr className="border-gray-100" />

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                3. Compartilhamento de dados
              </h2>
              <p className="text-gray-600 leading-relaxed">
                O compartilhamento de informações ocorre estritamente entre as
                partes envolvidas na entrega (cliente e entregador) para
                viabilizar o serviço. Reforçamos que a Kamba Delivery não
                comercializa dados pessoais com terceiros.
              </p>
            </section>

            <hr className="border-gray-100" />

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                4. Segurança das informações
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Utilizamos protocolos modernos de criptografia e medidas
                organizacionais rigorosas para mitigar riscos de acessos não
                autorizados, garantindo que sua privacidade seja preservada
                durante todo o uso da plataforma.
              </p>
            </section>

            <hr className="border-gray-100" />

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                5. Cookies e Navegação
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Empregamos cookies para personalizar sua experiência, lembrar
                suas preferências de navegação e analisar métricas de desempenho
                que nos ajudam a tornar o app mais ágil para o seu dia a dia.
              </p>
            </section>

            <hr className="border-gray-100" />

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                6. Seus direitos
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Você detém total controle sobre seus dados. A qualquer momento,
                através dos nossos canais de suporte, é possível solicitar o
                acesso, a retificação ou a exclusão permanente das suas
                informações de nossa base de dados.
              </p>
            </section>

            <hr className="border-gray-100" />

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                7. Alterações nesta política
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Esta política pode ser revista para se adequar a novas
                funcionalidades ou regulamentações. Recomendamos que visite esta
                página periodicamente para se manter informado sobre como
                protegemos sua privacidade.
              </p>
            </section>
          </div>

          {/* CTA DE AÇÃO */}
          <div className="mt-10 text-center">
            <Link to="/register" className={btnPrimary}>
              <span>Concordar e Começar</span>
              <i className="fas fa-arrow-right text-xs"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
