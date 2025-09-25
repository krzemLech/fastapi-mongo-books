import { useNavigate } from "react-router";
import { BaseModal } from "./BaseModal";
import { RegisterForm } from "../forms/RegisterForm";
import { UserPen } from "lucide-react";

type RegisterModalProps = {
  open: boolean;
};

export const RegisterModal = ({ open }: RegisterModalProps) => {
  const navigate = useNavigate();

  const closeModal = () => {
    navigate("/");
  };

  return (
    <BaseModal
      open={open}
      title="Register"
      description="Enter your details to create an account."
      icon={<UserPen className="h-7 w-7 text-rose-500 font-bold" />}
      onClose={() => closeModal()}
    >
      <RegisterForm onClose={closeModal} />
    </BaseModal>
  );
};
