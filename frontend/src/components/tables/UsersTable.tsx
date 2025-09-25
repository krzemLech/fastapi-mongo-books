"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { UserCircle2, AtSign } from "lucide-react";
import { ActionButton } from "../buttons/ActionButton";
import { SearchBar } from "./SearchBar";
import type { UserFilters } from "@/types";
import { useGetUsers } from "@/hooks/useGetUsers";

export const UsersTable = () => {
  const [filters, setFilters] = useState<UserFilters>({
    name: "",
    email: "",
  });
  const { data: users } = useGetUsers(filters);

  return (
    <div className="border-border bg-card/40 rounded-xl border p-3 sm:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-semibold sm:text-xl">Users</h3>
          <p className="text-muted-foreground text-sm">Manage the app users</p>
        </div>
        <div className="flex items-center gap-2">
          <SearchBar
            filters={filters}
            setFilters={setFilters}
            collection="users"
          />
        </div>
      </div>

      <div className="space-y-2">
        {users?.map((user, index) => (
          <div key={user.id}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group hover:bg-accent/50 flex flex-col items-start gap-4 rounded-lg p-4 transition-colors sm:flex-row sm:items-center"
            >
              <div className="flex w-full items-center gap-4 sm:w-auto">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full dark:bg-neutral-800 bg-neutral-200 flex items-center justify-center capitalize">
                    {user.name?.[0] || "-"}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="truncate text-sm font-medium capitalize">
                      {user.name}
                    </h4>
                  </div>
                  <div className="text-muted-foreground mt-1 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex items-center gap-1">
                      <AtSign className="h-3 w-3 text-neutral-300" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UserCircle2 className="h-3 w-3 text-neutral-300" />
                      <span>{user.role}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-auto flex items-center gap-3">
                <div className="text-muted-foreground flex items-center gap-1 text-xs mr-6">
                  <span>{user.active ? "✅" : "❌"}</span>
                  <span>{user.active ? "Active" : "Inactive"}</span>
                </div>
                <ActionButton id={user.id} title={user.name} adding="user" />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

UsersTable.displayName = "UsersTable";
