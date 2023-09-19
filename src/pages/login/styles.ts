import { styled } from "styled-components";

export const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Section = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #020617;
  z-index: -1;
  height: 17rem;
  span {
    margin-top: 1.5rem;
    margin-bottom: 1.2rem;
  }
`;
export const ContentStyled = styled.div`
  z-index: 1;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  form {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    display: flex;
    flex-direction: column;
    border-radius: 1.5rem 1.5rem 0 0;
    width: 100%;
    height: 100vh;
    background-color: rgb(15 23 42);
    h1 {
      text-align: center;
      width: 100%;
      margin-top: 1.5rem;
      font-size: 2rem;
      font-weight: 400;
      font-family: "Montserrat";
      margin-bottom: 1.2rem;
    }
  }
`;
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
  button {
    bottom: 1.5rem;
    width: 100%;
    height: 3rem;
    align-items: center;
    justify-content: center;
    background: #1d4ed8;
    border: none;
    border-radius: 0.75rem;
    font-size: 0.95rem;
    color: #fff;
  }
`;
