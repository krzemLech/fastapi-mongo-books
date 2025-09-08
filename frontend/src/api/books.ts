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
};

export const addBook = async (book: Book) => {
  return API.post("/api/v1/books/", { body: JSON.stringify(book) });
};
