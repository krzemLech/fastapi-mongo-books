import { useId } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type modalType } from "@/config";
import { useAddBook } from "@/hooks";
import { useState } from "react";
import { BookIcon } from "../icons/BookIcon";

type AddBookModalProps = {
  open: boolean;
  toggleModal: (modal: modalType | null) => void;
};

export function AddBookModal({ open, toggleModal }: AddBookModalProps) {
  const id = useId();
  const { mutateAsync: addBook } = useAddBook();
  const [error, setError] = useState<string | null>(null);

  const handleAddBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const description = formData.get("description") as string;
    const pages = formData.get("pages") as string;
    await addBook({ title, author, description, pages: parseInt(pages) })
      .then(() => {
        toggleModal(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (error) {
    console.error("error", error);
  }

  return (
    <Dialog open={open} onOpenChange={() => toggleModal(null)}>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <BookIcon className="h-7 w-7 text-rose-500 font-bold" />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">Add a book</DialogTitle>
            <DialogDescription className="sm:text-center text-red-600 text-xs">
              {error}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5" onSubmit={handleAddBook}>
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input
                id={`${id}-title`}
                placeholder="Enter book title"
                type="text"
                name="title"
                required
              />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-author`}>Author</Label>
              <Input
                id={`${id}-author`}
                placeholder="Enter book author"
                type="text"
                name="author"
                required
              />
            </div>
          </div>
          <div className="*:not-first:mt-2">
            <Label htmlFor={`${id}-description`}>Description</Label>
            <Input
              id={`${id}-description`}
              placeholder="Enter book description"
              type="text"
              name="description"
              required
            />
          </div>
          <div className="*:not-first:mt-2">
            <Label htmlFor={`${id}-pages`}>Pages</Label>
            <Input
              id={`${id}-pages`}
              placeholder="Enter book pages"
              type="number"
              name="pages"
              required
              min={1}
            />
          </div>
          <Button
            type="submit"
            className="w-full cursor-pointer hover:bg-rose-500/90 bg-rose-500"
          >
            Add book
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
