import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

*{
    box-sizing: border-box;
}

body{
    margin: 0;
    background-color: #48bfe3
  }

div{
    color: black;
    /* background: rgba (255, 255, 255, 0.1);
    backdrop-filter: blur(6px); */
}

header{
  border-radius: 25px;
  background-color: #7400b8;
  width: 90%;
  text-align: center;
  padding: 10px;
  margin: 0;
}
`;