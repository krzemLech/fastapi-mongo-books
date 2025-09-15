import React from "react";
import { Input } from "../ui/input";
import { CircleUserRound, BookType } from "lucide-react";

type SearchBarProps = {
  filters: { author: string; title: string };
  setFilters: React.Dispatch<
    React.SetStateAction<{ author: string; title: string }>
  >;
};

export const SearchBar = ({ filters, setFilters }: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center gap-2">
      <div>
        <Input
          name="author"
          icon={(props) => <CircleUserRound {...props} />}
          placeholder="Filter by author"
          value={filters.author}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          name="title"
          icon={(props) => <BookType {...props} />}
          placeholder="Filter by title"
          value={filters.title}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
