import { useId } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { modals } from "@/config";
import { useLogin } from "@/hooks/useLogin";
import { useState } from "react";
import { BookIcon } from "../icons/BookIcon";
import { useNavigate, Link } from "react-router";
import { BaseModal } from "./BaseModal";

type LoginModalProps = {
  open: boolean;
};

export function LoginModal({ open }: LoginModalProps) {
  const id = useId();
  const navigate = useNavigate();
  const { mutateAsync: login } = useLogin();
  const [error, setError] = useState<string | null>(null);

  const closeModal = () => {
    navigate("/");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await login({ email, password })
      .then(() => {
        closeModal();
      })
      .catch((error) => {
        console.warn("error:", error);
        setError(error.message);
      });
  };

  return (
    <BaseModal
      open={open}
      title="Login to your account"
      description="Enter your credentials to login to your account."
      error={error}
      icon={<BookIcon className="h-7 w-7 text-rose-500 font-bold" />}
      onClose={() => closeModal()}
    >
      <form className="space-y-5" onSubmit={handleLogin}>
        <div className="space-y-4">
          <div className="*:not-first:mt-2">
            <Input
              id={`${id}-email`}
              label="Email"
              placeholder="Enter your email"
              type="email"
              name="email"
              required
            />
          </div>
          <div className="*:not-first:mt-2">
            <Input
              id={`${id}-password`}
              label="Password"
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
          <Link
            className="text-sm cursor-pointer text-rose-600 hover:text-rose-500"
            to={`/?modal=${modals.register}`}
          >
            Sign up instead
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer hover:bg-rose-500/90 bg-rose-500"
        >
          Sign in
        </Button>
      </form>
    </BaseModal>
  );
}
