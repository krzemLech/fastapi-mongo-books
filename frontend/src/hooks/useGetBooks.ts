import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../api/books";
import { DEBOUNCE_TIME, queryKeys } from "@/config";
import type { Book, PaginationParams, Filters } from "@/types";
import { useDebounce } from "./useDebounce";

type BooksListResponse = {
  total: number;
  page: number;
  size: number;
  items: Book[];
};

export const useGetBooks = (pagination: PaginationParams, filters: Filters) => {
  const debouncedFilters = useDebounce(filters, DEBOUNCE_TIME);
  return useQuery<BooksListResponse>({
    queryKey: [
      queryKeys.books,
      pagination.page,
      pagination.perPage,
      debouncedFilters.author,
      debouncedFilters.title,
    ],
    queryFn: () => bookApi.getBooks(pagination, debouncedFilters),
  });
};
