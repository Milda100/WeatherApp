import { Card } from "react-bootstrap";
import getWeatherImg from "./getWeatherImg";
import { FaDroplet, FaWind } from "react-icons/fa6";




    function CurrentWeather({ selectedCity, weather, error }) {
  if (!selectedCity && !weather && !error) return null;

const currentCondition = weather?.weather?.[0]?.main || "Clouds";
const weatherImg = getWeatherImg(currentCondition);

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}

      {weather && (
        <Card className="text-center" id="current-weather">
          <Card.Body>
            <Card.Title as="h2">{weather.name}</Card.Title>
            <Card.Img
              variant="top"
              src={weatherImg}
              alt={currentCondition}
              id="img-current"
            />
            <Card.Text className="text-capitalize">
              {weather.weather[0].description}
            </Card.Text>
          </Card.Body>
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p><FaDroplet /> Humidity: {weather.main.humidity}%</p>
          <p><FaWind /> Wind: {Math.round(weather.wind.speed)} m/s</p>
        </Card>
      )}
    </>
  );
}

export default CurrentWeather;
