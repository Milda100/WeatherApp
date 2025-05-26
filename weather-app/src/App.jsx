import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Container, Row, Col, Form, Alert, Card } from "react-bootstrap";
// import CurrentWeather from './components/CurrentWeather';
// import SearchableDropdown from './components/SearchableDropdown';


function App() {
  const [searchTerm, setSearchTerm] = useState(""); //what user types
  const [cityResults, setCityResults] = useState([]); //cities matching search
  const [selectedCity, setSelectedCity] = useState(null); //slected city from results
  const [weather, setWeather] = useState(null); //weather data for slected city
  const [error, setError] = useState(""); //error message if city not found

  const cityApiKey = import.meta.env.VITE_CITY_API_KEY;
  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

  //fetching cities form GeoDB Cities API
  const fetchCities = async (query) => {
    try {
      const response = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`,
        {
          headers: {
            "X-RapidAPI-Key": cityApiKey,
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      setCityResults(response.data.data); //save results to state
    } catch (err) {
      console.error("Failed to fetch cities:", err);
    }
  };

  //Only call the API when the user stops typing for a second
  useEffect(() => {
  const delayDebounce = setTimeout(() => {
    if (searchTerm.length > 3) {
      fetchCities(searchTerm);
    } else {
      setCityResults([]);
    }
  }, 1000); // wait 1000ms after user stops typing

  return () => clearTimeout(delayDebounce); // cancel previous timeout on change
}, [searchTerm]);


  //fetching weather form OpenWeatherMap API
  const fetchWeather = async (cityName) => {
    try {
      const weatherResp = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}&units=metric`
      );

      console.log("Weather Response:", weatherResp.data);

      setWeather(weatherResp.data);
      setError("");
    } catch (err) {
      setWeather(null);
      setError("City not found or weather unavailable.");
    }
  };

  const handleSelectCity = (city) => {
  setSelectedCity(city);       // Save selected city
  fetchWeather(city.name);     // Fetch weather for that city
  setSearchTerm("");           // Clear search input
  setCityResults([]);          // Clear dropdown
};


  return (
    <Container className="py-5">
    <Row className="justify-content-center">
    <Col md={6}>
    <h1 className="text-center mb-4">Weather App</h1>
    <h2>Select a City</h2>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Start typing a city..."
        value={searchTerm}
        onChange={(e) => {
          const query = e.target.value;
          setSearchTerm(query);
          if (query.length > 3) { // Only search when user types 3+ letters
            fetchCities(query);
          } else {
            setCityResults([]);
          }
        }}
      />
      {cityResults.length > 0 && (
        <ul className="list-group mb-3">
          {cityResults.map((city) => (
            <li
              key={city.id}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelectCity(city)}
              style={{ cursor: "pointer" }}
            >
              {city.name}, {city.countryCode}
            </li>
          ))}
        </ul>
      )}

      {selectedCity && <h5 className="mb-3">Weather in {selectedCity.name}</h5>}

      {error && <div className="alert alert-danger">{error}</div>}

      {weather && (
        <Card className="my-4 mx-auto" style={{ maxWidth: "400px" }}>
          <Card.Body>
            <Card.Title>{weather.name}</Card.Title>
            <Card.Text className="text-capitalize">
              {weather.weather[0].description}
            </Card.Text>
          </Card.Body>
          {/* <Card.Img
            variant="top"
            src={``} /> */}

          <p>Temperature: {Math.round(weather.main.temp)}°C</p>
          <p>Conditions: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </Card>
      )}
      </Col>
      </Row>
    </Container>
  );
}


export default App
