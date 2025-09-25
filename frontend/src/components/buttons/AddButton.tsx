import type { ReactNode } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";

type BtnContent = string | ReactNode | ReactNode[];

type LinkProps = {
  as: "link";
  url: string;
  content: BtnContent;
};

type ButtonProps = {
  as: "button";
  onClick: () => void;
  content: BtnContent;
};

type AddButtonProps = LinkProps | ButtonProps;

const classes = {
  button:
    "inline-flex items-center space-x-1 rounded-lg bg-gradient-to-r from-rose-500 to-rose-700 px-4 py-2 text-white transition-all duration-200 hover:shadow-lg",
  link: "inline-flex items-center space-x-1 rounded-lg bg-gradient-to-r from-rose-500 to-rose-700 px-4 py-2 text-white transition-all duration-200 hover:shadow-lg",
};

export const AddButton = (props: AddButtonProps) => {
  const { content, as = "link" } = props;
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      {as === "link" ? (
        <Link className={classes[as]} to={(props as LinkProps).url}>
          {Array.isArray(content) ? content.map((item) => item) : content}
        </Link>
      ) : (
        <button
          className={classes[as]}
          onClick={(props as ButtonProps).onClick}
        >
          {Array.isArray(content) ? content.map((item) => item) : content}
        </button>
      )}
    </motion.div>
  );
};
