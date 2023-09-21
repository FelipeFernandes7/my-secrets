import { styled } from "styled-components";

export const ButtonStyled = styled.button<{
  icon?: JSX.Element;
  bgColor?: string;
}>`
  display: flex;
  justify-content: ${(props) => (props.icon ? "flex-end" : "center")};
  align-items: center;
  font-size: 0.875rem;
  font-family: "Montserrat";
  font-weight: 400;
  color: #ffffff;
  background: ${(props) => (props.bgColor ? props.bgColor : "#2563eb")};
  border: none;
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
`;
