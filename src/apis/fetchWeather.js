import axios from "axios";

const API_KEY = "YOUR_API_KEY"; // OpenWeatherMap API Key
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

async function fetchWeather(city) {
  const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(url);
  const { data } = response;
  return data;
}

export default fetchWeather;
