import { useState, useEffect } from 'react';
import axios from 'axios';
import '../WeatherAPI/WeatherAPI.css';
import './MateoAPI.css'
import ForecastMateo from '../../components/ForecastMateo/ForecastMateo';
import Weather from '../../components/Weather/Weather';

const apiKey = "8636f5d0e1f01b4d199c28bacddfaa55"

const MateoAPI = () => {
  const [cityData, setCityData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(true);
  const [dataStorage, setdataStorage] = useState(null);

  useEffect(() => {
    const lastSearchedCity = localStorage.getItem('lastSearchedCity');
    setCity(lastSearchedCity)

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
    const urlForecast = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`;
    try {
      console.log('Entrou no forecast');
      const response = await axios.get(urlForecast);
      const data = response.data;
      setForecastData(data);
      setLoading(false);
      console.log(forecastData);

    } catch (error) {
      console.log('Erro ao buscar dados de previsão do tempo:', error);
    }
  };

  return (
    <>
      <main className="weather-card_mateo">
        <h1 className="weather-card__title">Open Mateo</h1>
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
      {loading ? (null) : (
        forecastData && <ForecastMateo forecastData={forecastData} />
      )}
    </>
  );
};

export default MateoAPI;