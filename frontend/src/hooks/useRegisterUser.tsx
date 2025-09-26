import { useMutation } from "@tanstack/react-query";
import { auth } from "../api/auth";
import type { RegisterData } from "@/types";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => auth.register(data),
    onError: error => {
      console.error("Error registering user:", error);
      throw error;
    },
  });
};
