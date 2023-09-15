import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  font-family: 'Montserrat', sans-serif;
  background-color: rgb(2 6 23);
  color: #fff;
  button{
    transition: all linear 0.3s;
    &:active{
      transform: scale(0.95);
    }
  }
}
`;
