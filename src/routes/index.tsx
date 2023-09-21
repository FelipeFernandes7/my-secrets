import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { Spinner } from "../components/spinner";
import * as S from "./styles";
interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const { signed, loadingAuth } = useAuth();
  if (loadingAuth) {
    return (
      <S.SpinnerContainer>
        <Spinner style={{
          width: 300,
          height: 300
        }} />
      </S.SpinnerContainer>
    );
  }
  if (!signed) {
    return <Navigate to={"/login"} />;
  }
  return children;
}
