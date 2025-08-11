import { Card } from "react-bootstrap";
import dayjs from "dayjs";
import getWeatherImg from "./getWeatherImg";

function Forecast({ forecast, error }) {
  if (!forecast) return null;

  // Group forecast data by date
const daily = {};
forecast.list.forEach(item => {
  const date = item.dt_txt.split(" ")[0];
  if (!daily[date]) daily[date] = [];
  daily[date].push(item);
});

  // Create summary: high, low, and a description for each day since data is every 3h
  const summarized = Object.entries(daily)
    .slice(1, 6) // Limit to 5 days
    .map(([date, data]) => {
      const temps = data.map(d => d.main.temp);
      const minTemp = Math.round(Math.min(...temps));
      const maxTemp = Math.round(Math.max(...temps));
      const midIndex = Math.floor(data.length / 2);
      const description = data[midIndex].weather[0].description;
      const main = data[midIndex].weather[0].main;
      const weatherImg = getWeatherImg(main);

      return { date, minTemp, maxTemp, description, weatherImg };
    });

    return (
      <div className="d-flex justify-content-center">
        {error && <div className="mt-4 alert alert-danger">{error}</div>}
        {forecast && (
          <Card id="forecast" className="text-center">
            <Card.Header as="h3">5-Day Forecast</Card.Header>
            <Card.Body>
                {summarized.map((day) => (
                    <Card key={day.date} className="forecast-card">
                      <Card.Body>
                        <Card.Title><strong>{dayjs(day.date).format('ddd, MMM D')}</strong></Card.Title>
                        <Card.Img
                          variant="top"
                          src={day.weatherImg}
                          alt={day.description}
                          id="img-forecast"
                        />
                        <Card.Text className="text-capitalize">
                        <strong>High: {day.maxTemp}°C</strong><br />
                        <strong>Low: {day.minTemp}°C</strong><br />
                        {day.description}
                      </Card.Text>
                      </Card.Body>
                    </Card>
                ))}
            </Card.Body>
          </Card>
        )}
      </div>
    );
}

export default Forecast;
