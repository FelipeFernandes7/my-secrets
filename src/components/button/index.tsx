import { ButtonHTMLAttributes } from "react";
import * as S from "./styles";
import { Spinner } from "../spinner";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  color?: string;
  bgColor?: string;
  icon?: JSX.Element;
  isLoading?: boolean;
}

export function Button({
  label,
  color,
  bgColor,
  icon,
  isLoading,
  ...rest
}: ButtonProps) {
  return (
    <S.ButtonStyled
      icon={icon}
      style={{ color, backgroundColor: bgColor }}
      {...rest}
    >
      {isLoading ? <Spinner style={{ width: 80, height: 80 }} /> : label}
    </S.ButtonStyled>
  );
}
