import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../api/books";
import { queryKeys } from "@/config";

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
    queryKey: [queryKeys.books],
    queryFn: () => bookApi.getBooks(),
  });
};
