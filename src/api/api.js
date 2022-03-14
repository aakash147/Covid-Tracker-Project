import axios from "axios";  // axios use for get data from external source.


const url = 'https://covid19.mathdro.id/api';  // API link jidr se sara data fetch krna hai.


// ****** API se zrurt ka data fetch kiya like confirmed etc ******
export const fetchData = async (countryName)=> {

    let changeURL = url;
    // debugger;   // use for automatically call this file in browser for debugging

    if (countryName) {
        changeURL = `${url}/countries/${countryName}`;
    }

    try {

        let { data } = await axios.get(changeURL);
        // console.log(data);

        let getingData = {

            confirmed: data.confirmed, 
            recovered:  data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate

        }

        return getingData;

    } catch (e) {

        return [];
    }
}


// ****** API se daily data fetch kiya taa k chart mein dkhya ja sky ******
export const dataForChart = async ()=> { 
    try {
        let { data } = await axios.get(`${url}/daily`); 
        // url/daily mein daily update hai toh is liye usko is trha likha jy ga 
        // jo k template string khelta hai

        const gettingData = data.map((apiData)=> ({

            confirmed: apiData.confirmed.total,
            deaths: apiData.deaths.total,
            date: apiData.reportDate,
            recovered: apiData.recovered.total

        }))
        // console.log(gettingData);
        return gettingData;


    } catch (e) {

        return [];
    }
}


// ****** Country names Api se fetch kiye ******
export const fetchCountryData = async ()=> {
    try {
        let { data: { countries } } = await axios.get(`${url}/countries`); 

        return countries.map((countryName) => countryName.name);

    } catch (e) {

        return [];
    }
}