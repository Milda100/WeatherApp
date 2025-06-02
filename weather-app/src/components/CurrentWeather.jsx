import { Card } from "react-bootstrap";
import getWeatherImg from "./getWeatherImg";



    function CurrentWeather({ selectedCity, weather, error }) {
  if (!selectedCity && !weather && !error) return null;

const currentCondition = weather?.weather?.[0]?.main || "Clouds";
const weatherImg = getWeatherImg(currentCondition);

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}

      {weather && (
        <Card className="my-4 mx-auto" style={{ maxWidth: "400px" }}>
          <Card.Body>
            <Card.Img
              variant="top"
              src={weatherImg}
              alt={currentCondition}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <Card.Title>{weather.name}</Card.Title>
            <Card.Text className="text-capitalize">
              {weather.weather[0].description}
            </Card.Text>
          </Card.Body>
          <p>Temperature: {Math.round(weather.main.temp)}°C</p>
          <p>Conditions: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </Card>
      )}
    </>
  );
}

export default CurrentWeather;
