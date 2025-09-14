import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../api/books";
import { queryKeys } from "@/config";
import type { Book, PaginationParams } from "@/types";

type BooksListResponse = {
  total: number;
  page: number;
  size: number;
  items: Book[];
};

export const useGetBooks = (pagination: PaginationParams) => {
  return useQuery<BooksListResponse>({
    queryKey: [queryKeys.books, pagination.page, pagination.perPage],
    queryFn: () => bookApi.getBooks(pagination),
  });
};
