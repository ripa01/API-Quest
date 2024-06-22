import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; 
// import Footer from './Footer'; 

import weatherImage from '../images/weather.svg'; // Import the image
import countryImage from '../images/country.svg';

export default function Home() {
  return (
    <div>
     
      <Navbar />

      <div className="items-center justify-center mt-11 mx-auto grid max-w-7xl gap-x-3 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <HomeCard
          img={weatherImage} 
          title="Weather Dashboard"
          subtitle="Know about weather"
          link="/LanLonBoard"
        />
        <HomeCard
          img={countryImage} 
          title="Country Dashboard"
          subtitle="Explore countries"
          link="/Country"
        />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

const HomeCard = ({ img, title, subtitle, link }) => (
  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    
      <img className="rounded-t-lg px-10 py-11" src={img} alt="Weather" /> {/* Use the imported image */}
  
    <div className="p-5">
     
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{subtitle}</p>
      <Link
        to={link}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Explore
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
      </Link>
    </div>
  </div>
);
