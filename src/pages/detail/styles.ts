import { styled } from "styled-components";

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

export const ActionContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  button {
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    color: #fff;
    border: none;
    background: rgb(15 23 42);
    border-radius: 100%;
    cursor: pointer;
    transition: all linear 0.3s;
    &:hover {
      background-color: rgb(30 41 59);
    }
  }
`;

export const NoteContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    white-space: pre-wrap;
  }
  div {
    display: flex;
    margin-top: 0.5rem;
    width: 100%;
    justify-content: center;
    p {
      font-size: 1rem;
      font-weight: 400;
      color: rgb(209 213 219);
    }
  }
  @media screen and (max-width: 768px) {
    div {
      display: flex;
      margin-top: 0.5rem;
      width: 100%;
      justify-content: flex-start;
      margin-left: 1rem;
      p {
        font-size: 0.95rem;
        color: rgb(209 213 219);
      }
    }
  }
`;

export const NotePad = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    font-size: 1rem;
    font-weight: 400;
    color: rgb(209 213 219);
    margin-top: 1.5rem;
    white-space: pre-wrap;
  }
`;

export const FeelingSection = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-start;
  h1 {
    width: 100%;
    font-size: 0.95rem;
    font-weight: 700;
    white-space: pre-wrap;
    span {
      margin-left: 0.5rem;
      border-radius: 0.5rem;
      padding: 4px;
      font-size: 0.95rem;
      font-weight: 700;
      white-space: pre-wrap;
    }
  }
`;
