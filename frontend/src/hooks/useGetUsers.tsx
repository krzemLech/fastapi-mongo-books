import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/api/users";
import { DEBOUNCE_TIME, queryKeys } from "@/config";
import { useDebounce } from "./useDebounce";
import type { UserFilters } from "@/types";

export const useGetUsers = (filters: UserFilters) => {
  const debouncedFilters = useDebounce(filters, DEBOUNCE_TIME);
  return useQuery({
    queryKey: [queryKeys.users, debouncedFilters.name, debouncedFilters.email],
    queryFn: () => usersApi.getUsers(debouncedFilters),
    staleTime: 1000 * 60 * 6, // 6 minutes
  });
};
