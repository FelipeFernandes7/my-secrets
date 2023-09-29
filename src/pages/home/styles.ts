import { styled } from "styled-components";

export const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const AddBtn = styled.button`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 2rem;
  background-color: rgb(37 99 235);
  border: none;
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 100%;
  cursor: pointer;
  transition: all linear 0.3s;
  &:hover {
    background-color: rgb(29 78 216);
  }
`;

export const StyledHomeContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;
