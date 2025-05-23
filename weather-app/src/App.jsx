import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import CurrentWeather from './components/CurrentWeather';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeatherData = async () => {
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      
      console.log("Full API Response:", weatherRes.data);

      setWeather(weatherRes.data);
      setError("");
    } catch (err) {
      setWeather(null);
      setError("City not found.");
    }
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Weather App</h1>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={(e) => { e.preventDefault(); fetchWeatherData(); }}>
            <Form.Group className="mb-3" controlId="formCity">
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit">Search</Button>
            </div>
          </Form>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </Col>
      </Row>

      {weather && <CurrentWeather data={weather} />}
    </Container>
  );
}


export default App
