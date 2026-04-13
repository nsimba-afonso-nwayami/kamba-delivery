import WhatsAppButton from "../../components/whatsapp/WhatsAppButton";

import Hero from "../../components/home/Hero";

export default function Home() {
  return (
    <>
      <title>Kamba Delivery</title>

      <Hero />

      {/* Botão WhatsApp fixo */}
      <WhatsAppButton phone="244972614886" size={64} />
    </>
  );
}
