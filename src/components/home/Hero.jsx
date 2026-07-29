import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

import HeroImg1 from "../../assets/img/hero1.jpg";
import HeroImg2 from "../../assets/img/hero2.jpg";
import HeroImg3 from "../../assets/img/hero3.jpg";

export default function Hero() {
  const slides = [
    {
      id: 1,
      image: HeroImg1,
      badge: "Entregas Rápidas",
      title: (
        <>
          Entregas rápidas em <span className="text-red-500">Luanda</span>
        </>
      ),
      description:
        "Conectamos você aos melhores entregadores da cidade. Simples, rápido e totalmente seguro para o seu negócio ou necessidade pessoal.",
      buttonText: "Começar agora",
      link: "/register",
      secondaryButton: { text: "Como funciona", link: "/#como-funciona" },
    },
    {
      id: 2,
      image: HeroImg2,
      badge: "Para Empresas",
      title: "Logística Inteligente para seu Negócio",
      description:
        "Foque nas vendas e deixe a logística com a gente. Entregas agendadas, em tempo real e com total controle.",
      buttonText: "Cadastrar Empresa",
      link: "/register",
    },
    {
      id: 3,
      image: HeroImg3,
      badge: "Seja Nosso Parceiro",
      title: "Aumente sua Renda Sendo Entregador",
      description:
        "Flexibilidade total de horários, ganhos competitivos e suporte contínuo. Junte-se à frota do Kamba Delivery.",
      buttonText: "Tornar-se Entregador",
      link: "/register",
    },
  ];

  // Estilos de Botão Padronizados (Pílula, uppercase, text-xs, cursor-pointer)
  const btnBase =
    "group px-8 py-4 rounded-full font-bold text-center transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 w-full sm:w-fit tracking-wide text-xs uppercase cursor-pointer";

  const btnPrimary = `${btnBase} bg-red-700 text-white shadow-lg shadow-red-700/20 hover:bg-red-800 hover:shadow-red-700/30`;

  const btnSecondary = `${btnBase} bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white hover:text-red-700 hover:border-white`;

  return (
    <section className="mt-20 overflow-hidden bg-gray-900">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        grabCursor={true}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        loop={true}
        className="h-[calc(100vh-80px)] min-h-150"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div className="h-full relative flex items-center overflow-hidden">
                {/* Background Image com Efeito Ken Burns Suave */}
                <div
                  className={`absolute inset-0 transition-transform duration-10000 ease-linear ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />
                </div>

                {/* Overlay Gradiente */}
                <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/40"></div>

                {/* Conteúdo Centralizado */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-10 text-white w-full">
                  <div
                    className={`flex flex-col items-center justify-center text-center mx-auto ${
                      isActive ? "animate-fade-in-up" : "opacity-0"
                    }`}
                  >
                    {/* Badge Superior Padronizada */}
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 font-semibold text-xs tracking-wider uppercase mb-4 backdrop-blur-sm">
                      {slide.badge}
                    </span>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tighter max-w-4xl">
                      {slide.title}
                    </h1>

                    <p className="mt-6 text-base md:text-lg text-white/90 max-w-2xl leading-relaxed font-light">
                      {slide.description}
                    </p>

                    {/* Área de Botões Padronizados */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-fit">
                      <Link to={slide.link} className={btnPrimary}>
                        <span>{slide.buttonText}</span>
                        <i className="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
                      </Link>

                      {slide.secondaryButton && (
                        <Link
                          to={slide.secondaryButton.link}
                          className={btnSecondary}
                        >
                          {slide.secondaryButton.text}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}