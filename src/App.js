import React from "react";
import "./App.css";
// import Dashboard from './components/Dashboard';
import LanLonBoard from "./components/LanLonBoard";
import Country from "./components/Country";
import Home from "./components/Home";


import { BrowserRouter,Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Home />  } />
          <Route exact path="/LanLonBoard" element={<LanLonBoard />} />
          <Route exact path="/Country" element={<Country />} />
        </Routes>
        
      </BrowserRouter>
      
    </>
  );
}

export default App;
