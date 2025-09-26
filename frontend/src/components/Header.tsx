"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { BookOpenIcon, UserPen, BookPlus } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { modals } from "@/config";
import { useLogin, useUser } from "@/hooks";
import { Link } from "react-router";
import { AddButton } from "./buttons/AddButton";
import { useNavigate } from "react-router";

export default function Header1() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser();
  const { logout } = useLogin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerVariants = {
    initial: { y: 0, opacity: 1 },
    animate: { y: 0, opacity: 1 },
    scrolled: {
      backdropFilter: "blur(20px)",
      backgroundColor: "transparent",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
      variants={headerVariants}
      initial="initial"
      animate={isScrolled ? "scrolled" : "initial"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        backdropFilter: "blur(20px)",
        backgroundColor: "transparent",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link to="/">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-rose-700">
                  <BookOpenIcon className="h-5 w-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-xl font-bold text-transparent">
                  Book List App
                </span>
              </div>
            </Link>
          </motion.div>

          <div className="hidden items-center space-x-4 lg:flex">
            <ModeToggle />
            {user ? (
              <>
                <button
                  className="text-foreground font-medium transition-colors duration-200 hover:text-rose-500 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout {user.name}
                </button>
                <AddButton
                  as="link"
                  url={`/?modal=${modals.addBook}`}
                  content={
                    <BookPlus className="h-4 w-4 stroke-2 stroke-white" />
                  }
                />
              </>
            ) : (
              <Link
                className="text-foreground font-medium transition-colors duration-200 hover:text-rose-500 cursor-pointer border px-4 py-1 rounded-md border-gray-600"
                to={`/?modal=${modals.login}`}
              >
                Sign In
              </Link>
            )}
            {user?.role === "admin" && (
              <AddButton
                as="link"
                url={`/users`}
                content={<UserPen className="h-4 w-4 stroke-2 stroke-white" />}
              />
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
