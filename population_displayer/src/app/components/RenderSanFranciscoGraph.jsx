"use client";

import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { SanFranciscoGraph } from './SanFranciscoGraph';
import { ChatGPTButton } from '../utilities/ChatGPTButton';


export function RenderSanFranciscoGraph () {
  const [sanFranciscoPopulationMap, setSanFranciscoPopulationMap] = useState([]);

  const fetchDataFromCSV = async (csvFilePath) => {
    try {
      const data = await d3.json(csvFilePath);

      let population = data.map(entry => entry.Population);
      let date = data.map(entry => entry.Date);

      const sanFranciscoPopulationMap = date.map((d, i) => ({
        date: d,
        population: population[i],
      }));

      return sanFranciscoPopulationMap;
    } catch (error) {
      console.error('Error fetching CSV data:', error);
      throw error;
    }
  };

  useEffect(() => {
    const csvFilePath = 'population_data/San_Francisco-population.json';

    fetchDataFromCSV(csvFilePath)
      .then((data) => {
        // Set the fetched data in the component state
        setSanFranciscoPopulationMap(data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  

  return (
    <>
      <ChatGPTButton city={"San Francisco's"} />
      <div>
      {sanFranciscoPopulationMap &&
      <SanFranciscoGraph props={sanFranciscoPopulationMap} />
      } 
      </div>
    </>
  );
};