import { useState } from 'react';
import axios from 'axios';
import Weather from './Weather';

const apiKey = ""

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
            <section>
                <input type='text' value={city} placeholder='Search city' onChange={(event) => setCity(event.target.value)} onKeyDown={fetchCity}></input>
            </section>
            <Weather weatherData={cityData} />
        </>
    );
}
export default SearchCity;
