import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash, StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useDeleteBook } from "@/hooks";
import { modals } from "@/config";
import { Link } from "react-router";

export function ActionButton({ id }: { id: string }) {
  const { mutate: deleteBook } = useDeleteBook();
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
          <Link to={`?modal=${modals.editBook}&id=${id}`}>
            <Edit className="text-blue-500" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteBook(id)}>
          <Trash className="text-red-500" />
          Delete
        </DropdownMenuItem>
        {/* TODO: add conditional rendering for logged in user */}
        <DropdownMenuItem asChild>
          <Link to={`?modal=${modals.rateBook}&id=${id}`}>
            <StarIcon className="text-yellow-500" />
            Rate
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
