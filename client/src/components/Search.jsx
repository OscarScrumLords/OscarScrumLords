import React from 'react'; 
import Map from './Map.jsx'; 
import styled from 'styled-components';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'; 
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'; 

const Searched = styled.div`
  position: absolute;
  top: 10rem;
  left: 50%;
  transform: translateX(-50%);
  color: black; 
  width: 100%;
  max-width: 400px;
  z-index: 10;
`; 


const Search = ({ panTo }) => {
  const {
    ready,
    value, 
    suggestions: {status, data},
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 29.951065, lng: () => -90.071533 },
      radius: 100 * 1000,
    }
  }); 

  return (
    <Searched>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false); 
          clearSuggestions(); 
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng }); 

          } catch (error) {
            console.log('error!'); 
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder='Enter an address'
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' && 
          data.map(({id, description}) =>( 
            <ComboboxOption key={id} value={description} 
            />
          ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </Searched>
  );
  
}; 


export default Search; 

