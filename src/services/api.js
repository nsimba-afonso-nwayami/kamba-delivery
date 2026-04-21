import axios from "axios";

const API_URL = "https://traga-rapido.fimbatec.com/api/";

// instância principal da API
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// instância separada para refresh (evita loop infinito)
const refreshApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================================
   REQUEST INTERCEPTOR
   -> adiciona token automaticamente
================================ */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================================
   RESPONSE INTERCEPTOR
   -> trata 401 + refresh token
================================ */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // se não tiver resposta ou não for 401
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // evita loop infinito
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const refresh = localStorage.getItem("refresh_token");

      if (!refresh) {
        throw new Error("Sem refresh token");
      }

      // pede novo access token
      const res = await refreshApi.post("auth/token/refresh/", {
        refresh,
      });

      const newAccess = res.data.access;

      // atualiza storage
      localStorage.setItem("access_token", newAccess);

      // aplica novo token na request original
      originalRequest.headers.Authorization = `Bearer ${newAccess}`;

      // refaz request original
      return api(originalRequest);
    } catch (err) {
      // se refresh falhar → logout total
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("tipo");

      window.location.href = "/login";

      return Promise.reject(err);
    }
  }
);
