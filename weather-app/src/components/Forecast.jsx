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
  <>
    {error && <div className="mt-4 alert alert-danger">{error}</div>}
    {forecast && (
      <Card className="mt-4 shadow">
        <Card.Header as="h5">5-Day Forecast</Card.Header>
        <Card.Body>
          <Row>
            {summarized.map((day, idx) => (
              <Col key={idx} sm={6} md={4} lg={2} className="mb-3">
                <Card className="text-center">
                  <Card.Body>
                    <Card.Img
                      variant="top"
                      src={day.weatherImg}
                      alt={day.description}
                      style={{ height: "100px", objectFit: "cover" }}
                    />
                    <Card.Title>{dayjs(day.date).format('ddd, MMM D')}</Card.Title>
                    <Card.Text>
                    <strong>High:</strong> {Math.round(day.maxTemp)}°C<br />
                    <strong>Low:</strong> {Math.round(day.minTemp)}°C<br />
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
  </>
);

}

export default Forecast;
