import API from "./client";

export const bookApi = {
  getBooks: async () => {
    return API.get("/api/v1/books/", {}).then((res) => res.json());
  },
};
