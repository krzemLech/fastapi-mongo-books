import type { RatingPayload } from "@/types";
import API from "./client";

export const ratingApi = {
  addRating: async (payload: RatingPayload) => {
    return API.post("/api/v1/ratings/", {
      body: JSON.stringify({
        book_id: payload.bookId,
        user_id: payload.userId,
        rating: payload.rating,
      }),
    });
  },
};
