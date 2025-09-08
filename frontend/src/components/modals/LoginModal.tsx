import { useId } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { modals, type modalType } from "@/config";
import { useLogin } from "@/hooks/useLogin";
import { useState } from "react";
import { BookIcon } from "../icons/BookIcon";

type LoginModalProps = {
  open: boolean;
  toggleModal: (modal: modalType | null) => void;
};

export function LoginModal({ open, toggleModal }: LoginModalProps) {
  const id = useId();
  const { mutateAsync: login } = useLogin();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handleLogin");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await login({ email, password })
      .then(() => {
        toggleModal(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (error) {
    console.error("error", error);
  }

  return (
    <Dialog open={open} onOpenChange={() => toggleModal(null)}>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <BookIcon className="h-7 w-7 text-rose-500 font-bold" />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Login to your account
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              Enter your credentials to login to your account.
            </DialogDescription>
            <DialogDescription className="sm:text-center text-red-600 text-xs">
              {error}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input
                id={`${id}-email`}
                placeholder="Enter your email"
                type="email"
                name="email"
                required
              />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                id={`${id}-password`}
                placeholder="Enter your password"
                type="password"
                name="password"
                required
              />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id={`${id}-remember`} />
              <Label
                htmlFor={`${id}-remember`}
                className="text-muted-foreground font-normal"
              >
                Remember me
              </Label>
            </div>
            <button
              className="text-sm cursor-pointer text-rose-600 hover:text-rose-500"
              onClick={() => toggleModal(modals.register)}
            >
              Sign up instead
            </button>
          </div>
          <Button
            type="submit"
            className="w-full cursor-pointer hover:bg-rose-500/90 bg-rose-500"
          >
            Sign in
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
