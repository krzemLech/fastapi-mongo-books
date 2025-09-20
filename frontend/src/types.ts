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

export type Filters = {
  author: string;
  title: string;
};

export type RatingPayload = {
  bookId: string;
  userId: string;
  rating: number;
};
