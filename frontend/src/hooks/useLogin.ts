import { useMutation, useQueryClient } from "@tanstack/react-query";
import { auth } from "../api/auth";
import { queryKeys } from "@/config";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const login = useMutation({
    mutationFn: auth.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
    },
  });
  const logout = useMutation({
    mutationFn: auth.logout,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: [queryKeys.user],
        exact: true,
      });
    },
  });
  return { mutateAsync: login.mutateAsync, logout: logout.mutateAsync };
};
