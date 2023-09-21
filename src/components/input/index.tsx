/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLProps } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import * as S from "./styles";
import { FieldError, UseFormRegister } from "react-hook-form";
interface InputProps extends HTMLProps<HTMLInputElement> {
  type: "email" | "password" | "text" | "number";
  color?: string;
  placeholder: string;
  handleSeePassword?: () => void;
}

type TextFieldProps = {
  label?: string;
  error?: FieldError | undefined;
  name?: string;
  register?: UseFormRegister<any>;
} & InputProps;

export function Input({
  type,
  color,
  label,
  name,
  error,
  placeholder,
  register,
  handleSeePassword,
  ...rest
}: TextFieldProps) {
  return (
    <S.FormControl>
      {!!label && (
        <S.FormLabel color={color} htmlFor={name}>
          {label}
        </S.FormLabel>
      )}
      <S.Container borderColor={error && "#dc2626"}>
        {register && name ? (
          <S.InputStyled
            errorColor={error && "#dc2626"}
            type={type}
            placeholder={placeholder}
            {...(label ? { id: name } : {})}
            {...register(
              name,
              type === "number" ? { valueAsNumber: true } : {}
            )}
            {...rest}
          />
        ) : (
          <S.InputStyled
            type={type}
            errorColor={error && "#dc2626"}
            placeholder={placeholder}
            {...rest}
            {...(label ? { id: name } : {})}
            {...rest}
          />
        )}
        <S.IconContainer errorColor={error && "#dc2626"}>
          {type === "email" ? (
            <HiOutlineMail size={24} className={"icon"} />
          ) : type === "text" ? (
            <AiOutlineEye
              className={"icon"}
              size={24}
              onClick={handleSeePassword}
              cursor={"pointer"}
            />
          ) : (
            <AiOutlineEyeInvisible
              size={24}
              className={"icon"}
              onClick={handleSeePassword}
              cursor={"pointer"}
            />
          )}
        </S.IconContainer>
      </S.Container>
      {!!error && <S.FormErrorMessage>{error?.message}</S.FormErrorMessage>}
    </S.FormControl>
  );
}
