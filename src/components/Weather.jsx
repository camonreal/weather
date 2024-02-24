const Weather = ({ weatherData }) => {
    return (
        <>
            {weatherData.weather ? (
                <section>
                    <ul>
                        <li>{weatherData.name}</li>
                        <li>{weatherData.sys.country}</li>
                        <li>{weatherData.main.temp.toFixed()}</li>
                    </ul>
                </section>
            ) : null}
        </>
    );
}

export default Weather;
