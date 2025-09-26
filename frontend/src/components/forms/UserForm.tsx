// import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { CheckboxColor } from "./CheckboxColor";
import { Button } from "../ui/button";
import { useUpsertUser, useGetSingleUser } from "@/hooks";

type UserFormProps = {
  id?: string | null;
  onClose: () => void;
};
type UserData = {
  name: string;
  email: string;
  password?: string;
  age: number;
  isAdmin: boolean;
  active: boolean;
};

const defaultUser: UserData = {
  name: "",
  email: "",
  password: "",
  age: 0,
  isAdmin: false,
  active: false,
};

export const UserForm = ({ id, onClose }: UserFormProps) => {
  const [userData, setUserData] = useState<UserData>(defaultUser);
  const { mutateAsync: upsertUser, error: upsertUserError } = useUpsertUser();
  const { data: user, error: getUserError } = useGetSingleUser(id);

  useEffect(() => {
    if (user) {
      setUserData({ ...user, isAdmin: user.role === "admin", password: "" });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckedChange = (name: string, checked: boolean) => {
    setUserData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postUser = {
      name: userData.name,
      email: userData.email,
      age: Number(userData.age),
      role: (userData.isAdmin ? "admin" : "user") as "user" | "admin",
      active: userData.active,
    };

    if (userData.password) {
      Object.assign(postUser, { password: userData.password });
    }

    await upsertUser({ id: id || undefined, data: postUser });
    onClose();
  };

  const error = upsertUserError || getUserError;

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
          value={userData.name}
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
          value={userData.email}
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
          value={userData.password}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-2">
        <CheckboxColor
          id="is-admin"
          label="is Admin"
          name="isAdmin"
          checked={userData.isAdmin}
          onCheckedChange={checked => handleCheckedChange("isAdmin", checked)}
        />
        <CheckboxColor
          id="user-active"
          label="Active"
          name="isActive"
          checked={userData.active}
          onCheckedChange={checked => {
            handleCheckedChange("active", checked);
          }}
        />
        <Input
          id="user-age"
          placeholder="Age"
          type="number"
          name="age"
          required
          className="w-full h-11 min-w-36"
          value={userData.age}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" className="w-full">
        {id ? "Update User" : "Add User"}
      </Button>
    </form>
  );
};
