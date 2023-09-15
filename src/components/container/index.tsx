import { ReactNode } from "react";
import { ContainerBox } from "./styles";

interface ContainerProps {
  children: ReactNode;
}
export function Container({ children }: ContainerProps) {
  return <ContainerBox>{children}</ContainerBox>;
}
