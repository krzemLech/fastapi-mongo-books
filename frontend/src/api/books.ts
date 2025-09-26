import API from "./client";
import type { PaginationParams } from "@/types";

type BookFilters = {
  author?: string;
  title?: string;
};

type BookPayload = {
  title: string;
  author: string;
  description: string;
  pages: number;
};

export const bookApi = {
  getBooks: async (pagination: PaginationParams, filters: BookFilters) => {
    let url = `/api/v1/books/?page=${pagination.page}&per_page=${pagination.perPage}`;
    if (filters.author) url += `&author=${filters.author}`;
    if (filters.title) url += `&title=${filters.title}`;
    return API.get(url, {});
  },
  getBook: async (id: string) => {
    return API.get(`/api/v1/books/${id}`, {});
  },
  addBook: async (book: BookPayload) => {
    return API.post("/api/v1/books/", { body: JSON.stringify(book) });
  },
  updateBook: async (id: string, book: BookPayload) => {
    return API.put(`/api/v1/books/${id}`, { body: JSON.stringify(book) });
  },
  deleteBook: async (id: string) => {
    return API.delete(`/api/v1/books/${id}`, {});
  },
};
