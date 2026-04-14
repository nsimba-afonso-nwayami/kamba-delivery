import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

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
      title: <>Entregas rápidas em <span className="text-red-700">Luanda</span></>,
      description: "A Kamba Delivery conecta você aos melhores entregadores da cidade. Simples, rápido e seguro.",
      buttonText: "Começar agora",
      link: "/register",
      secondaryButton: { text: "Como funciona", link: "/#como-funciona" }
    },
    {
      id: 2,
      image: HeroImg2,
      title: "Precisa de uma entrega?",
      description: "Solicite um entregador em minutos e acompanhe tudo em tempo real.",
      buttonText: "Solicitar entrega",
      link: "/register"
    },
    {
      id: 3,
      image: HeroImg3,
      title: "Ganhe dinheiro fazendo entregas",
      description: "Seja um entregador parceiro e aumente sua renda com flexibilidade.",
      buttonText: "Tornar-se entregador",
      link: "/register"
    }
  ];

  const btnPrimary = "bg-red-700 text-white px-8 py-3.5 rounded-xl font-bold text-center shadow-lg shadow-red-700/20 hover:bg-red-900 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 w-full md:w-fit";
  const btnSecondary = "border-2 border-white text-white px-8 py-3.5 rounded-xl font-bold text-center hover:bg-white hover:text-red-900 transition-all duration-300 flex items-center justify-center gap-2 w-full md:w-fit";

  return (
    <section className="mt-20 overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        className="h-screen"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div className="h-full relative flex items-center overflow-hidden">
                
                {/* Imagem com efeito Ken Burns (Zoom) */}
                <div className={`absolute inset-0 transition-transform duration-10000 ease-linear ${isActive ? "scale-110" : "scale-100"}`}>
                   <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />
                </div>

                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-white w-full">
                  <div className={`${isActive ? "animate-fade-in-up" : "opacity-0"} flex flex-col items-start`}>
                    
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
                      {slide.title}
                    </h1>

                    <p className="mt-4 text-lg text-rose-200 max-w-xl leading-relaxed">
                      {slide.description}
                    </p>

                    <div className="mt-6 flex flex-col md:flex-row gap-4 w-full md:w-fit">
                      <Link to={slide.link} className={btnPrimary}>
                        {slide.buttonText}
                        <i className="fas fa-arrow-right text-xs"></i>
                      </Link>

                      {slide.secondaryButton && (
                        <Link to={slide.secondaryButton.link} className={btnSecondary}>
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