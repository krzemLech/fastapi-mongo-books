import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash, StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useDeleteBook, useUser, useDeleteUser } from "@/hooks";
import { modals } from "@/config";
import { Link } from "react-router";

type ActionButtonProps = {
  id: string;
  title?: string;
  adding: "book" | "user";
};

export function ActionButton({ id, title, adding }: ActionButtonProps) {
  const { mutate: deleteBook } = useDeleteBook();
  const { mutate: deleteUser } = useDeleteUser();
  const { user } = useUser();

  const handleDelete = (id: string) => {
    if (adding === "book") deleteBook(id);
    if (adding === "user") deleteUser(id);
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            to={`?modal=${
              adding === "book" ? modals.editBook : modals.addUser
            }&id=${id}`}
          >
            <Edit className="text-blue-500" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(id)}>
          <Trash className="text-red-500" />
          Delete
        </DropdownMenuItem>
        {adding === "book" && !!user && (
          <DropdownMenuItem asChild>
            {/* TODO: add conditional rendering for logged in user */}
            <Link to={`?modal=${modals.rating}&id=${id}&title=${title || ""}`}>
              <StarIcon className="text-yellow-500" />
              Rate
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
