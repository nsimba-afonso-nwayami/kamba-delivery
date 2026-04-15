import { useState } from "react";
import SidebarEntregador from "./SidebarEntregador";
import HeaderEntregador from "./HeaderEntregador";

export default function EntregadorLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-white text-gray-800 relative overflow-hidden">

      {/* GLOW SUAVE (FICHA PREMIUM DO SITE) */}
      <div className="absolute -top-25 -right-25 w-125 h-125 bg-red-700/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-30 -left-30 w-125 h-125 bg-red-900/10 blur-[140px] rounded-full pointer-events-none" />

      {/* SIDEBAR (continua escuro para contraste) */}
      <SidebarEntregador
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 md:ml-64 flex flex-col relative z-10">

        {/* HEADER (claro + borda leve) */}
        <HeaderEntregador
          title={title}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* MAIN LIMPO */}
        <main className="mt-20 px-6 py-8 max-w-7xl mx-auto w-full">
          {children}
        </main>

      </div>
    </div>
  );
}
