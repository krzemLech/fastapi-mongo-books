import { useId } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddBook } from "@/hooks";
import { useState } from "react";
import { BookIcon } from "../icons/BookIcon";
import { useNavigate } from "react-router";
import { BaseModal } from "./BaseModal";

type AddBookModalProps = {
  open: boolean;
};

export function AddBookModal({ open }: AddBookModalProps) {
  const id = useId();
  const { mutateAsync: addBook } = useAddBook();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const closeModal = () => {
    navigate("/");
  };

  const handleAddBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const description = formData.get("description") as string;
    const pages = formData.get("pages") as string;
    await addBook({ title, author, description, pages: parseInt(pages) })
      .then(() => {
        navigate("/");
        closeModal();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (error) {
    console.error("error", error);
  }

  return (
    <BaseModal
      open={open}
      title="Add a book"
      error={error}
      icon={<BookIcon className="h-7 w-7 text-rose-500 font-bold" />}
      onClose={() => closeModal()}
    >
      <form className="space-y-5" onSubmit={handleAddBook}>
        <div className="space-y-4">
          <div className="*:not-first:mt-2">
            <Input
              id={`${id}-title`}
              label="Title"
              placeholder="Enter book title"
              type="text"
              name="title"
              required
            />
          </div>
          <div className="*:not-first:mt-2">
            <Input
              id={`${id}-author`}
              label="Author"
              placeholder="Enter book author"
              type="text"
              name="author"
              required
            />
          </div>
        </div>
        <div className="*:not-first:mt-2">
          <Input
            id={`${id}-description`}
            label="Description"
            placeholder="Enter book description"
            type="text"
            name="description"
            required
          />
        </div>
        <div className="*:not-first:mt-2">
          <Input
            id={`${id}-pages`}
            label="Pages"
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
    </BaseModal>
  );
}
