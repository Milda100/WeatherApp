import { Card, Row, Col } from "react-bootstrap";

const Forecast = ({ data }) => {
  const daily = data.filter((item) => item.dt_txt.includes("12:00:00"));

  return (
    <div className="mt-4 text-center">
      <h2>5-Day Forecast</h2>
      <Row className="justify-content-center">
        {daily.map((item, index) => (
          <Col md={2} sm={4} xs={6} key={index} className="my-2">
            <Card>
              <Card.Body className="p-2">
                <Card.Title style={{ fontSize: "1rem" }}>
                  {new Date(item.dt_txt).toLocaleDateString()}
                </Card.Title>
                <Card.Text className="text-capitalize">
                  {item.weather[0].description}
                </Card.Text>
                <p>{item.main.temp} °C</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Forecast;
