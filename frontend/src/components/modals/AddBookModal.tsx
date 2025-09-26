import { useId } from "react";
import { useAddBook } from "@/hooks";
import { useState } from "react";
import { BookIcon } from "../icons/BookIcon";
import { useNavigate } from "react-router";
import { BaseModal } from "./BaseModal";
import { BookForm } from "../forms/BookForm";
import { extractBookFormData } from "../forms/bookFormHelpers";

type AddBookModalProps = {
  open: boolean;
};

export function AddBookModal({ open }: AddBookModalProps) {
  const localId = useId();
  const { mutateAsync: addBook } = useAddBook();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const closeModal = () => {
    navigate("/");
  };

  const handleAddBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, author, description, pages } = extractBookFormData(
      e.target as HTMLFormElement
    );
    await addBook({ title, author, description, pages })
      .then(() => {
        navigate("/");
        closeModal();
      })
      .catch(error => {
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
      <BookForm btnText="Add book" localId={localId} onSubmit={handleAddBook} />
    </BaseModal>
  );
}
