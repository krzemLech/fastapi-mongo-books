import API from "./client";
import type { User, UserFilters } from "@/types";

type UpsertUserPayload = {
  id?: string;
  data: Partial<User>;
};

export const usersApi = {
  getUsers: async (filters: UserFilters): Promise<User[]> => {
    const params = new URLSearchParams();
    if (filters.name) params.append("name", filters.name);
    if (filters.email) params.append("email", filters.email);
    return API.get("/api/v1/users/?" + params.toString(), {});
  },
  getUser: async (userId: string): Promise<User> => {
    return API.get(`/api/v1/users/${userId}`, {});
  },
  upsertUser: async ({ id, data }: UpsertUserPayload): Promise<User> => {
    const body = JSON.stringify(data);
    if (id) return API.put(`/api/v1/users/${id}`, { body });
    return API.post(`/api/v1/users/`, { body });
  },
  updateUser: async (userId: string, data: Partial<User>): Promise<User> => {
    return API.put(`/api/v1/users/${userId}`, {
      body: JSON.stringify(data),
    });
  },
  deleteUser: async (userId: string): Promise<void> => {
    return API.delete(`/api/v1/users/${userId}`, {});
  },
  deactivateUser: async (userId: string) => {
    return API.put(`/api/v1/users/active/${userId}`, {
      body: JSON.stringify({ active: false }),
    });
  },
  activeUser: async (userId: string) => {
    return API.put(`/api/v1/users/active/${userId}`, {
      body: JSON.stringify({ active: true }),
    });
  },
};
