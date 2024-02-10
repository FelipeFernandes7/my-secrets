import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

import { ImSpinner10 } from "react-icons/im";
interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const { loadingAuth, user } = useAuth();
  const signed = !!user;
  if (loadingAuth) {
    return (
      <div className="w-full flex items-center justify-center h-screen absolute top-0 bottom-0 left-0 right-0">
        <ImSpinner10 size={40} className="animate-spin text-[#c026d3]" />
      </div>
    );
  }
  if (!signed) {
    return <Navigate to={"/login"} />;
  }
  return children;
}
