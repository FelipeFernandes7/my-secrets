import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  border-radius: 0.5rem;
  background: #111827;
  width: 100%;
  height: 3.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  transition: all linear 0.3s;
`;
export const InputStyled = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  padding-left: 1rem;
  background: transparent;
  outline: none;
  border: none;
  color: #fff;
  font-family: "Montserrat";
  &::placeholder {
    color: #cbd5e1;
    font-size: 0.875rem;
  }
  &::selection {
    background: red;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.95rem;
  transition: all linear 0.3s;
  .icon {
    &:active {
      transform: scale(0.95);
    }
  }
`;

export const FormLabel = styled.label`
  display: flex;
  width: 100%;
  font-size: 0.875rem;
  font-family: "Montserrat";
  color: #fff;
`;

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
