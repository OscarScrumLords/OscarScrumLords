import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

*{
    // box-sizing: border-box;
    margin: auto;
}

body{
    margin: 0;
    background-color: aliceblue; 
  }

div{
    color: black;
    /* background: rgba (255, 255, 255, 0.1);
    backdrop-filter: blur(6px); */
}

a{
  color:black;
}

header{
  color: black;
  border-radius: 25px;
  background-color: #ffd1dc;
  width: 90%;
  text-align: center;
  padding: 10px;
  border: 1px;
  border-color: black;
  border-style: solid;
}


nav{
  color: black;
  width: 90%;
  border-radius: 15px; 
  border: 2px; 
  background-color: #ffffff;
  border-color: black;
  border-style: solid;
  height: 65px;
  padding: 0px;
  font-weight: bold;
}

main{
  width: 90%;
}

li {
  float: left;
  display: block;
}
`;
