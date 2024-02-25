import { useState } from 'react';
import axios from 'axios';
import './Search.css';
import Weather from '../Weather/Weather';
import Forecast from '../Forecast/Forecast';

const apiKey = "8636f5d0e1f01b4d199c28bacddfaa55"

const Search = () => {
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
            <main className="weather-card">
                <h1 className="weather-card__title">Weather search</h1>
                <input className="weather-card__input" type='text' value={city} placeholder='Enter city' onChange={(event) => setCity(event.target.value)} onKeyDown={fetchCity} />
                <Weather weatherData={cityData} />
                <Forecast forecastData={forecastData} />
            </main>
        </>
    );
}
export default Search;
