"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Book } from "lucide-react";

import { Calendar, MessageCircle, UserCircle2 } from "lucide-react";
import { useGetBooks } from "@/hooks/useGetBooks";
import { ActionButton } from "./buttons/ActionButton";

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
          <div key={book.id}>
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group hover:bg-accent/50 flex flex-col items-start gap-4 rounded-lg p-4 transition-colors sm:flex-row sm:items-center"
            >
              <div className="flex w-full items-center gap-4 sm:w-auto">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full dark:bg-neutral-800 bg-neutral-200 flex items-center justify-center">
                    {book.author?.[0] || "A"}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="truncate text-sm font-medium">
                      {book.title}
                    </h4>
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
                <ActionButton id={book.id} />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
});

UsersTable.displayName = "UsersTable";
