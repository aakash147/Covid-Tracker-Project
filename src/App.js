import { useEffect, useState } from 'react';
import './App.css';
import CardsBox from './components/CardsBox/CardsBox';
import Charts from './components/Charts/Charts';
import CountryPickBox from './components/CountryPickBox/CountryPickBox';
import { fetchData } from './api/api';


function App() {

   let [data, setData] = useState({});
   let [country, setCountry ] = useState([]);
   // make a state for get data and setdata in it.

   useEffect(() => {

      async function dataFromApi() {
         let getData = await fetchData();

         setData(getData);

      }
      dataFromApi();

   }, []);

   // country k name ko select krwa k usy state mein set krwya ta k uska data hth mein a jy
   const changeCountry = async (countryParameter) => {
      let countryData = await fetchData(countryParameter);
      setCountry(countryParameter);
      setData(countryData);
   }

   return (
      <div className="container">
         <img src="covid.png" className='covidImage' />
         <CardsBox  cardData = {data} />
         <CountryPickBox countryData = {changeCountry} />
         <Charts chartData = {data} countryData = {country} />
      </div>
   );
}

export default App;
