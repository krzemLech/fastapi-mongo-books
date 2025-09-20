import { PlusIcon, Book, User } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { modals } from "@/config";

type AddButtonProps = {
  user: boolean;
  variant: "book" | "user";
};

export const AddButton = ({ user, variant }: AddButtonProps) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        className="inline-flex items-center space-x-1 rounded-lg bg-gradient-to-r from-rose-500 to-rose-700 px-4 py-2 text-white transition-all duration-200 hover:shadow-lg cursor-pointer"
        to={`/?modal=${user ? modals.addBook : modals.login}`}
      >
        {variant === "book" ? (
          <Book className="h-4 w-4 stroke-2 stroke-white" />
        ) : (
          <User className="h-4 w-4 stroke-2 stroke-white" />
        )}
        <PlusIcon className="h-4 w-4 stroke-2 stroke-white" />
      </Link>
    </motion.div>
  );
};
