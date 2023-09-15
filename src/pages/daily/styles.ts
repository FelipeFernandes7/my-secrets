import { styled } from "styled-components";

export const DailyContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const Title = styled.div`
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 1.5rem;
  h1 {
    font-size: 2rem;
    font-weight: 400;
    white-space: pre-wrap;
  }
`;

export const Form = styled.form`
  padding: 0.5rem;
  width: 100%;
  margin-top: 1.5rem;
  height: 100%;
  border-radius: 1.5rem;
  background-color: rgb(15 23 42);
  p {
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    font-size: 1.3rem;
    font-weight: 400;
    white-space: break-spaces;
  }
`;

export const FormContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  textarea {
    margin-top: 1.5rem;
    background-color: rgb(2 6 23);
    color: #fff;
    border-radius: 1rem;
    width: 100%;
    height: 3rem;
    padding: 10px;
    font-size: 16px;
    background-color: rgb(2 6 23);
    border: 1px solid rgb(30 41 59);
    transition: height 0.3s ease;
    font-family: "Montserrat";
    overflow-y: hidden;
    resize: none;
    &:focus {
      height: 10rem;
    }
    &::placeholder {
      color: #f1f1f1;
    }
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1.5rem;
`;

export const BtnContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  button {
    width: 30%;
    color: #fff;
    font-size: 0.95rem;
    height: 3rem;
    border: 2px solid rgb(30 41 59);
    background: transparent;
    border-radius: 1rem;
    cursor: pointer;
  }
`;
