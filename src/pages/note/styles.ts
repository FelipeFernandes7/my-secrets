import { styled } from "styled-components";

export const NoteContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  @media screen and (max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
  margin-top: 1.5rem;
  height: 100%;
  border-radius: 1.5rem;
  transition: all linear 0.3s;
  background: #181818;
  @media screen and (max-width: 768px) {
    border-radius: 2rem 2rem 0 0;
  }
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
  flex-direction: column;
  justify-content: center;
  input {
    margin-top: 1.5rem;
    background:#141414;
    color: #fff;
    border-radius: 0.5rem;
    width: 100%;
    height: 3rem;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #3d3d3d;
    transition: height 0.3s ease;
    font-family: "Montserrat";
    overflow-y: hidden;
    resize: none;
    &::placeholder {
      color: #f1f1f1;
    }
  }
  textarea {
    margin-top: 1.5rem;
    background:#141414;
    color: #fff;
    border-radius: 0.5rem;
    width: 100%;
    height: 3rem;
    padding: 10px;
    font-size: 16px;
    background:#141414;
    border: 1px solid #3d3d3d;
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
  a {
    width: 30%;
    margin-top: 1rem;
    color: #ffff;
    text-decoration: none;
    background: rgb(2 6 23);
    border-radius: 0.5rem;
    padding: 0.5rem;
    transition: all linear 0.3s;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;

export const BtnContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

export const Button = styled.button`
  margin-top: 1.5rem;
  width: 30%;
  height: 2.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 400;
  background: #7158e2;
  margin-bottom: 0.5rem;
  cursor: pointer;
  color: #ffff;
  &:disabled {
    opacity: 0.5;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
