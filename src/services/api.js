import axios from "axios";

const API_URL = "https://traga-rapido.fimbatec.com/api/";

// instância principal
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===============================
   TOKEN MANAGER
================================ */
class TokenManager {
  constructor() {
    this.refreshTimeout = null;
    this.isRefreshing = false;
    this.failedQueue = [];
  }

  getToken() {
    return localStorage.getItem("access_token");
  }

  getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }

  setToken(token) {
    localStorage.setItem("access_token", token);
  }

  parseJwt(token) {
    try {
      const base64 = token.split(".")[1];
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  }

  scheduleRefresh(token) {
    const decoded = this.parseJwt(token);
    if (!decoded?.exp) return;

    const expiresAt = decoded.exp * 1000;
    const now = Date.now();
    const refreshTime = expiresAt - now - 60000; // 1 min antes

    if (refreshTime <= 0) {
      this.refresh();
      return;
    }

    this.clearScheduledRefresh();

    this.refreshTimeout = setTimeout(() => {
      this.refresh();
    }, refreshTime);
  }

  clearScheduledRefresh() {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }
  }

  async refresh() {
    const refresh = this.getRefreshToken();

    if (!refresh) {
      this.logout();
      return null;
    }

    try {
      const res = await axios.post(
        `${API_URL}auth/token/refresh/`,
        { refresh }
      );

      const newAccess = res.data.access;

      this.setToken(newAccess);
      api.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
      this.scheduleRefresh(newAccess);

      return newAccess;
    } catch (err) {
      this.logout();
      throw err;
    }
  }

  processQueue(error, token = null) {
    this.failedQueue.forEach((p) => {
      if (error) p.reject(error);
      else p.resolve(token);
    });
    this.failedQueue = [];
  }

  addToQueue() {
    return new Promise((resolve, reject) => {
      this.failedQueue.push({ resolve, reject });
    });
  }

  logout() {
    this.clearScheduledRefresh();

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("tipo");

    window.location.href = "/login";
  }
}

const tokenManager = new TokenManager();

/* ===============================
   REQUEST INTERCEPTOR
================================ */
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ===============================
   RESPONSE INTERCEPTOR
================================ */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {

      if (tokenManager.isRefreshing) {
        try {
          const newToken = await tokenManager.addToQueue();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      tokenManager.isRefreshing = true;

      try {
        const newToken = await tokenManager.refresh();

        tokenManager.processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);

      } catch (err) {
        tokenManager.processQueue(err, null);
        return Promise.reject(err);
      } finally {
        tokenManager.isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/* ===============================
   INIT AUTO REFRESH
================================ */
export const initTokenRefresh = () => {
  const token = tokenManager.getToken();
  if (token) {
    tokenManager.scheduleRefresh(token);
  }
};

// inicializa automaticamente
initTokenRefresh();
