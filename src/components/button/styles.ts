import { styled } from "styled-components";

export const ButtonStyled = styled.button<{
  icon?: JSX.Element;
  color?: string;
  bgColor?: string;
}>`
  display: flex;
  justify-content: ${(props) => (props.icon ? "flex-end" : "center")};
  align-items: center;
  font-size: 0.875rem;
  font-family: "Montserrat";
  font-weight: 700;
  color: ${props => (props.color ? props.color : "#fff")};
  background: ${(props) => (props.bgColor ? props.bgColor : "#2563eb")};
  border: none;
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
  transition: all linear 0.3s;
  &:disabled{
   background: transparent;
   border: 1px solid #fff;
   cursor: not-allowed;
   color: #fff;
    &:active{
      transform: none;
    }
  }
`;
