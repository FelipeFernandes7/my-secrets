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
  background: #7d5fff;
  border: none;
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 100%;
  cursor: pointer;
  transition: all linear 0.3s;
  &:hover {
    background: #7158e2;
  }
`;

export const StyledHomeContent = styled.div`
  width: 100%;
  display: grid;
  gap: 1rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  transition: all linear 0.3s;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
  }
`;
