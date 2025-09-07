import API, { deleteToken, setToken } from "./client";

export const auth = {
  login: async (email: string, password: string) => {
    return API.post("/api/v1/auth/login", {
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        setToken(res.token);
        return res;
      });
  },

  register: async (
    email: string,
    password: string,
    age: number,
    name: string
  ) => {
    return API.post("/api/v1/users/create", {
      body: JSON.stringify({ email, password, age, name }),
    }).then((res) => res.json());
  },

  logout: async () => {
    return API.post("/api/v1/auth/logout", {})
      .then((res) => res.json())
      .then((res) => {
        deleteToken();
        return res;
      });
  },
};
