import { useMutation } from "@tanstack/react-query";
import { auth } from "../api/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: auth.login,
  });
};
