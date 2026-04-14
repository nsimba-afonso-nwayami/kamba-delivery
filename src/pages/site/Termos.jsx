import { Link } from "react-router-dom";

export default function Termos() {
  // Botão padronizado Premium
  const btnPrimary = "bg-red-700 text-white px-10 py-4 rounded-xl font-bold text-center shadow-lg shadow-red-700/20 hover:bg-red-900 transition-all duration-300 active:scale-95 inline-flex items-center justify-center gap-2 cursor-pointer";

  return (
    <>
      <title>Termos | Kamba Delivery</title>

      <section className="py-28 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">

          {/* CABEÇALHO */}
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold text-red-900">
              Termos de Uso
            </h1>
            <p className="text-gray-500 font-light">
              Última atualização: Abril 2026
            </p>
            <div className="w-20 h-1 bg-red-700 mx-auto rounded-full"></div>
          </div>

          {/* CONTEÚDO */}
          <div className="space-y-10 text-gray-600 leading-relaxed text-sm md:text-base bg-white p-8 md:p-12 rounded-4xl shadow-sm border border-gray-100">

            {/* 1 */}
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-3">
                1. Aceitação dos Termos
              </h2>
              <p>
                Ao utilizar a Kamba Delivery, você concorda integralmente com estes termos de uso.
                Caso não concorde com qualquer disposição aqui citada, orientamos que não utilize a plataforma.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-3">
                2. Uso da Plataforma
              </h2>
              <p>
                A Kamba Delivery atua como uma ponte tecnológica conectando clientes e entregadores para facilitar serviços de logística urbana. 
                O uso da ferramenta deve ser pautado pela responsabilidade, ética e conformidade legal.
              </p>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-3">
                3. Responsabilidades do Usuário
              </h2>
              <p>
                É dever do usuário fornecer dados verídicos e manter a segurança de sua conta, não utilizando a plataforma para quaisquer fins ilícitos, fraudulentos ou que violem direitos de terceiros.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-3">
                4. Entregadores Parceiros
              </h2>
              <p>
                Os entregadores cadastrados são parceiros independentes e não possuem vínculo empregatício com a Kamba Delivery. 
                A plataforma funciona como uma ferramenta de intermediação e otimização de rotas.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-3">
                5. Limitação de Responsabilidade
              </h2>
              <p>
                Embora trabalhemos para oferecer a melhor experiência, a Kamba Delivery não se responsabiliza por atrasos decorrentes de fatores externos (trânsito, clima) ou condutas individuais fora do ambiente digital da plataforma.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-3">
                6. Alterações dos Termos
              </h2>
              <p>
                Reservamo-nos o direito de atualizar estes termos periodicamente para refletir melhorias no serviço. Notificaremos mudanças significativas, mas recomendamos a revisão regular desta página.
              </p>
            </div>

          </div>

          {/* CTA PADRONIZADO */}
          <div className="mt-16 text-center">
            <Link to="/register" className={btnPrimary}>
              Aceitar e criar conta
              <i className="fas fa-check-circle text-xs"></i>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
