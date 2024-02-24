"use client";

import React, { useState, useReducer } from 'react';
import Image from 'next/image';
import { RenderNYCGraph } from "../app/components/RenderNYCGraph";
import { RenderChicagoGraph } from "../app/components/RenderChicagoGraph";
import { RenderSanFranciscoGraph } from "./components/RenderSanFranciscoGraph";
import chicago from "../../assets/Chicago.png";
import nyc from "../../assets/NYC.png";
import sanfrancisco from "../../assets/san_francisco.png";
import { About } from "../app/components/About";

const initialState = {
  city: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'NYC':
      return { city: <RenderNYCGraph /> };
    case 'Chicago':
      return { city: <RenderChicagoGraph /> };
    case 'San Francisco':
      return { city: <RenderSanFranciscoGraph /> };
    default:
      return state;
  }
};

const App = () => {
  let [state, dispatch] = useReducer(reducer, initialState);
  let [selectedCity, setSelectedCity] = useState(undefined);
  let [showAbout, setShowAbout] = useState(false);

  let cityData = {
    'Chicago': chicago,
    'NYC': nyc,
    'San Francisco': sanfrancisco
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
    dispatch({ type: selectedCity });
  };

  const toggleAbout = () => {
    setShowAbout(!showAbout);
  };

  return (
    <>
      <header className="header">
        <h1 className="title font-extrabold tracking-widest subpixel-antialiased">Population Plotter 👥</h1>
        <h1>
          <button onClick={toggleAbout}>About</button>
          {showAbout && <About onClose={toggleAbout} />}
        </h1>
      </header>
      
      <div className="fixed top-20 left-40 transform -translate-x-1/2 text-center">
        <select
          className="bg-blue-900 block mb-6 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-2xl shadow-black"
          value={selectedCity}
          onChange={handleCityChange}>
          {selectedCity == undefined ? <option value="">Select a city</option> : <option disabled>Select a city</option>}
          <option value="NYC">New York City, NY</option>
          <option value="Chicago">Chicago, IL</option>
          <option value="San Francisco">San Francisco, CA</option>
        </select>
        <div className='mt-20'>
          <Image
            height={300}
            width={200}
            alt="picture of selected city"
            src={selectedCity ? cityData[selectedCity] : ""}
            className={`rounded-xl city-thumbnail ${selectedCity ? 'loaded' : ""}`} 
          />
        </div>
      </div>
      <div className="bg-gray-500">
        {state.city}
      </div>
      <footer className="footer"></footer>
    </>
  );
};


export default App;


