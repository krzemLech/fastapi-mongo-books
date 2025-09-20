import { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Star } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useAddRating } from "@/hooks";

type RatingModalProps = {
  isOpen: boolean;
};

export const RatingModal = ({ isOpen }: RatingModalProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get("id")!;
  const bookTitle = searchParams.get("title");

  const { mutateAsync: submitRating, error, reset } = useAddRating();

  const { user } = useUser();

  const handleStarHover = (rating: number) => {
    setHoveredStar(rating);
  };

  const handleStarClick = (rating: number) => {
    setRating(rating);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitRating({ bookId, userId: user.id, rating })
      .then(() => {
        setRating(0);
        setHoveredStar(0);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error submitting rating:", error);
      });
  };

  const handleClose = () => {
    reset();
    navigate("/");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        onMouseLeave={() => setHoveredStar(0)}
        className="max-w-sm"
      >
        <div className="flex gap-2">
          <p className="text-md font-light">Rate "{bookTitle}"</p>
        </div>
        {error && (
          <p className="text-red-600 text-xs text-center">{error.message}</p>
        )}
        <form
          className="mt-4 flex gap-1 text-yellow-400"
          onSubmit={handleSubmit}
        >
          <Star
            onMouseEnter={() => handleStarHover(1)}
            onClick={() => handleStarClick(1)}
            className={cn(
              "text-gray-400",
              (hoveredStar >= 1 || rating >= 1) && "text-yellow-400",
              rating >= 1 && "fill-yellow-400"
            )}
          />
          <Star
            onMouseEnter={() => handleStarHover(2)}
            onClick={() => handleStarClick(2)}
            className={cn(
              "text-gray-400",
              (hoveredStar >= 2 || rating >= 2) && "text-yellow-400",
              rating >= 2 && "fill-yellow-400"
            )}
          />
          <Star
            onMouseEnter={() => handleStarHover(3)}
            onClick={() => handleStarClick(3)}
            className={cn(
              "text-gray-400",
              (hoveredStar >= 3 || rating >= 3) && "text-yellow-400",
              rating >= 3 && "fill-yellow-400"
            )}
          />
          <Star
            onMouseEnter={() => handleStarHover(4)}
            onClick={() => handleStarClick(4)}
            className={cn(
              "text-gray-400",
              (hoveredStar >= 4 || rating >= 4) && "text-yellow-400",
              rating >= 4 && "fill-yellow-400"
            )}
          />
          <Star
            onMouseEnter={() => handleStarHover(5)}
            onClick={() => handleStarClick(5)}
            className={cn(
              "text-gray-400",
              (hoveredStar >= 5 || rating >= 5) && "text-yellow-400",
              rating >= 5 && "fill-yellow-400"
            )}
          />
          <Button
            variant="outline"
            className="ml-auto cursor-pointer -translate-y-2 translate-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={rating === 0}
          >
            Submit Rating
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
