const Weather = ({ weatherData }) => {
    return (
        <>
            {weatherData.weather ? (
                <ul class="weather-info">
                    <li class="weather-info__item weather-description">{weatherData.weather.description}</li>
                    <li class="weather-info__item weather-location"><h3>{weatherData.name}, {weatherData.sys.country}</h3></li>
                    <li class="weather-info__item">
                        {weatherData.weather[0].icon && (
                            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} 
                            style={{ width: '50px', height: '50px' }} 
                            alt={`Weather icon for ${weatherData.weather[0].description}`} 
                            title={`${weatherData.weather[0].description}`} 
                            />
                        )}
                    </li>
                    <li class="weather-info__item weather-current"><h2>{weatherData.main.temp.toFixed()} °C</h2></li>
                    <li class="weather-info__item weather-current"><h4>Feels {weatherData.main.feels_like.toFixed()} °C</h4></li>
                    <li class="weather-info__item weather-temperature"><p> Min. {weatherData.main.temp_min.toFixed()} °C <br></br> Max. {weatherData.main.temp_max.toFixed()} °C</p></li>
                    <li class="weather-info__item weather-pressure"><p>Pressure {weatherData.main.pressure.toFixed()} hPa<br></br>  Humidity {weatherData.main.humidity.toFixed()} %</p></li>
                </ul>
            ) : null}
        </>
    );
}

export default Weather;
