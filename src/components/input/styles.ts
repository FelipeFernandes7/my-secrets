import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  border-radius: 0.95rem;
  background-color: #020617;
  width: 100%;
  height: 3.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  transition: all linear 0.3s;
`;
export const InputStyled = styled.input`
  width: 100%;
  height: 3.5rem;
  font-size: 1rem;
  background: transparent;
  outline: none;
  border: none;
  color: #fff;
  font-family: "Montserrat";
  &::placeholder {
    color: #cbd5e1;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 0.5rem;
  .icon {
    color: #fff;
    &:active {
      transform: scale(0.95);
    }
  }
`;
