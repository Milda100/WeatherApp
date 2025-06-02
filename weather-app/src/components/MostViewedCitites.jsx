import { useState, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";

function MostViewedCities({ selectedCity, handleSelectCity }) {
    const [mostViewedCities, setMostViewedCities] = useState([]);
    
    const getMostViewedCities = () => {
    const viewedCities = JSON.parse(localStorage.getItem("viewedCities")) || {};
    const sorted = Object.entries(viewedCities)
        .sort((a, b) => b[1] - a[1]) // Sort by view count descending
        .slice(0, 3); // Top 3

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
            <Card className="mt-4 shadow">
            <Card.Header as="h5">Most Viewed Cities</Card.Header>
            <ListGroup variant="flush">
                {mostViewedCities.map(({ city, countryCode, count }) => (
                <ListGroup.Item 
                key={city}  
                onClick={() => handleSelectCity({ name: city, countryCode })} 
                style={{ cursor: 'pointer' }}>
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