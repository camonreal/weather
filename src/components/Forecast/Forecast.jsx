import './Forecast.css';
import { format } from 'date-fns';

const Forecast = ({ forecastData }) => {
    return (
        <>
            <section className="forecast-container">
                {forecastData.map((forecast, index) => (
                    <ul key={index} className="forecast-card">
                        <li>{format(new Date(forecast.dt_txt), 'MM/dd/yyyy HH:mm')}</li>

                        <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                            style={{ width: '50px', height: '50px' }}
                            alt={`Weather icon for ${forecast.weather[0].description}`}
                            title={`${forecast.weather[0].description}`}
                        />
                        <li>Med. {forecast.main.temp}</li>
                        <li>Feels {forecast.main.feels_like}</li>
                        <li>Min. {forecast.main.temp_min}</li>
                        <li>Max. {forecast.main.temp_max}</li>
                        <li>Pressure {forecast.main.pressure}</li>
                        <li>Humidity {forecast.main.humidity}</li>
                    </ul>
                ))}
            </section>
        </>
    );
}

export default Forecast;
