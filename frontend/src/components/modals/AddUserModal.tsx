import { useNavigate, useSearchParams } from "react-router";
import { BaseModal } from "./BaseModal";
import { UserForm } from "../forms/UserForm";
import { UserPen } from "lucide-react";

type AddUserModalProps = {
  open: boolean;
};

export const AddUserModal = ({ open }: AddUserModalProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  const closeModal = () => {
    navigate("/users");
  };
  return (
    <BaseModal
      open={open}
      title={userId ? "Edit User" : "Add User"}
      description="Enter user details to create or edit a user."
      icon={<UserPen className="h-7 w-7 text-rose-500 font-bold" />}
      onClose={() => closeModal()}
    >
      <UserForm id={userId} onClose={closeModal} />
    </BaseModal>
  );
};
