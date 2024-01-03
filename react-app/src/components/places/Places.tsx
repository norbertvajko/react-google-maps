import { Combobox, ComboboxButton, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from '@reach/combobox';
import '@reach/combobox/styles.css';
import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import './places.css';
import {
  SliderInput,
  SliderHandle,
  SliderTrack,
  SliderTrackHighlight
} from "@reach/slider";
import "@reach/slider/styles.css";
import DiscreteSlider from '../slider/Slider';

type PlacesProps = {
    setHome: (position: google.maps.LatLngLiteral) => void;
}

export default function Places( {setHome}: PlacesProps) {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (val: string) => {
        setValue(val,false);
        clearSuggestions();

        const results = await getGeocode({address: val});
        console.log(results);
        const {lat, lng} = await getLatLng(results[0]);
        setHome({ lat, lng });
    }

    return (
        
        <Combobox onSelect={handleSelect}>
            <div className='combobox-input-title'>Search location</div>
          <ComboboxInput 
            className='combobox-input'
            value={value} 
            onChange={ (e) => setValue(e.target.value)} 
            disabled={!ready}
            placeholder="Search location"
            />
         { <ComboboxPopover> 
       
            <ComboboxList>
          
                {status === "OK" &&
                  data.map(({place_id, description}) => (
                  <ComboboxOption
                    key={place_id}
                    value={description} 
                  />))
                  }
                           
            </ComboboxList>
            
          </ComboboxPopover>

          }
          <div className="range-slider-container">
          <div className="range-slider-title"><h2>Choose radius area</h2></div>
          <DiscreteSlider />
          </div>
            
      </Combobox>
        
    )
}