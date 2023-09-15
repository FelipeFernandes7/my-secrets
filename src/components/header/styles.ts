import { styled } from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  align-items: center;

  justify-content: center;
  height: 5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

export const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Profile = styled.div`
  transition: all linear 0.3s;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 100;
  display: flex;
  gap: 1rem;
  align-items: center;
  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    transition: all linear 0.3s;
    font-size: 0.95rem;
  }
`;

export const Action = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  button {
    background: transparent;
    border: none;
  }
`;
