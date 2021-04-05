/* eslint-disable multiline-ternary */
/* eslint-disable indent */
import React from 'react'; 
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'; 
import { formatRelative } from 'date-fns'; 
import { apiKey } from '../../../key.js';
import Search from './Search.jsx'; 
import Locate from './Locate.jsx'; 

import mapStyles from './styles/mapStyles.js'; 
import styled from 'styled-components';
//import mapStyle2 from './styles/mapStyles2.css';
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from 'use-places-autocomplete'; 
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from '@reach/combobox'; 
//import '@reach/combobox/styles.css'; 




// declared up here to avoid rerenders
// places library
const libraries = ['places'];  
// map takes of the space of the container it is in
// if you dont have it set at 100vw x 100vh you wont see it at all
const mapContainerStyle = {
  width: '100vw', 
  height: '100vh',
};
const center = {
  lat: 29.951065,
  lng: -90.071533
};

// options for customizing map
const options = { 
  styles: mapStyles,
 // disableDefaultUI: true, //rm unwanted UI elements
// manually add UI´s that i want 
  zoomControl: true,
};

const H1 = styled.h2`
    position: absolute; 
    top: 40rem;
    left: 1rem;
    color: black; 
    z-index: 10; 
    margin: 0;
    padding: 0,
`
;


/* 
const SearchInput = styled.div`

`; 

const locate = styled.div`

`; 

const locateImg = styled.div`

`;  */


const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${apiKey}`,
    libraries,

  }); 

  const [markers, setMarkers] = React.useState([]); 
  // create some new state to store what is current selected marker
  const [selected, setSelected] = React.useState(null); 

  const onMapClick = React.useCallback((event) => {
        setMarkers(current => [...current, {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date()
        }]);
      }, []); 

  const mapRef = React.useRef(); 
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map; // saving a ref to use map to access it anywere in code 
    // use state when you want react to re-render use ref when you want to retain state without re-rendering 
  }, []); 

  const panTo = React.useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng}); 
    mapRef.current.setZoom(14); 
  }, []); 

  if (loadError) {
    return 'error loading map';
  } else if (!isLoaded) {
    return 'Loading Maps';
  }  

  return <div> 
    <H1> nola ❤️´s 🚲 </H1>

    <Search panTo={panTo} /> 
    <Locate panTo={panTo} />
    
    <GoogleMap 
      mapContainerStyle={mapContainerStyle} 
      zoom={8} 
      center={center}
      options={options}
      // user click gives you access to lat and lng
      onClick={onMapClick}
      onLoad={onMapLoad}
      >
        {markers.map(marker => <Marker key={marker.time.toISOString()}
         position={{ lat: marker.lat, lng: marker.lng }} 
         icon={{ //options for centering and resizing pin 
           url: 'https://media.istockphoto.com/vectors/traffic-cone-cartoon-vector-id922344356',
           scaledSize: new window.google.maps.Size(33, 33),
           origin: new window.google.maps.Point(0, 0),
           anchor: new window.google.maps.Point(15, 15), 
         }}
         onClick={() => {
           setSelected(marker); 
         }}
         />
        
         )}

       
         {selected ? (
           <InfoWindow 
           position={{ lat: selected.lat, lng: selected.lng }} 
           onCloseClick={() => {
             setSelected(null); // to toggle info on and off
           }}
           >
          <div>
            <h2>PotHole!</h2>
            <p>Spotted {formatRelative(selected.time, new Date())}</p>
          </div>
          </InfoWindow>
          ) : null}
      </GoogleMap>
  </div>;

}; 




export default Map;
