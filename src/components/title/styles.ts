import { styled } from "styled-components";

export const Section = styled.section`
  h1 {
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 2rem;
    font-weight: 400;
    font-family: "Montserrat";
    span {
      display: inline-block;
      animation: animate 1s linear forwards;

      &:nth-child(1) {
        opacity: 0;
        animation-delay: 2s;
      }
      &:nth-child(2) {
        opacity: 0;
        animation-delay: 2.5s;
      }
      &:nth-child(3) {
        opacity: 0;
        animation-delay: 2.75s;
      }
      &:nth-child(4) {
        opacity: 0;
        animation-delay: 3s;
      }
      &:nth-child(5) {
        opacity: 0;
        animation-delay: 3.5s;
      }
      &:nth-child(6) {
        opacity: 0;
        animation-delay: 3.75s;
      }
      &:nth-child(7) {
        opacity: 0;
        animation-delay: 4s;
      }
      &:nth-child(8) {
        opacity: 0;
        animation-delay: 4.5s;
      }
      &:nth-child(9) {
        opacity: 0;
        animation-delay: 4.75s;
      }
      &:nth-child(10) {
        opacity: 0;
        animation-delay: 5s;
      }
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
    }
  }
`;
