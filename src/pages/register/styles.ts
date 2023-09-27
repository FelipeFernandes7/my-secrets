import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Form = styled.form`
  margin-top: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-right: 1rem;
  padding-left: 1rem;
  h1 {
    font-weight: 400;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const FormContent = styled.div`
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  button {
    text-align: center;
    margin-top: 1.5rem;
    height: 3rem;
    background: #fff;
    font-weight: 700;
    font-size: 0.95rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }
`;

export const AvatarField = styled.input`
  width: 100%;
  height: 3.2rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  padding-left: 1rem;
  padding-top: 1rem;
  background: transparent;
  outline: none;
  border: 1px dashed #cbd5e1;
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
