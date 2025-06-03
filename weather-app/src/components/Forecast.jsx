import { Card, Row, Col } from "react-bootstrap";
import dayjs from "dayjs";
import getWeatherImg from "./getWeatherImg";

function Forecast({ forecast, error }) {

console.log("Forecast API response:", forecast);

  if (!forecast) return null;

  // Group forecast data by date
const daily = {};
forecast.list.forEach(item => {
  const date = item.dt_txt.split(" ")[0];
  if (!daily[date]) daily[date] = [];
  daily[date].push(item);
});

console.log("Grouped forecast by date:", daily);


  // Create summary: high, low, and a description for each day
  const summarized = Object.entries(daily)
    .slice(0, 5) // Limit to 5 days
    .map(([date, data]) => {
      const temps = data.map(d => d.main.temp);
      const minTemp = Math.min(...temps).toFixed(1);
      const maxTemp = Math.max(...temps).toFixed(1);
      const description = data[Math.floor(data.length / 2)].weather[0].description;
      const weatherImg = getWeatherImg(data[0].weather[0].main);

      return { date, minTemp, maxTemp, description, weatherImg };
    });

    

    return (
  <div className="d-flex justify-content-center">
    {error && <div className="mt-4 alert alert-danger">{error}</div>}
    {forecast && (
      
      <Card id="forecast" className="text-center">
        <Card.Header as="h3">5-Day Forecast</Card.Header>
        <Card.Body>
          <Row className="d-flex justify-content-center">
            {summarized.map((day, idx) => (
              <Col key={idx} className="d-flex justify-content-center" id="forecast-card">
                <Card>
                  <Card.Body>
                    <Card.Title><strong>{dayjs(day.date).format('ddd, MMM D')}</strong></Card.Title>
                    <Card.Img
                      variant="top"
                      src={day.weatherImg}
                      alt={day.description}
                      id="img-forecast"
                    />
                    <Card.Text className="text-capitalize">
                    <strong>High: {Math.round(day.maxTemp)}°C</strong><br />
                    <strong>Low: {Math.round(day.minTemp)}°C</strong><br />
                    {day.description}
                  </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    )}
  </div>
);

}

export default Forecast;
