import React from 'react'; 
import styled from 'styled-components';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'; // manages search box
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'; // displays search results 


// styles for combobox 
const Searched = styled.div`
  position: absolute;
  top: 18rem;
  left: 60%;
  transform: translateX(-100%);
  color: black; 
  width: 100%;
  max-width: 400px;
  z-index: 10;
`; 


const Search = ({ panTo }) => {
  const { //                            values deconstructed from usePlacesAutoComplete hook 
    ready, //                           is it ready. are all scripts loaded...
    value, //                           current value being typed into search box 
    suggestions: {status, data}, //     suggestions coming back from api 
    setValue, //                        function to set value 
    clearSuggestions, //                function that clears out suggestions 
  } = usePlacesAutocomplete({ //        use places Autocomplete options , set to 50km around nola 
    requestOptions: {
      location: { lat: () => 29.951065, lng: () => -90.071533 },
      radius: 50 * 1000, //             50km radias around nola 
    }
  }); 

  /**
   * combobox component, onSelect recieves address that user has selected 
   */
  return (
    <Searched>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false); // update state with value that user has choosen, fetch data = false because we get that value from the hook and we dont need to query the api for it
          clearSuggestions(); 
          try { //                                                    take address and pass it to get geocode. cordinates of place being searched for 
            const results = await getGeocode({ address }); //         get results from geocode function (coordinants)
            const {lat, lng} = await getLatLng(results[0]); //        async function wrapped in try/catch  gives us back lat and lng of search result
          
            panTo({ lat, lng }); 

          } catch (error) {
            console.log('error!'); 
          }
        }}
      >
        <ComboboxInput 
          value={value} //                                            value comes from useplacesautocomplete hook 
          onChange={(e) => { //                                       call set value function, pass in value that is currently inside event 
            setValue(e.target.value);
          }}
          disabled={!ready} //                                        disable if useplaces hook isnt ready 
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

// popover gives us the suggestions if status is ok map over suggestions 
// deconstruct an id and descripton. render an option and give it a key and value 
export default Search; 

