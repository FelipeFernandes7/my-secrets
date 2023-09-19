import { HTMLProps } from "react";
import { IconContainer, InputStyled, InputWrapper } from "./styles";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

interface InputProps extends HTMLProps<HTMLInputElement> {
  type: "email" | "password" | "text";
  handleSeePassword?: () => void;
}
export function Input({ type, handleSeePassword, ...rest }: InputProps) {
  return (
    <InputWrapper>
      <InputStyled {...rest} type={type} />
      <IconContainer>
        {type === "email" ? (
          <HiOutlineMail size={24} />
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
      </IconContainer>
    </InputWrapper>
  );
}
