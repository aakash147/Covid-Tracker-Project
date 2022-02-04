import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './Charts.css';
import { dataForChart } from '../../api/api';

// ******* Error => ("category" is not a registered scale) *******

// ERROR SOLUTION: 
//   import Chart from 'chart.js/auto';  
//   => ye import krny se solve ho ga OR nechy wala method use krna pry ga.


// chart.js k upr diye gy error ko solve krny k liye, nechy wla import ka code likhna pra.
// chart.js ki new updation se ye error tha, jo uska kch code import krny se solve huwa.
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     BarElement,
//     } from 'chart.js';
    
//     ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
//     );
// ******* End of Error solver *******



// ******* Api se Data get krny ka code *******
// Api se daily data fetch kr k idr array k andr set kiya taa k us hisab se chart display ho
const ChartFunction = ({ chartData: { confirmed, recovered, deaths }, countryData }) => {

    const [dailyData, setDailyData] = useState([]);  

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await dataForChart());
        }
        fetchAPI();

    }, [])

    // console.log({countryData});  // use this for check the countryData to understand code

// ******* End of Api Data *******

// ******* code for Line Chart *******
// is mein jo dailydata.length hai wo basically ye check krta hai k array ki length kitni hai
// r agr wo array khali ho gi toh <Line /> chart wala code chly ga
    const lineChart = (
       dailyData.length ? (
            <Line
                data = {{
                    labels: dailyData.map(({ date }) => new Date(date).toDateString()),
                    datasets: [{
                            data: dailyData.map(({confirmed}) => confirmed),
                            label: 'Infected',
                            backgroundColor: 'rgba(0, 0, 126, 0.603)',
                            fill: true,
                        }, {
                            data: dailyData.map(({ deaths }) => deaths),
                            label: 'Deaths',
                            backgroundColor: 'rgba(122, 0, 0, 0.603)',
                            fill: true,
                        }, {
                            data: dailyData.map(({ recovered }) => recovered),
                            label: 'Recovered',
                            backgroundColor: 'rgba(0, 146, 0, 0.603)',
                            fill: true,
                        },
                    ],
                }}
            />
        ) : null
    );
// ******* End of Line Chart *******

// ******* code for Bar Chart *******
    const barChart = (
        confirmed ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [
                        {
                            label: "People",
                            backgroundColor: ['rgba(0, 0, 126, 0.603)', 'rgba(0, 146, 0, 0.603)', 'rgba(122, 0, 0, 0.603)'],
                            data: [confirmed.value, recovered.value, deaths.value],

                        }
                    ],
                }}
            />
        ) : null
    );
// ******* End of Bar Chart *******


// ******* Logic to show Bar and line chart *******
// is mein jo line comment ki gai hai us se byDefault line chart show ni hota tha.
// upr countryData ko check krny k bd us ki '' value ko equal krny se byDefault show huwa.

    return (
        <div className="chartContainner">

            {countryData == "" ? lineChart : barChart}

            {/* {countryData ? barChart : lineChart} */}

        </div>
    )
}

export default ChartFunction;