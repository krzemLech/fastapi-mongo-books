import { Navigate } from "react-router";
import { useUser } from "@/hooks/useUser";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAdmin?: boolean;
};

export const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const { user, isLoading, noToken } = useUser();

  if ((!user && !isLoading) || (noToken && !isLoading)) {
    return <Navigate to="/404" replace />;
  }

  if (requireAdmin && user?.role !== "admin" && !isLoading) {
    return <Navigate to="/404" replace />;
  }

  return <>{children}</>;
};
