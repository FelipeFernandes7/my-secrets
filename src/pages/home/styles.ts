import { styled } from "styled-components";

export const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const AddBtn = styled.button`
  position: fixed;
  bottom: 2rem;
  background-color: rgb(37 99 235);
  border: none;
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 100%;
  cursor: pointer;
  transition: all linear 0.3s;
  &:hover{
    background-color: rgb(29 78 216);
  }
`;
