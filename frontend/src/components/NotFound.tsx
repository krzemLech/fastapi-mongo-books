import { Link } from "react-router";
import { ChevronsLeft } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <div>
        <h1 className="text-[14rem] font-bold text-rose-600 dark:text-rose-600 -translate-x-24 translate-y-24">
          404
        </h1>
        <h2 className="text-5xl font-semibold text-gray-900/70 dark:text-gray-100 translate-x-12 -translate-y-7">
          Page Not Found
        </h2>
      </div>
      <Link
        to="/"
        className="text-red-500 rounded-lg hover:text-red-700  flex gap-1 items-center justify-center cursor-pointer z-1 transition-colors"
      >
        <ChevronsLeft className="mr-2 h-4 w-4" />
        Go Home
      </Link>
    </div>
  );
};
