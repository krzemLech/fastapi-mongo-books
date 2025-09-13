import { bookApi } from "@/api/books";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/config";

export const useGetSingleBook = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.books, id],
    queryFn: () => bookApi.getBook(id),
    enabled: !!id,
  });
};
