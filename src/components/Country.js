import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Country = () => {
  const [countryName, setCountryName] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchCountry = async () => {
    if (!countryName) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
      );
      setCountryData(res.data[0]); 
    } catch (error) {
      console.error("Failed to fetch country data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
    <div className="bg-white py-10 px-10 sm:py-10 sm:px-10">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl mb-5 font-bold text-center tracking-tight text-blue-900 sm:text-4xl">
         Explore detailed information about any country!
        </h2>
      </div>

      <div className="mx-auto grid max-w-7xl  gap-y-20 px-6 lg:px-8 xl:grid-cols-1">
        <div className="max-w-sm mx-auto">
          <label htmlFor="country-input" className="block mb-2 text-sm font-medium text-gray-900">
          </label>
          <input
            onChange={(e) => setCountryName(e.target.value)}
            value={countryName}
            type="text"
            id="country-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter country name"
            required
          />
        </div>
      </div>

      <div className="mx-auto justify-center grid max-w-sm mt-5 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-1">
        <button
          onClick={handleFetchCountry}
          type="button"
          className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${loading ? "animate-pulse" : ""}`}
        >
          {loading ? "Loading..." : "Get Details"}
        </button>
      </div>

      {countryData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10 mb-10 mt-10">
          <CountryCard
            title="Name"
            content={
              <>
                <p>Common Name: {countryData.name.common}</p>
                <p>Official Name: {countryData.name.official}</p>
              </>
            }
          />
          <CountryCard
            title="Currency"
            content={
              <>
                <p>{Object.keys(countryData.currencies)}</p>
                {/* <p>Symbol: {countryData.currencies.BDT.symbol}</p> */}
              </>
            }
          />
          <CountryCard
            title="Capital"
            content={countryData.capital[0]}
          />
          <CountryCard
            title="Population"
            content={countryData.population.toLocaleString()}
          />
          <CountryCard
            title="Languages"
            content={Object.values(countryData.languages).join(', ')}
          />
          <CountryCard
            title="Region"
            content={countryData.region}
          />
          <CountryCard
            title="Subregion"
            content={countryData.subregion}
          />
         
          <CountryCard
            title="Timezones"
            content={countryData.timezones.join(', ')}
          />
        <CountryCard
            title="Maps"
            content={<a href={countryData.maps?.googleMaps} target="_blank" rel="noopener noreferrer">Link to Google Maps</a>}


          />
            <CountryCard
            title="Continents"
            content={countryData.continents}

          />
           <CountryCard
            title="Flag"
            content={<img src={countryData.flags.png} alt="Flag" className="ml-10 px-12 h-20 w-30"/>}
          />
        </div>
      )}
    </div>
    </div>
  );
};

const CountryCard = ({ title, content }) => (
  <div className="block max-w-sm p-6 bg-blue-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
    <div className="font-normal text-gray-700 dark:text-gray-400">{content}</div>
  </div>
);

export default Country;
