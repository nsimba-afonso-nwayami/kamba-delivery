import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // Mantém a primeira pergunta aberta por padrão

  const faqs = [
    {
      icon: "fas fa-cogs",
      question: "Como funciona a Kamba Delivery?",
      answer:
        "Você faz um pedido pela plataforma, um entregador parceiro próximo é automaticamente atribuído e você acompanha o trajeto em tempo real até a conclusão da entrega."
    },
    {
      icon: "fas fa-clock",
      question: "Quanto tempo demora uma entrega?",
      answer:
        "A agilidade é nossa prioridade. O tempo varia conforme a distância, mas a grande maioria das nossas entregas em Luanda é concluída em menos de 45 minutos."
    },
    {
      icon: "fas fa-id-card",
      question: "Posso me tornar entregador facilmente?",
      answer:
        "Sim! O processo é digital e prático. Basta realizar o cadastro, enviar a documentação necessária e, após a validação, você já pode começar a faturar."
    },
    {
      icon: "fas fa-box",
      question: "Como faço para solicitar uma entrega?",
      answer:
        "Basta criar sua conta, inserir os endereços de coleta e destino, escolher o tipo de item e confirmar. O sistema localiza o entregador mais eficiente para você."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Detalhe de fundo sutil */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-rose-100/40 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* COLUNA DA ESQUERDA: Cabeçalho + Card de Ajuda */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-10">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-red-900 tracking-tighter leading-tight">
                Perguntas <br />
                <span className="text-red-700">Frequentes</span>
              </h2>
              <p className="text-gray-500 font-light text-[15px] leading-relaxed max-w-md">
                Entenda como a Kamba Delivery facilita seu dia a dia em Luanda com entregas rápidas, seguras e transparentes.
              </p>
            </div>

            {/* Card de Suporte Secundário */}
            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-red-700 flex items-center justify-center text-xl">
                <i className="fas fa-headset"></i>
              </div>
              <div>
                <h4 className="font-bold text-red-900 text-base">Ainda ficou com alguma dúvida?</h4>
                <p className="text-gray-500 font-light text-xs mt-1">
                  Nossa equipe de suporte está pronta para ajudar você a qualquer momento.
                </p>
              </div>
              <a
                href="#contato"
                className="inline-flex items-center gap-2 text-xs font-bold text-red-700 hover:text-red-800 transition-colors uppercase tracking-wider"
              >
                Falar com suporte
                <i className="fas fa-arrow-right text-[10px]"></i>
              </a>
            </div>
          </div>

          {/* COLUNA DA DIREITA: Lista de Cards Limpos (Sem Números) */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={`cursor-pointer transition-all duration-300 rounded-3xl p-6 md:p-8 border relative ${
                    isOpen
                      ? "bg-white border-red-700/30 shadow-xl shadow-red-900/5 overflow-hidden"
                      : "bg-white/80 hover:bg-white border-gray-100 hover:border-red-700/20 shadow-sm"
                  }`}
                >
                  {/* Linha vermelha de destaque no card aberto */}
                  {isOpen && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-red-700 rounded-l-3xl" />
                  )}

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Ícone Contextual */}
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center text-base shrink-0 transition-colors duration-300 ${
                          isOpen
                            ? "bg-red-700 text-white shadow-md shadow-red-700/20"
                            : "bg-rose-50 text-red-700"
                        }`}
                      >
                        <i className={faq.icon}></i>
                      </div>

                      <h3
                        className={`font-bold text-base md:text-lg tracking-tight transition-colors duration-300 ${
                          isOpen ? "text-red-900" : "text-gray-700"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    {/* Botão Indicador */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-rose-100 text-red-700 rotate-180"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <i className="fas fa-chevron-down text-xs"></i>
                    </div>
                  </div>

                  {/* Resposta Expandida */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-gray-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-gray-500 font-light text-[15px] leading-relaxed md:pl-15">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
