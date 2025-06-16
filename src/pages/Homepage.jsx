import React, { useState, useEffect } from 'react';
import Weather from '../Components/Weather';

const Homepage = () => {
  const [location, setLocation] = useState(localStorage.getItem('location') || 'Kathmandu');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    localStorage.setItem('location', location);
  }, [location]);

  useEffect(() => {
    const apiKey = 'ba6557cbaea3e10e73b275c325c7503a';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData({
          city: location,
          temperature: data.main.temp,
          description: data.weather[0].description,
        });
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setWeatherData({
          city: location,
          temperature: 'N/A',
          description: 'Unable to fetch weather data.',
        });
      });
  }, [location]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <select value={location} onChange={handleLocationChange}>
        <option value="Kathmandu">Kathmandu</option>
        <option value="New York">New York</option>
        <option value="London">London</option>
        <option value="Tokyo">Tokyo</option>
        <option value="Sydney">Sydney</option>
        <option value="Paris">Paris</option>
      </select>

      <div className="weather-container">
        <Weather weatherData={weatherData} />
      </div>
    </div>
  );
};

export default Homepage;
