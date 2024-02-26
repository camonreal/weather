import { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherAPI.css';
import Weather from '../../components/Weather/Weather';
import Forecast from '../../components/Forecast/Forecast';
import Swal from 'sweetalert2';

const apiKey = "8636f5d0e1f01b4d199c28bacddfaa55";

const WeatherAPI = () => {
    const [cityData, setCityData] = useState({});
    const [forecastData, setForecastData] = useState([]);
    const [city, setCity] = useState("");
    const [dataStorage, setdataStorage] = useState(null);


    useEffect(() => {
        const lastSearchedCity = localStorage.getItem('lastSearchedCity');
        setCity(lastSearchedCity);

        const cities = localStorage.getItem('cities');
        if (cities) {
            setdataStorage(JSON.parse(cities));
        }

    }, []);

    const fetchCity = async (event) => {
        const urlWeatherMap = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        if (event.key === 'Enter') {
            try {
                const response = await axios.get(urlWeatherMap);
                const data = response.data;
                setCityData(data);
                Swal.fire("Searching for forecast for the chosen city.");

                //LocalStorage
                localStorage.setItem('lastSearchedCity', city);
                let cities = JSON.parse(localStorage.getItem('cities')) || [];
                const limitCities = 2;
                if (!cities.includes(city)) {
                    if (cities.length >= limitCities) {
                        cities.shift();
                    }
                    cities.push(city);
                    localStorage.setItem('cities', JSON.stringify(cities));
                }

                const lat = data.coord.lat;
                const lon = data.coord.lon;

                await fetchForecastData(lat, lon);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error fetching city. OR It seems like the API is down at the moment. Please try again."
                });
            }
            setCity("");
        }
    }

    const fetchForecastData = async (lat, lon) => {
        const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        try {
            const forecastResponse = await axios.get(urlForecast);
            const forecastData = forecastResponse.data;
            setForecastData(forecastData.list);
            Swal.fire({
                title: "Works!",
                text: "We found the forecast for the chosen city",
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error fetching forecast. OR It seems like the API is down at the moment. Please try again."
            });
        }
    }

    return (
        <>
            <main className="weather-card">
                <h1 className="weather-card__title">Open Weather</h1>
                <input className="weather-card__input" type='text' value={city} placeholder='Enter city' onChange={(event) => setCity(event.target.value)} onKeyDown={fetchCity} />
                <Weather weatherData={cityData} />
            </main>
            <div className='cities-card'>
                <h2>Last searched cities:</h2>
                {dataStorage ? (
                    <div className="containerStore">
                        {dataStorage.map((item, index) => (
                            <div key={index} className="cityStore">
                                {item}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You haven't searched for any cities yet, search now!</p>
                )}
            </div>
            <Forecast forecastData={forecastData} />
        </>
    );
}
export default WeatherAPI;
