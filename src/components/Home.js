import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
// import Footer from './Footer';

import weatherImage from '../images/weather.svg'; // Import the image
import countryImage from '../images/global.svg';
import languageImage from '../images/language.svg';

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className="container mx-auto mt-11 px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <HomeCard
            img={weatherImage}
            title="Latitude & Longitude Weather Dashboard"
            subtitle="Get real-time weather information by entering coordinates!"
            link="/LanLonBoard"
          />
          <HomeCard
            img={countryImage}
            title="Country Information Dashboard"
            subtitle="Explore detailed information about any country!"
            link="/Country"
          />
          <HomeCard
            img={languageImage}
            title="Discover Languages of the World"
            subtitle="Explore Comprehensive Details of Countries by Their Spoken Languages!"
            link="/Language"
          />
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

const HomeCard = ({ img, title, subtitle, link }) => (
  <div className="max-w-sm mx-auto bg-blue-100 border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
    <img className="w-full h-38 object-cover rounded-t-lg px-5 py-5" src={img} alt="card_img" />

    <div className="p-5">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">{subtitle}</p>
      <Link
        to={link}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Explore
        <svg className="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
      </Link>
    </div>
  </div>
);
