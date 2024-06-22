import React, { useState } from 'react';
import axios from 'axios';

const WeatherDashboard = () => {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchWeather = async () => {
    if (!lat || !lon) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={API_KEY}`);
      setWeather(res.data);
    } catch (error) {
      console.error('Fetching Weather', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-10 px-10 sm:py-10 sm:px-10">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl mb-5 font-bold text-center tracking-tight text-blue-900 sm:text-4xl">
          Weather Dashboard
        </h2>
      </div>

      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-2">
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          <li>
            <div className="flex items-center gap-x-6">
              <div>
                <form className="max-w-sm mx-auto">
                  <label htmlFor="lat-input" className="block mb-2 text-sm font-medium text-gray-900">
                    Enter Latitude:
                  </label>
                  <input
                    onChange={(e) => setLat(e.target.value)}
                    value={lat}
                    type="number"
                    id="lat-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter latitude"
                    required
                  />
                </form>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <div>
                <form className="max-w-sm mx-auto">
                  <label htmlFor="lon-input" className="block mb-2 text-sm font-medium text-gray-900">
                    Enter Longitude:
                  </label>
                  <input
                    onChange={(e) => setLon(e.target.value)}
                    value={lon}
                    type="number"
                    id="lon-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter longitude"
                    required
                  />
                </form>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="mx-auto justify-center grid max-w-7xl mt-5 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-1">
        <button
          onClick={handleFetchWeather}
          type="button"
          className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${loading ? "animate-pulse" : ""}`}
        >
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </div>
      {weather && (
        <div className="mx-auto justify-center grid max-w-7xl mt-5 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-1">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Weather in {weather.name}, {weather.sys.country}
          </h5>
          <p>Coordinates: {weather.coord.lat}, {weather.coord.lon}</p>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C</p>
          <p>Feels Like: {(weather.main.feels_like - 273.15).toFixed(2)} °C</p>
          <p>Min Temperature: {(weather.main.temp_min - 273.15).toFixed(2)} °C</p>
          <p>Max Temperature: {(weather.main.temp_max - 273.15).toFixed(2)} °C</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Sea Level: {weather.main.sea_level} hPa</p>
          <p>Ground Level: {weather.main.grnd_level} hPa</p>
          <p>Visibility: {weather.visibility} m</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Wind Direction: {weather.wind.deg}°</p>
          <p>Wind Gust: {weather.wind.gust} m/s</p>
          <p>Cloudiness: {weather.clouds.all}%</p>
          <p>Weather: {weather.weather[0].main} - {weather.weather[0].description}</p>
          <p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
          <p>Time Zone: {weather.timezone / 3600} hours from UTC</p>
          <p>Date and Time of Data: {new Date(weather.dt * 1000).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
