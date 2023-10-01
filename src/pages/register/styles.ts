import styled from "styled-components";

export const Container = styled.div`
  position: relative;
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
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 1.5rem;
    height: 3rem;
    background: #7158e2;
    color: #fff;
    font-weight: 700;
    font-size: 0.95rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }
`;

export const ContainerButtonReturn = styled.div`
  position: fixed;
  top: 24px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 1.5rem;
  button{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-weight: 700;
    background: #7158e2;
    color: #ffff;
  }
`;
