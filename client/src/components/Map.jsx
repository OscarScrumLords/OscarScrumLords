/* eslint-disable multiline-ternary */
import React from 'react'; 
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'; 
import { formatRelative } from 'date-fns'; // marking time and date on potholes
import REACT_APP_MAPS_API_KEY from '../../../.env.local';
import Search from './Search.jsx'; 
import Locate from './Locate.jsx'; 
import mapStyles from './styles/mapStyles.js'; 
import styled from 'styled-components';

 
const libraries = ['places']; //    library for places api

const mapContainerStyle = {
  width: '100vw', 
  height: '100vh',
};

// position of map when loaded  
const center = {
  lat: 29.951065,  
  lng: -90.071533
};

/**
 * options for customizing map
 * styles: imported from mapStyles.js
 * disableDefault: toggle to remove unwanted UI elements, manually add UI´s below
 */
const options = { 
  styles: mapStyles, 
  disableDefaultUI: false, 
  zoomControl: true,
};

/**
 * styles for nola ❤️´s 🚲
 */
const H1 = styled.h2`
    position: absolute; 
    top: 50rem;
    left: 1rem;
    color: black; 
    z-index: 10; 
    margin: 0;
    padding: 0,
`
;






const Map = () => {
  const { isLoaded, loadError } = useLoadScript({ 
    googleMapsApiKey: REACT_APP_MAPS_API_KEY, 
    libraries, //                                   enable additional libraries for 'places' api

  }); 
  // state for markers 
  const [markers, setMarkers] = React.useState([]); 
  const [selected, setSelected] = React.useState(null); 

  /**
   * useCallBack hook allows you to create a function that will always retain the same value
   * setMarkers gets called when the cone gets placed
   * receive current state and return a new version of it 
   * spread in the current marker with cords given and create and new version of state
   * every time you click on map it renders a new version of state
   */  
  const onMapClick = React.useCallback((event) => {
    setMarkers(current => [...current, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date()
    }]);
  }, []); 

  /**
   * mapRef: retain a reference of the actual map instance. used to pan and zoom on map when searching
   * OnMapLoad: produces the value of the map and saves it to a variable 
   */
  const mapRef = React.useRef();  
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map; 
  }, []); 



  const panTo = React.useCallback(({lat, lng}) => { //                     lat and lng that user whats to pan to
    mapRef.current.panTo({lat, lng}); //                                   call panTo function with same params
    mapRef.current.setZoom(18); //                                         zooms into location that is is searched
  }, []); 


  if (loadError) { 
    return 'error loading map';
  } else if (!isLoaded) {
    return 'Loading Maps';
  }  


  return (
    <div> 
      <H1> nola ❤️´s 🚲 </H1>

      <Search panTo={panTo} />   
      <Locate panTo={panTo} />
    
  
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={10} 
        center={center} 
        options={options} 
        onClick={onMapClick} 
        onLoad={onMapLoad}
      >
        {markers.map(marker => <Marker key={marker.time.toISOString()}
          position={{ lat: marker.lat, lng: marker.lng }} 
          icon={{ //                                        options for centering and resizing pin 
            url: 'https://media.istockphoto.com/vectors/traffic-cone-cartoon-vector-id922344356',
            scaledSize: new window.google.maps.Size(33, 33),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15), 
          }}
          onClick={() => { 
            setSelected(marker); //                       onlick passes in the marker being clicked, rendered (stores marker in selected state)
          }}
        />
        )}
        

        {selected ? (
          <InfoWindow 
            position={{ lat: selected.lat, lng: selected.lng }} 
            onCloseClick={() => {
              setSelected(null); //                        toggle window. second mouse click sets selected back to null 
            }}
          >
            <div>
              <h2>uh oh!</h2>
              <h3>Pothole here!</h3>

              <p>Reported {formatRelative(selected.time, new Date())}</p> 
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );

}; 


export default Map;
