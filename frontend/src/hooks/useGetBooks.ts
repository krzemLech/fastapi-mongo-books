import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../api/books";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  pages: number;
  created_at: string;
  updated_at: string;
};

export const useGetBooks = () => {
  return useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: () => bookApi.getBooks(),
  });
};
