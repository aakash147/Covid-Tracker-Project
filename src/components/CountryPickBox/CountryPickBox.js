
import { useState, useEffect } from "react";
import { NativeSelect, FormControl } from '@material-ui/core';
import './CountryPickBox.css';
import { fetchCountryData } from '../../api/api';

// ****** For chose the country and get the data of specific country ******

export default ({countryData}) => {

    let [country, setCountry] = useState([]); 
    
    useEffect (()=> {
  
        async function dataOfCountries() {
    
          let getData = await fetchCountryData();
    
          setCountry(getData);
        }
        
        dataOfCountries();
    
      }, []);
    // }, [setCountry]);


    return (
        <FormControl className="form">
            <NativeSelect defaultValue='' onChange={(evt) => countryData(evt.target.value)}>
                <option value=''> Global </option>

                {country.map((pickCountry, index) => <option key={index} value={pickCountry}> {pickCountry} </option>)}
            
            </NativeSelect>
        </FormControl>
    )
}