"use client";

import React, { useState, useReducer } from 'react';
import { RenderNYCGraph } from "../app/components/RenderNYCGraph";
import { RenderChicagoGraph } from "../app/components/RenderChicagoGraph"
import { RenderSanFranciscoGraph } from "./components/RenderSanFranciscoGraph";

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
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
    <div>
      <div className="fixed top-20 left-40 transform -translate-x-1/2 text-center">
        <button
          className="bg-blue-900 block mb-8 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-2xl shadow-black"
          onClick={() => dispatch({ type: 'NYC' })}>New York City, NY</button>
        <button
          className="bg-blue-900 block mb-8 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-2xl shadow-black"
          onClick={() => dispatch({ type: 'Chicago' })}>Chicago, IL</button>
        <button
          className="bg-blue-900 block mb-8 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-2xl shadow-black"
          onClick={() => dispatch({ type: 'San Francisco' })}>San Francisco, CA</button>
      </div>
      <div>
      { state.city }
      </div>
    </div>
    </>
  );
};

export default App;


