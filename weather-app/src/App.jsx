import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Container, Row, Col } from "react-bootstrap";
import CurrentWeather from './components/CurrentWeather';
import SearchableDropdown from './components/SearchableDropdown';
import MostViewedCities from './components/mostViewedCitites';
import Forecast from './components/Forecast';


function App() {
  const [searchTerm, setSearchTerm] = useState(""); //what user types
  const [cityResults, setCityResults] = useState([]); //cities matching search
  const [selectedCity, setSelectedCity] = useState(null); //slected city from results
  const [weather, setWeather] = useState(null); //weather data for slected city
  const [forecast, setForcast] = useState(null); // 5 day weather forecast for selected city
  const [error, setError] = useState(""); //error message if city not found

  const cityApiKey = import.meta.env.VITE_CITY_API_KEY;
  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

  //fetching cities form GeoDB Cities API (for SearchableDropdown)
  const fetchCities = async (query) => {
    try {
      const response = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
        {
          params: {
            namePrefix: query,
            limit: 5, // This limits the results to 5 cities
            countryIds: 'LT',  // Limit to Lithuania
          },
          headers: {
            "X-RapidAPI-Key": cityApiKey,
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      console.log("API response data:", response.data);
      setCityResults(response.data.data); //save results to state
    } catch (err) {
      console.error("Failed to fetch cities:", err);
    }
  };

  //Only call the API when the user stops typing for a second
    useEffect(() => {
    const delayDebounce = setTimeout(() => {
        if (searchTerm.length > 1) { // Only search if > 1 characters
        fetchCities(searchTerm);
        } else {
        setCityResults([]);
        }
    }, 300); // wait 300ms after user stops typing

    return () => clearTimeout(delayDebounce); // cancel previous timeout on change
    }, [searchTerm]);

  //fetching weather form OpenWeatherMap API
  const fetchWeather = async (cityName) => {
    try {
      const [weatherResp, forecastResp] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}&units=metric`),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${weatherApiKey}&units=metric`)
      ]);

      console.log("Weather Response:", weatherResp.data);
      console.log("Forecast Response:", forecastResp.data);

      setWeather(weatherResp.data);
      setForcast(forecastResp.data);
      setError("");
    } catch (err) {
      setWeather(null);
      setForcast(null);
      setError("City not found or weather unavailable.");
    }
  };

  const handleSelectCity = (city) => {
  setSelectedCity(city);       // Save selected city
  fetchWeather(city.name);     // Fetch weather for that city
  setSearchTerm("");           // Clear search input
  setCityResults([]);          // Clear dropdown

  // Update viewed cities count in localStorage
  const viewedCities = JSON.parse(localStorage.getItem("viewedCities")) || {};
  const cityKey = `${city.name},${city.countryCode}`; // Unique key
  viewedCities[cityKey] = (viewedCities[cityKey] || 0) + 1;
  localStorage.setItem("viewedCities", JSON.stringify(viewedCities));

  // Log city selection to server
  axios.post('http://localhost:5000/log-city-selection', {
    city: city.name,
    countryCode: city.countryCode
  }).catch(err => {
    console.error("Failed to log city selection:", err);
  });
};


  return (
    <Container className="py-5">
    <h1 className="text-center mb-4">Weather App</h1>
  <Row>
      {/* Sidebar: Most Viewed Cities */}
    <Col md={4} xs={12} className="mb-4 mb-md-0 order-1 order-md-2">
      <MostViewedCities 
      selectedCity={selectedCity} 
      handleSelectCity={handleSelectCity} 
      />
    </Col>

       {/* Main Content (Search & Weather) */}
      <Col md={8} xs={12} className="order-2 order-md-1">  
      <SearchableDropdown
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cityResults={cityResults}
        handleSelectCity={handleSelectCity}
        setSelectedCity={setSelectedCity}
        setError={setError}
      />
      <CurrentWeather
        selectedCity={selectedCity}
        weather={weather}
        error={error}
      />
      <Forecast 
        forecast={forecast}
        error={error}
      />
    </Col>
  </Row>
</Container>

  );
}


export default App
