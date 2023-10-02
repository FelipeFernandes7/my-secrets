import { styled } from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 5rem;
  background: #181818;
  margin-bottom: 1.5rem;
`;

export const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    cursor: pointer;
    background: transparent;
    width: auto;
  }
`;

export const Name = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
`;
