import styled from "styled-components";

export const Container = styled.div<{ borderColor?: string }>`
  display: flex;
  border-radius: 0.5rem;
  border: ${(props) =>
    props.borderColor ? `1px solid ${props.borderColor}` : "none"};
  background-color: #111827;
  width: 100%;
  height: 3.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  transition: all linear 0.3s;
`;
export const InputStyled = styled.input<{ errorColor?: string }>`
  width: 100%;
  height: 3.2rem;
  font-size: 0.875rem;
  padding-left: 1rem;
  background: transparent;
  outline: none;
  border: none;
  color: #fff;
  font-family: "Montserrat";
  &::placeholder {
    color: ${(props) => (props.errorColor ? props.errorColor : "#cbd5e1")};
    font-size: 0.875rem;
  }
`;

export const IconContainer = styled.div<{ errorColor?: string }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.95rem;
  transition: all linear 0.3s;
  .icon {
    color: ${(props) => (props.errorColor ? props.errorColor : "#fff")};
    &:active {
      transform: scale(0.95);
    }
  }
`;

export const FormLabel = styled.label<{ color?: string }>`
  display: flex;
  width: 100%;
  font-size: 0.875rem;
  font-family: "Montserrat";
  color: ${(props) => props.color};
`;

export const FormControl = styled.form`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0;
`;

export const FormErrorMessage = styled.p`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  font-size: 0.75rem;
  color: #dc2626;
`;
