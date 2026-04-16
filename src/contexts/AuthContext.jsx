import { createContext, useContext, useEffect, useState } from "react";
import { getUsuarioById } from "../services/usuariosService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!localStorage.getItem("access_token");

  const loadUser = async () => {
    const token = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const userData = await getUsuarioById(userId);

      setUser({
        ...userData,
        tipo: localStorage.getItem("tipo"),
      });
    } catch (error) {
      console.log("Erro ao carregar usuário:", error);
      localStorage.clear();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const refreshUser = async () => {
    await loadUser();
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuthenticated,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
