import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBook } from "../api/books";
import { queryKeys } from "@/config";

export const useAddBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.books] });
    },
  });
};
