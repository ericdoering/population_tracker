"use client";

import React, { useState, useReducer } from 'react';
import Image from 'next/image';
import { RenderNYCGraph } from "../app/components/RenderNYCGraph";
import { RenderChicagoGraph } from "../app/components/RenderChicagoGraph"
import { RenderSanFranciscoGraph } from "./components/RenderSanFranciscoGraph";
import chicago from "../../assets/Chicago.png";
import nyc from "../../assets/NYC.png";
import sanfrancisco from "../../assets/san_francisco.png"

const initialState = {
  city: null,
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
  let [city, setCity] = useState(null);
  let cityData = {
    'Chicago': chicago,
    'NYC': nyc,
    'San Francisco': sanfrancisco
  };

  const handleCityChange = (selectedCity) => {
    setCity(selectedCity);
  };


  return (
    <>
      <header className="header"></header>
          <div className="fixed top-20 left-40 transform -translate-x-1/2 text-center">
            <button
              className="bg-blue-900 block mb-6 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-2xl shadow-black"
              onClick={() => dispatch({ type: 'NYC' }, handleCityChange("NYC"))}>New York City, NY</button>
            <button
              className="bg-blue-900 block mb-6 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-2xl shadow-black"
              onClick={() => dispatch({ type: 'Chicago' }, handleCityChange("Chicago"))}>Chicago, IL</button>
            <button
              className="bg-blue-900 block mb-8 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-2xl shadow-black"
              onClick={() => dispatch({ type: 'San Francisco' },  handleCityChange("San Francisco"))}>San Francisco, CA</button>
            <div className='mt-20'>
            <Image
              height={300}
              width={200}
              alt="picture of selected city"
              src={city = cityData[city] || ""}
              className={`rounded-xl city-thumbnail ${city ? 'loaded' : null}`} 
              />
            </div>
          </div>
          <div className="bg-gray-500">
          { state.city }
        </div>
      <footer className="footer"></footer>
    </>
  );
};

export default App;


