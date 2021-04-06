import React from 'react'; 
import styled from 'styled-components';



const Button = styled.button`
 position: absolute;
  top: 20rem;
  right: 1rem;
  background: none;
  border: none;
  z-index: 10;
`; 

const Img = styled.img`
  width: 30px;
  cursor: pointer;
`;



const Locate = ({panTo}) => {

    
  return (

    <Button
      onClick={() => { //                                   use browsers built in geolocation 
        navigator.geolocation.getCurrentPosition((position) => {
          panTo({ //                                        gives us coords that are panned to when app is clicked 
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => null
        );   
      }}>
      <Img src="https://inkboxdesigns.imgix.net/new_designs/v3/brandon_giambattista_-_compass_rose_-_3x3.jpg?auto=compress,format&con=100&gam=100&pad=20&bg=F4F5F7&fit=fill&duotone=000000,F4F5F7" alt='compass - locate me'/>
    </Button>
  );

}; 

export default Locate;
