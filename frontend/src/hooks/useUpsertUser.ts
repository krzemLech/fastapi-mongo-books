import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../api/users";
import { queryKeys } from "@/config";

export const useUpsertUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersApi.upsertUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
    },
  });
};
