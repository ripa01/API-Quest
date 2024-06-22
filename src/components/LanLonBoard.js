import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const LanLonBoard = () => {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchWeather = async () => {
    if (!lat || !lon) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={API_KEY}`
      );
      setWeather(res.data);
    } catch (error) {
      console.error("Fetching Weather", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>  <Navbar /> 
    <div className="bg-white py-10 px-10 sm:py-10 sm:px-10">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl mb-5 font-bold text-center tracking-tight text-blue-900 sm:text-4xl">
          Weather Dashboard
        </h2>
      </div>

      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-2">
        <div className="max-w-sm mx-auto">
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
        </div>
        <div className="max-w-sm mx-auto">
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
        </div>
      </div>

      <div className="mx-auto justify-center grid max-w-sm mt-5 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-1">
        <button
          onClick={handleFetchWeather}
          type="button"
          className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${loading ? "animate-pulse" : ""}`}
        >
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </div>

      {weather && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10 mb-10 mt-10">
          <WeatherCard title="Country" content={`${weather.name}, ${weather.sys.country}`} />
          <WeatherCard title="Coordinates" content={`Latitude: ${weather.coord.lat}, Longitude: ${weather.coord.lon}`} />
          <WeatherCard
            title="Temperature"
            content={
              <>
                <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C</p>
                <p>Feels Like: {(weather.main.feels_like - 273.15).toFixed(2)} °C</p>
                <p>Min Temperature: {(weather.main.temp_min - 273.15).toFixed(2)} °C</p>
                <p>Max Temperature: {(weather.main.temp_max - 273.15).toFixed(2)} °C</p>
              </>
            }
          />
          <WeatherCard
            title="Wind"
            content={
              <>
                <p>Wind Speed: {weather.wind.speed} m/s</p>
                <p>Wind Direction: {weather.wind.deg}°</p>
                {weather.wind.gust && <p>Wind Gust: {weather.wind.gust} m/s</p>}
              </>
            }
          />
          <WeatherCard title="Weather" content={`${weather.weather[0].main} & ${weather.weather[0].description}`} />
          <WeatherCard
            title="Sunrise & Sunset"
            content={
              <>
                <p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
                <p>Time Zone: {weather.timezone / 3600} hours from UTC</p>
                <p>Date and Time of Data: {new Date(weather.dt * 1000).toLocaleString()}</p>
              </>
            }
          />
          <WeatherCard
            title="Other Info"
            content={
              <>
                <p>Pressure: {weather.main.pressure} hPa</p>
                <p>Humidity: {weather.main.humidity}%</p>
                {weather.main.sea_level && <p>Sea Level: {weather.main.sea_level} hPa</p>}
                {weather.main.grnd_level && <p>Ground Level: {weather.main.grnd_level} hPa</p>}
                <p>Visibility: {weather.visibility} m</p>
                <p>Cloudiness: {weather.clouds.all}%</p>
              </>
            }
          />
        </div>
      )}
    </div>
    </div>
  );
};

const WeatherCard = ({ title, content }) => (
  <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
    <div className="font-normal text-gray-700 dark:text-gray-400">{content}</div>
  </div>
);

export default LanLonBoard;
