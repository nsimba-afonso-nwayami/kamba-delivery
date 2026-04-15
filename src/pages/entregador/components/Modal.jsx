import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, icon, children }) {
  // Bloquear o scroll da página de trás quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-999 bg-white flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* HEADER FIXO - Estilo Dashboard */}
      <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100 bg-white shadow-sm z-10">
        
        {icon && (
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-700 shadow-sm border border-red-100/50">
            <i className={`${icon} text-lg`}></i>
          </div>
        )}

        <div className="flex-1">
          <h2 className="text-gray-800 font-bold text-lg tracking-tight">
            {title}
          </h2>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-none mt-1">
            Kamba Delivery System
          </p>
        </div>

        {/* BOTÃO FECHAR ESTILIZADO */}
        <button
          onClick={onClose}
          className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-700 transition-all duration-300 active:scale-90"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* BODY (SCROLLÁVEL) */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 text-gray-700 bg-neutral-50/30 scrollbar-thin scrollbar-thumb-gray-200">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </div>

      {/* FOOTER (OPCIONAL - Caso queira adicionar botões de ação fixos depois) */}
      {/* <div className="p-6 border-t border-gray-100 bg-white"> ... </div> */}

    </div>,
    document.body
  );
}
