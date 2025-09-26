// import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNotification, useRegisterUser } from "@/hooks";

type UserFormProps = {
  onClose: () => void;
};
type RegisterData = {
  name: string;
  email: string;
  password: string;
  age: number;
};

const defaultUser: RegisterData = {
  name: "",
  email: "",
  password: "",
  age: 0,
};

export const RegisterForm = ({ onClose }: UserFormProps) => {
  const [registerData, setRegisterData] = useState<RegisterData>(defaultUser);
  const { mutateAsync: registerUser, error } = useRegisterUser();
  const { showSuccess } = useNotification();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid =
    registerData.name &&
    registerData.email &&
    registerData.age &&
    registerData.password;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    registerUser(registerData).then(() => {
      showSuccess("User registered successfully");
      onClose();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="text-red-500">{error.message}</p>}
      <div>
        <Input
          id="user-name"
          label="Name"
          placeholder="Enter user name"
          type="text"
          name="name"
          required
          value={registerData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          id="user-email"
          label="Email"
          placeholder="Enter user email"
          type="email"
          name="email"
          required
          value={registerData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          id="user-password"
          label="Password"
          placeholder="Enter user password"
          type="password"
          name="password"
          value={registerData.password}
          onChange={handleChange}
          required
        />
      </div>

      <Input
        id="user-age"
        label="Age"
        placeholder="Age"
        type="number"
        name="age"
        required
        className="w-full h-11 min-w-36"
        value={registerData.age}
        onChange={handleChange}
      />
      <Button type="submit" className="w-full" disabled={!isFormValid}>
        Register
      </Button>
    </form>
  );
};
