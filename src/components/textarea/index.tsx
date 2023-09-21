import { TextareaHTMLAttributes } from "react";
import { StyledTextarea } from "./styles";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
export function Textarea({ ...rest }: TextareaProps) {
  return <StyledTextarea {...rest} />;
}
