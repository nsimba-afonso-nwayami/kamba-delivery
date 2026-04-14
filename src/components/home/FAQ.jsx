import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Como funciona a Kamba Delivery?",
      answer:
        "Você faz um pedido pela plataforma, um entregador parceiro próximo é automaticamente atribuído e você acompanha o trajeto em tempo real até a conclusão da entrega."
    },
    {
      question: "Quanto tempo demora uma entrega?",
      answer:
        "A agilidade é nossa prioridade. O tempo varia conforme a distância, mas a grande maioria das nossas entregas em Luanda é concluída em menos de 45 minutos."
    },
    {
      question: "Posso me tornar entregador facilmente?",
      answer:
        "Sim! O processo é digital e prático. Basta realizar o cadastro, enviar a documentação necessária e, após a validação, você já pode começar a faturar."
    },
    {
      question: "Como faço para solicitar uma entrega?",
      answer:
        "Basta criar sua conta, inserir os endereços de coleta e destino, escolher o tipo de item e confirmar. O sistema localiza o entregador mais eficiente para você."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">

        {/* CABEÇALHO */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-red-900 leading-tight">
            Dúvidas frequentes
          </h2>
          <p className="mt-4 text-gray-500 text-lg font-light">
            Respostas rápidas para as perguntas mais comuns.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div
                key={index}
                className={`transition-all duration-500 rounded-2xl border ${
                  isOpen 
                    ? "bg-white border-red-700/30 shadow-xl shadow-red-900/5" 
                    : "bg-white border-transparent hover:border-gray-200 shadow-sm"
                }`}
              >
                {/* PERGUNTA */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center p-6 text-left group cursor-pointer"
                >
                  <span className={`font-bold text-lg transition-colors duration-300 ${isOpen ? "text-red-700" : "text-red-900"}`}>
                    {faq.question}
                  </span>

                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isOpen ? "bg-red-700 text-white rotate-180" : "bg-rose-50 text-red-700 group-hover:bg-red-100"
                  }`}>
                    <i className="fas fa-chevron-down text-xs"></i>
                  </div>
                </button>

                {/* RESPOSTA (Animação Suave com Grid) */}
                <div 
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
