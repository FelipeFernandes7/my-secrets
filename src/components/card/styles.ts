import { styled } from "styled-components";

export const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 12em;
  border-radius: 2rem;
  cursor: pointer;
  background: #181818;
  margin-bottom: 1rem;
  transition: all linear 0.3s;
  &:active {
    transform: scale(0.95);
  }
`;

export const Section = styled.div`
  width: 100%;
  display: flex;
  margin-left: 1.5rem;
  margin-top: 1.5rem;
  flex-direction: column;
  gap: 0.5rem;
  h1 {
    font-weight: 200;
    font-size: 1rem;
  }
  span {
    font-size: 2rem;
    font-weight: 400;
    gap: 0.5rem;
    background-color: #6e72fc;
    background-image: linear-gradient(315deg, #6e72fc 0%, #ad1deb 74%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const Title = styled.div`
  margin-top: 0.5rem;
  padding: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  a {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
      font-weight: 400;
      font-size: 1.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 500px;
    }
  }
  @media screen and (max-width: 740px) {
    a {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      h1 {
        font-weight: 400;
        font-size: 1.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 350px;
      }
    }
  }
`;

export const DeleteContainer = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  cursor: pointer;
  transition: all linear 0.3s;
`;
