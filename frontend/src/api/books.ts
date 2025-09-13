import API from "./client";

export type Book = {
  title: string;
  author: string;
  description: string;
  pages: number;
};

export const bookApi = {
  getBooks: async () => {
    return API.get("/api/v1/books/", {});
  },
  getBook: async (id: string) => {
    return API.get(`/api/v1/books/${id}`, {});
  },
  addBook: async (book: Book) => {
    return API.post("/api/v1/books/", { body: JSON.stringify(book) });
  },
  updateBook: async (id: string, book: Book) => {
    return API.put(`/api/v1/books/${id}`, { body: JSON.stringify(book) });
  },
  deleteBook: async (id: string) => {
    return API.delete(`/api/v1/books/${id}`, {});
  },
};
