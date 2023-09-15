import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  font-family: 'Montserrat';
  background-color: rgb(2 6 23);
  color: #fff;
  transition: all linear 0.3s ease;
  button{
    transition: all linear 0.3s;
    &:active{
      transform: scale(0.95);
    }
  }
}
body::-webkit-scrollbar {
width: 5px;
}

body::-webkit-scrollbar-track {
background: transparent;
}

body::-webkit-scrollbar-thumb {
background-color: transparent;
border-radius: 15px;
border: none;
}
`;
