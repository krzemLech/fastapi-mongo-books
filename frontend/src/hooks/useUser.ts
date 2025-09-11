import { useQuery } from "@tanstack/react-query";
import { auth } from "../api/auth";
import { getToken } from "../api/client";
import { queryKeys, USER_CACHE_TIME } from "@/config";

export const useUser = () => {
  return useQuery({
    queryKey: [queryKeys.user],
    queryFn: auth.getUser,
    enabled: !!getToken(),
    staleTime: USER_CACHE_TIME,
  });
};
