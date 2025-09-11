"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MessageCircle,
  MoreHorizontal,
  UserCircle2,
} from "lucide-react";
import { useGetBooks } from "@/hooks/useGetBooks";

export const UsersTable = memo(() => {
  const { data: books = [] } = useGetBooks();

  return (
    <div className="border-border bg-card/40 rounded-xl border p-3 sm:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-semibold sm:text-xl">Books</h3>
          <p className="text-muted-foreground text-sm">
            Best and classic books in an alphabetical order
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Book />
        </div>
      </div>

      <div className="space-y-2">
        {books.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group hover:bg-accent/50 flex flex-col items-start gap-4 rounded-lg p-4 transition-colors sm:flex-row sm:items-center"
          >
            <div className="flex w-full items-center gap-4 sm:w-auto">
              <div className="relative">
                {/* <img
                  src=""
                  alt={book.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                /> */}
                {/* <div
                  className={`border-background absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 ${
                    book.good === "active" ? "bg-green-500" : "bg-red-500"
                  }`}
                /> */}
                <div className="h-10 w-10 rounded-full dark:bg-neutral-800 bg-neutral-200 flex items-center justify-center">
                  {book.author?.[0] || "A"}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="truncate text-sm font-medium">{book.title}</h4>
                  {/* <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      user.role === "Admin"
                        ? "bg-purple-500/10 text-purple-500"
                        : user.role === "Moderator"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-gray-500/10 text-gray-500"
                    }`}
                  >
                    {user.role}
                  </span> */}
                </div>
                <div className="text-muted-foreground mt-1 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex items-center gap-1">
                    <UserCircle2 className="h-3 w-3 text-neutral-300" />
                    <span className="truncate">{book.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3 text-neutral-300" />
                    <span>{book.description}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <Calendar className="h-3 w-3" />
                <span>{new Date(book.created_at).toLocaleDateString()}</span>
              </div>

              <Button variant="ghost" size="sm" className="ml-auto">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

UsersTable.displayName = "UsersTable";
