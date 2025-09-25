import { usersApi } from "@/api/users";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/config";

export const useGetSingleUser = (id?: string | null) => {
  return useQuery({
    queryKey: [queryKeys.users, id],
    queryFn: () => usersApi.getUser(id as string),
    enabled: !!id,
  });
};
