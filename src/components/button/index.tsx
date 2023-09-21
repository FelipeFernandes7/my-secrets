import { ButtonHTMLAttributes } from "react";
import * as S from "./styles";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  color?: string;
  bgColor?: string;
  icon?: JSX.Element;
}

export function Button({ label, color, bgColor, icon, ...rest }: ButtonProps) {
  return (
    <S.ButtonStyled icon={icon} bgColor={bgColor} color={color} {...rest}>
      {label}
    </S.ButtonStyled>
  );
}
