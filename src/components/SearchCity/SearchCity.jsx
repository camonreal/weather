import { useState } from 'react';
import axios from 'axios';
import Weather from '../Weather';
import './SearchCity.css';

const apiKey = "8636f5d0e1f01b4d199c28bacddfaa55"

const SearchCity = () => {
    const [cityData, setCityData] = useState({});
    const [city, setCity] = useState("")
    const urlWeatherMap = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    const fetchCity = async (event) => {
        if (event.key === 'Enter') {
            try {
                const response = await axios.get(urlWeatherMap)
                const data = response.data;
                setCityData(data)
            } catch (error) {
                console.log(error);
            }
            setCity("")
        }
    }
    return (
        <>
            <main class="weather-card">
                <h1 class="weather-card__title">Weather search</h1>
                <input class="weather-card__input" type='text' value={city} placeholder='Enter city' onChange={(event) => setCity(event.target.value)} onKeyDown={fetchCity} />
                <Weather weatherData={cityData} />
            </main>
        </>
    );
}
export default SearchCity;
