export type PaginationParams = {
  page: number;
  perPage: number;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  pages: number;
  created_at: string;
  updated_at: string;
  average_rating?: number;
  ratings_count?: number;
};

export type Tables = "books" | "users";

export type Filters =
  | {
      table: "books";
      author: string;
      title: string;
    }
  | {
      table: "users";
      name: string;
      email: string;
    };

export type RatingPayload = {
  bookId: string;
  userId: string;
  rating: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  age: number;
  role: "user" | "admin";
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type UserFilters = {
  name?: string;
  email?: string;
};

export type BookFilters = {
  author?: string;
  title?: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  age: number;
};
