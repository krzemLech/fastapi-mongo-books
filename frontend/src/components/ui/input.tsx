import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

function Input({
  className,
  type,
  id,
  label,
  icon,
  ...props
}: React.ComponentProps<"input"> & {
  label?: string;
  icon?: (props: { className?: string }) => React.ReactNode;
}) {
  return (
    <div className="relative group">
      {label && <Label htmlFor={id}>{label}</Label>}
      {icon && (
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2  pointer-events-none">
          {icon({
            className: "h-4 w-4 text-gray-600 group-focus-within:text-rose-500",
          })}
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-gray-600 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
          "focus-visible:border-rose-600 focus-visible:ring-rose-500/50 focus-visible:rose-500-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          icon ? "pl-8" : "pl-3",
          className
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
