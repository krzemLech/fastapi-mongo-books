import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookApi } from "@/api/books";
import { queryKeys } from "@/config";

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bookApi.deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.books] });
    },
  });
};
