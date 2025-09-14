import API from "./client";
import type { Book, PaginationParams } from "@/types";

export const bookApi = {
  getBooks: async (pagination: PaginationParams) => {
    return API.get(
      `/api/v1/books/?page=${pagination.page}&per_page=${pagination.perPage}`,
      {}
    );
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
