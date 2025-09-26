export const getToken = () => {
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
  const headers = (options.headers || {}) as Record<string, string>;
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (options.body) headers["Content-Type"] = "application/json";
  return fetch(url, { ...options, headers }).then(async res => {
    const resJson = await res.json();
    console.log("resJson:", resJson);
    if (!res.ok) {
      // TODO: handle errors better - detail can be a string or an array of errors
      if (resJson.detail) {
        throw new Error(
          Array.isArray(resJson.detail)
            ? resJson.detail
                .map(
                  (error: { msg: string; loc: string[] }) =>
                    `${error.loc[error.loc.length - 1]}: ${error.msg}`
                )
                .join(", ")
            : resJson.detail
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
  put: (url: string, options: RequestInit) =>
    apiClient(url, { ...options, method: "PUT" }),
  delete: (url: string, options: RequestInit) =>
    apiClient(url, { ...options, method: "DELETE" }),
};

export default API;
