"use client";

import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { NYCGraph } from './NYCGraph';
import { ChatGPTButton } from '../utilities/ChatGPTButton';


export function RenderNYCGraph () {
  const [nycPopulationMap, setNycPopulationMap] = useState([]);

  const fetchDataFromCSV = async (csvFilePath) => {
    try {
      const data = await d3.csv(csvFilePath);
      const NYC = data[0];
      const date = Object.keys(NYC).slice(0, 10);
      const population = Object.values(NYC).slice(0, 10);

      const nycPopulationMap = date.map((d, i) => ({
        date: d,
        population: population[i],
      }));

      return nycPopulationMap;
    } catch (error) {
      console.error('Error fetching CSV data:', error);
      throw error;
    }
  };

  useEffect(() => {
    const csvFilePath = 'population_data/New_York_City_Population_by_Borough__1950_-_2040.csv';

    fetchDataFromCSV(csvFilePath)
      .then((data) => {
        // Set the fetched data in the component state
        setNycPopulationMap(data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  

  return (
    <>
      <div>
        <ChatGPTButton city={"New York City"} />
        {nycPopulationMap &&
        <NYCGraph props={nycPopulationMap} />
        } 
      </div>
    </>
  );
};