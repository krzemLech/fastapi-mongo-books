import { useId } from "react";

import { useUpdateBook, useGetSingleBook } from "@/hooks";
import { useState } from "react";
import { BookIcon } from "../icons/BookIcon";
import { useNavigate } from "react-router";
import { BaseModal } from "./BaseModal";
import { BookForm } from "../forms/BookForm";
import { extractBookFormData } from "../forms/bookFormHelpers";

type UpdateBookModalProps = {
  open: boolean;
  bookId?: string | null;
};

export function UpdateBookModal({ open, bookId }: UpdateBookModalProps) {
  const localId = useId();
  const { mutateAsync: updateBook } = useUpdateBook();
  const { data: book } = useGetSingleBook(bookId as string);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const closeModal = () => {
    navigate("/");
  };

  const handleUpdateBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, author, description, pages } = extractBookFormData(
      e.target as HTMLFormElement
    );
    await updateBook({
      id: bookId as string,
      book: { title, author, description, pages },
    })
      .then(() => {
        navigate("/");
        closeModal();
      })
      .catch((error: Error) => {
        setError(error.message);
      });
  };

  if (error) {
    console.error("error", error);
  }

  return (
    <BaseModal
      open={open}
      title="Update a book"
      error={error}
      icon={<BookIcon className="h-7 w-7 text-rose-500 font-bold" />}
      onClose={() => closeModal()}
    >
      <BookForm
        btnText="Update book"
        localId={localId}
        onSubmit={handleUpdateBook}
        data={book}
      />
    </BaseModal>
  );
}
