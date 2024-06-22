import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Language = () => {
  const [languageName, setLanguageName] = useState("");
  const [languageData, setLanguageData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchLanguage = async () => {
    if (!languageName) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://restcountries.com/v3.1/lang/${languageName}`
      );
      setLanguageData(res.data);
    } catch (error) {
      console.error("Failed to fetch language data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white py-10 px-10 sm:py-10 sm:px-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl mb-5 font-bold text-center tracking-tight text-blue-500 sm:text-4xl">
            Explore Comprehensive Details of Countries by Their Spoken Languages!
          </h2>
        </div>

        <div className="mx-auto grid max-w-7xl gap-y-20 px-6 lg:px-8 xl:grid-cols-1">
          <div className="max-w-sm mx-auto">
            <label
              htmlFor="language-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
            </label>
            <input
              onChange={(e) => setLanguageName(e.target.value)}
              value={languageName}
              type="text"
              id="language-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter language name"
              required
            />
          </div>
        </div>

        <div className="mx-auto justify-center grid max-w-sm mt-5 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-1">
          <button
            onClick={handleFetchLanguage}
            type="button"
            className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              loading ? "animate-pulse" : ""
            }`}
          >
            {loading ? "Loading..." : "Get Details"}
          </button>
        </div>

        {languageData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-10 mb-10 mt-10">
            {languageData.map((country, index) => (
              <React.Fragment key={index}>
                <LanguageCard
                  title="Country Details"
                  content={
                    <>
                      {
                        <img
                          src={country.flags.png}
                          alt="Flag"
                          className="ml-10 px-12 h-20 w-30"
                        />
                      }
                      <p>Name: {country.name.common}</p>
                      <p>Languages : {Object.values(country.languages).join(', ')} </p>
                      <p>Continents Name: {country.continents.join(", ")}</p>
                      <p>Region Name: {country.region}</p>
                      <p>Sub-Region Name: {country.subregion}</p>
                    </>
                  }
                />
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const LanguageCard = ({ title, content }) => (
  <div className="block max-w-sm p-6 bg-blue-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {title}
    </h5>
    <div className="font-normal text-gray-700 dark:text-gray-400">
      {content}
    </div>
  </div>
);

export default Language;
