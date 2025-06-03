import { useState, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";

function MostViewedCities({ selectedCity, handleSelectCity }) {
    const [mostViewedCities, setMostViewedCities] = useState([]);
    
    const getMostViewedCities = () => {
    const viewedCities = JSON.parse(localStorage.getItem("viewedCities")) || {};
    const sorted = Object.entries(viewedCities)
        .sort((a, b) => b[1] - a[1]) // Sort by view count descending
        .slice(0, 5); // Top 5

    return sorted.map(([cityKey, count]) => {
      const [city, countryCode] = cityKey.split(",");
      return { city, countryCode, count };
    });
  };

    useEffect(() => {
    setMostViewedCities(getMostViewedCities());
    }, [selectedCity]); // Update list when selectedCity changes

    return (
        <>
        {mostViewedCities.length > 0 && (
            <Card id="most-viewed-cities">
            <Card.Header as="h3">Most Viewed Cities</Card.Header>
            <ListGroup variant="flush">

                {mostViewedCities.map(({ city, countryCode }) => (
                <ListGroup.Item 
                key={city}  
                onClick={() => handleSelectCity({ name: city, countryCode })}
                >

                {city}, {countryCode}
                </ListGroup.Item>
                ))}
                
            </ListGroup>
            </Card>
        )}
        </>
    );
};

export default MostViewedCities;