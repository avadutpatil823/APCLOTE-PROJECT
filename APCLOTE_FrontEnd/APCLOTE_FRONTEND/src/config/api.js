const normalizeBaseUrl = (value) => String(value || "http://localhost:9898").replace(/\/+$/, "");

const normalizePath = (path = "") => {
  const safePath = String(path).trim();
  return safePath ? (safePath.startsWith("/") ? safePath : `/${safePath}`) : "";
};

export const BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);
export const API_URL = `${BASE_URL}/api`;

export const buildUrl = (path = "") => `${BASE_URL}${normalizePath(path)}`;
export const buildApiUrl = (path = "") => `${API_URL}${normalizePath(path)}`;
