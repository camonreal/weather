import './ForecastMateo.css';

const ForecastMateo = ({ forecastData }) => {
    return (
        <section>
            {forecastData && (
                <div className="forecast-container_mateo">
                    {forecastData.hourly.time.map((timestamp, index) => (
                        <ul key={index} className="forecast-card_mateo">
                            <li>{new Date(timestamp).toLocaleString()}</li>
                            <li>{forecastData.hourly.temperature_2m[index]} °C</li>
                        </ul>
                    ))}
                </div>
            )}
        </section>
    );
}

export default ForecastMateo;
