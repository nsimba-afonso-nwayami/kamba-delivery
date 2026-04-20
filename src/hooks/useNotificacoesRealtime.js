import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { getNotificacoes } from "../services/notificacoesService";

export function useNotificacoesRealtime(userId, setCount) {
  const lastIdsRef = useRef(new Set());
  const audioRef = useRef(null);
  const isFirstLoad = useRef(true);
  const lastSoundTime = useRef(0);

  // carregar som uma vez
  useEffect(() => {
    audioRef.current = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3"
    );
  }, []);

  useEffect(() => {
    if (!userId) return;

    let isMounted = true;

    const fetchNotificacoes = async () => {
      try {
        const data = await getNotificacoes();

        const minhas = data.filter((n) => n.usuario === userId);

        const newCount = minhas.length;

        // detectar novas notificações reais (por ID)
        const newOnes = minhas.filter(
          (n) => !lastIdsRef.current.has(n.id)
        );

        // PRIMEIRO LOAD (não dispara som/toast)
        if (isFirstLoad.current) {
          lastIdsRef.current = new Set(minhas.map((n) => n.id));
          isFirstLoad.current = false;
        } else {
          if (newOnes.length > 0) {
            toast.success("Você tem uma nova notificação");

            // 🔊 controle anti-spam de som (3s cooldown)
            const now = Date.now();

            if (now - lastSoundTime.current > 3000) {
              audioRef.current?.play().catch(() => {});
              lastSoundTime.current = now;
            }
          }

          lastIdsRef.current = new Set(minhas.map((n) => n.id));
        }

        if (isMounted) {
          setCount(newCount);
        }
      } catch (err) {
        console.error("Erro notificações:", err);
      }
    };

    fetchNotificacoes();

    const interval = setInterval(fetchNotificacoes, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [userId, setCount]);
}
