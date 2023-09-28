import { styled } from "styled-components";
import { GiDialPadlock } from "react-icons/gi";

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100vh;
  gap: 1rem;
`;
export const Text = styled.h1`
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  font-size: 1rem;
  justify-content: center;
  font-weight: 700;
  font-family: "Montserrat";
`;
export const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #111827;
  gap: 1rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const IconStyled = styled(GiDialPadlock)`
  display: inline-block;
  animation: animate 1s linear forwards;
  opacity: 0;
  animation-delay: 5s;
  font-size: 10rem;

  @keyframes animate {
    0% {
      opacity: 0;
      transform: rotateY(90deg);
      filter: blur(10px);
    }
    100% {
      opacity: 1;
      transform: rotateY(0deg);
      filter: blur(0);
    }
  }
`;

export const IptContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 450px;
  button {
    margin-top: 2rem;
    background: #fff;
    color: rgb(37 99 235);
  }

  input[type="password"] {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 768px) {
    button {
      max-width: 350px;
    }
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  @media screen and (max-width: 768px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  span {
    font-size: 0.95rem;
    display: flex;
    gap: 0.5rem;
    a {
      color: rgb(29 78 216);
    }
  }
`;
