import { useState } from 'react';
import axios from 'axios';
import Weather from '../Weather';
import './SearchCity.css';
import ForecastData from '../ForecastData';

const apiKey = "8636f5d0e1f01b4d199c28bacddfaa55"

const SearchCity = () => {
    const [cityData, setCityData] = useState({});
    const [forecastData, setForecastData] = useState([]);
    const [city, setCity] = useState("")

    //Open Weather | Current Weather Data - API
    const urlWeatherMap = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const fetchCity = async (event) => {
        if (event.key === 'Enter') {
            try {
                const response = await axios.get(urlWeatherMap);
                const data = response.data;
                setCityData(data);

                const lat = data.coord.lat;
                const lon = data.coord.lon;
                console.log(lat);
                console.log(lon);
                await fetchForecastData(lat, lon);
            } catch (error) {
                console.log(error);
            }
            setCity("")
        }
    }
    
    const fetchForecastData = async (lat, lon) => {
        //Open Mateo Weather | Forecast - API
        //const urlForecast = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`

        //Open Weather | 5 day weather forecast - API
        const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        try {
            console.log('entrou no forecast')
            const forecastResponse = await axios.get(urlForecast);
            const forecastData = forecastResponse.data;
            setForecastData(forecastData.list);
            console.log(forecastData)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <main class="weather-card">
                <h1 class="weather-card__title">Weather search</h1>
                <input class="weather-card__input" type='text' value={city} placeholder='Enter city' onChange={(event) => setCity(event.target.value)} onKeyDown={fetchCity} />
                <Weather weatherData={cityData} />
                <ForecastData forecastData={forecastData} />
            </main>
        </>
    );
}
export default SearchCity;
