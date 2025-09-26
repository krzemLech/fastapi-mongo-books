import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ratingApi } from "@/api/ratings";
import { queryKeys } from "@/config";
import type { RatingPayload } from "@/types";

export const useAddRating = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, RatingPayload>({
    mutationFn: ratingApi.addRating,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.books] });
    },
    onError: error => {
      console.error("Error adding rating:", error);
    },
  });
};
