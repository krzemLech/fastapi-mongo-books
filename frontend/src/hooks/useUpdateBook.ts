import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookApi, type Book } from "../api/books";
import { queryKeys } from "@/config";

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, book }: { id: string; book: Book }) =>
      bookApi.updateBook(id, book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.books] });
    },
  });
};
