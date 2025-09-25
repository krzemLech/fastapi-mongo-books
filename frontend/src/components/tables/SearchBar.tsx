import React from "react";
import { Input } from "../ui/input";
import { CircleUserRound, BookType, AtSign, UserPlus2 } from "lucide-react";
import type { BookFilters, UserFilters } from "@/types";
import { AddButton } from "../buttons/AddButton";
import { modals } from "@/config";

type SearchBarProps =
  | {
      collection: "books";
      filters: BookFilters;
      setFilters: React.Dispatch<React.SetStateAction<BookFilters>>;
    }
  | {
      collection: "users";
      filters: UserFilters;
      setFilters: React.Dispatch<React.SetStateAction<UserFilters>>;
    };

export const SearchBar = ({
  collection,
  filters,
  setFilters,
}: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (collection === "books") {
      setFilters((prev) => ({ ...prev, [name as keyof BookFilters]: value }));
    } else {
      setFilters((prev) => ({ ...prev, [name as keyof UserFilters]: value }));
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div>
        <Input
          name={collection === "books" ? "author" : "name"}
          icon={(props) => <CircleUserRound {...props} />}
          placeholder={
            collection === "books" ? "Filter by author" : "Filter by name"
          }
          value={collection === "books" ? filters.author : filters.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          name={collection === "books" ? "title" : "email"}
          icon={(props) =>
            collection === "books" ? (
              <BookType {...props} />
            ) : (
              <AtSign {...props} />
            )
          }
          placeholder={
            collection === "books" ? "Filter by title" : "Filter by email"
          }
          value={collection === "books" ? filters.title : filters.email}
          onChange={handleChange}
        />
      </div>
      {collection === "users" && (
        <AddButton
          as="link"
          url={`/users?modal=${modals.addUser}`}
          content={<UserPlus2 className="h-5 w-5 stroke-1 stroke-white" />}
        />
      )}
    </div>
  );
};
