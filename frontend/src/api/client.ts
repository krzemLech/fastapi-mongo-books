const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const deleteToken = () => {
  localStorage.removeItem("token");
};

const apiClient = (url: string, options: RequestInit) => {
  if (window.location.hostname === "localhost") {
    url = "http://localhost:4000" + url;
  }
  const token = getToken();
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return fetch(url, options);
};

const API = {
  get: (url: string, options: RequestInit) =>
    apiClient(url, { ...options, method: "GET" }),
  post: (url: string, options: RequestInit) =>
    apiClient(url, { ...options, method: "POST" }),
  patch: (url: string, options: RequestInit) =>
    apiClient(url, { ...options, method: "PUT" }),
  delete: (url: string, options: RequestInit) =>
    apiClient(url, { ...options, method: "DELETE" }),
};

export default API;
