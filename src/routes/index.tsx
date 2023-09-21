import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const { signed, loadingAuth } = useAuth();
  if (loadingAuth) {
    return (
      <div>
        <h1>carregando...</h1>
      </div>
    );
  }
  if (!signed) {
    return <Navigate to={"/login"} />;
  }
  return children;
}
