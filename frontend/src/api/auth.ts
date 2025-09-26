import API, { deleteToken, setToken, getToken } from "./client";

type LoginParams = {
  email: string;
  password: string;
};

type RegisterParams = {
  email: string;
  password: string;
  age: number;
  name: string;
};

export const auth = {
  login: async (params: LoginParams) => {
    const body = JSON.stringify(params);
    return API.post("/api/v1/auth/login", {
      body,
      headers: {},
    }).then(res => {
      setToken(res.token);
      return res;
    });
  },

  register: async ({ email, password, age, name }: RegisterParams) => {
    return API.post("/api/v1/auth/register", {
      body: JSON.stringify({ email, password, age, name }),
    });
  },

  logout: async () => {
    return API.post("/api/v1/auth/logout", {}).then(res => {
      deleteToken();
      return res;
    });
  },

  getUser: async () => {
    return API.get("/api/v1/auth/me", {}).then(res => {
      return res;
    });
  },
};
