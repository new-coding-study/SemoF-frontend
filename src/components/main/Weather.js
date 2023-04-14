import React, { useState, useEffect } from "react";
import fetchWeather from "../../apis/fetchWeather";

function Weather({ city }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function getWeather() {
      const data = await fetchWeather(city);
      setWeather(data);
    }

    getWeather();
  }, [city]);

  if (!weather) {
    return <div>Loading...</div>;
  }

  const {
    name,
    main: { temp, feels_like, humidity },
    weather: [details],
  } = weather;

  return (
    <div>
      <h1>{name}</h1>
      <div>Temperature: {temp}°C</div>
      <div>Feels like: {feels_like}°C</div>
      <div>Humidity: {humidity}%</div>
      <div>Weather: {details.main}</div>
    </div>
  );
}

export default Weather;
