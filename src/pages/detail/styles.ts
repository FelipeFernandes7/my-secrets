import { styled } from "styled-components";

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
`;

export const Textarea = styled.textarea`
  width: 100%;
  max-width: 100%;
  border: none;
  color: #ffff;
  background: transparent;
  resize: none;
  font-family: "Montserrat";
  font-size: 1.5rem;
  height: 100%;
  overflow: hidden;
  outline: none;
`;

export const AnnotationTitle = styled.textarea`
  outline: none;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat";
  text-align: center;
  font-size: 2rem;
  width: 100%;
  color: #ffff;
  resize: none;
  background: transparent;
  border: none;
`;

export const ActionBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;

export const Action = styled.button`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #fff;
  border: none;
  background: #232323;
  border-radius: 100%;
  cursor: pointer;
  transition: all linear 0.3s;
  &:hover {
    background: #3d3d3d;
  }
`;

export const Wrapper = styled.div`
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 450px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const ButtonSubmit = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  background: #7158e2;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export const AnnotationDate = styled.h1`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  margin-top: 0.5rem;
`;

export const FeelingWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  margin-top: 1rem;
  h1 {
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    white-space: pre-wrap;
  }
  span {
    padding: 3px;
    border-radius: 0.5rem;
    margin-left: 0.3rem;
  }
`;

export const Loading = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;
