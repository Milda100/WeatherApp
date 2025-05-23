import { Card } from "react-bootstrap";

const CurrentWeather = ({ data }) => {
  return (
    <Card className="my-4 mx-auto" style={{ maxWidth: "400px" }}>
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text className="text-capitalize">
          {data.weather[0].description}
        </Card.Text>
        <p> {Math.round(data.main.temp)} °C</p>
        <p> Humidity: {data.main.humidity}%</p>
        <p> Wind: {data.wind.speed} m/s</p>
      </Card.Body>
    </Card>
  );
};

export default CurrentWeather;
