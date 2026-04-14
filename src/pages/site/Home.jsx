import WhatsAppButton from "../../components/whatsapp/WhatsAppButton";

import Hero from "../../components/home/Hero";
import ComoFunciona from "../../components/home/ComoFunciona";
import SouSolicitante from "../../components/home/SouSolicitante";
import SouEntregador from "../../components/home/SouEntregador";
import ParallaxSection from "../../components/home/ParallaxSection";
import Download from "../../components/home/Download";
import Estatisticas from "../../components/home/Estatisticas";
import FAQ from "../../components/home/FAQ";
import AppEmAcao from "../../components/home/AppEmAcao";
import MapaCobertura from "../../components/home/MapaCobertura";
import CTA from "../../components/home/CTA";

export default function Home() {
  return (
    <>
      <title>Kamba Delivery</title>

      <Hero />
      <ComoFunciona />
      <SouSolicitante />
      <SouEntregador />
      <ParallaxSection />
      <Download />
      <Estatisticas />
      <FAQ />
      <AppEmAcao />
      <MapaCobertura />
      <CTA />

      {/* Botão WhatsApp fixo */}
      <WhatsAppButton phone="244972614886" size={64} />
    </>
  );
}
