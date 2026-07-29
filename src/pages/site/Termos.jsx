import { Link } from "react-router-dom";

export default function Termos() {
  // Botão padronizado limpo e elegante
  const btnPrimary =
    "bg-red-700 text-white px-8 py-3.5 rounded-xl font-bold text-center hover:bg-red-800 transition-all duration-200 active:scale-98 inline-flex items-center justify-center gap-2.5 cursor-pointer text-sm shadow-sm";

  return (
    <>
      <title>Termos de uso | Kamba Delivery</title>
      <section className="pt-32 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-6">
          
          {/* CABEÇALHO */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Termos de Uso
            </h1>
            <p className="mt-3 text-sm text-gray-500">
              Última atualização: <span className="font-medium text-gray-700">Abril de 2026</span>
            </p>
          </div>

          {/* DOCUMENTO ÚNICO */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-8 sm:p-12 shadow-sm text-gray-600 leading-relaxed text-sm md:text-base space-y-8">
            
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                1. Aceitação dos Termos
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Ao utilizar a Kamba Delivery, você concorda integralmente com estes termos de uso.
                Caso não concorde com qualquer disposição aqui citada, orientamos que não utilize a plataforma.
              </p>
            </section>

            <hr className="border-gray-100" />

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                2. Uso da Plataforma
              </h2>
              <p className="text-gray-600 leading-relaxed">
                A Kamba Delivery atua como uma ponte tecnológica conectando clientes e entregadores para facilitar serviços de logística urbana. 
                O uso da ferramenta deve ser pautado pela responsabilidade, ética e conformidade legal.
              </p>
            </section>

            <hr className="border-gray-100" />

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                3. Responsabilidades do Usuário
              </h2>
              <p className="text-gray-600 leading-relaxed">
                É dever do usuário fornecer dados verídicos e manter a segurança de sua conta, não utilizando a plataforma para quaisquer fins ilícitos, fraudulentos ou que violem direitos de terceiros.
              </p>
            </section>

            <hr className="border-gray-100" />

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                4. Entregadores Parceiros
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Os entregadores cadastrados são parceiros independentes e não possuem vínculo empregatício com a Kamba Delivery. 
                A plataforma funciona como uma ferramenta de intermediação e otimização de rotas.
              </p>
            </section>

            <hr className="border-gray-100" />

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                5. Limitação de Responsabilidade
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Embora trabalhemos para oferecer a melhor experiência, a Kamba Delivery não se responsabiliza por atrasos decorrentes de fatores externos (trânsito, clima) ou condutas individuais fora do ambiente digital da plataforma.
              </p>
            </section>

            <hr className="border-gray-100" />

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                6. Alterações dos Termos
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Reservamo-nos o direito de atualizar estes termos periodicamente para refletir melhorias no serviço. Notificaremos mudanças significativas, mas recomendamos a revisão regular desta página.
              </p>
            </section>

          </div>

          {/* CTA DE AÇÃO */}
          <div className="mt-10 text-center">
            <Link to="/register" className={btnPrimary}>
              <span>Aceitar e criar conta</span>
              <i className="fas fa-check-circle text-xs"></i>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
