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
      "Content-Type": "application/json",
    };
  }
  return fetch(url, options).then(async (res) => {
    console.warn(res);
    const resJson = await res.json();
    if (!res.ok) {
      if (resJson.detail) {
        throw new Error(
          // resJson.detail.map((error: { msg: string }) => error.msg).join(", ")
          resJson.detail
        );
      }
      throw new Error(res.statusText);
    }
    return resJson;
  });
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
