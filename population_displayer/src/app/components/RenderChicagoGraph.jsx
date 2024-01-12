"use client";

import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { ChicagoGraph } from './ChicagoGraph';


export function RenderChicagoGraph () {
  const [chicagoPopulationMap, setChicagoPopulationMap] = useState([]);

  const fetchDataFromCSV = async (csvFilePath) => {
    try {
      const data = await d3.json(csvFilePath);

      let population = data.map(entry => entry.Population);
      let date = data.map(entry => entry.Date);

      const chicagoPopulationMap = date.map((d, i) => ({
        date: d,
        population: population[i],
      }));

      return chicagoPopulationMap;
    } catch (error) {
      console.error('Error fetching CSV data:', error);
      throw error;
    }
  };

  useEffect(() => {
    const csvFilePath = 'population_data/Chicago-population-2023-12-04.json';

    fetchDataFromCSV(csvFilePath)
      .then((data) => {
        // Set the fetched data in the component state
        setChicagoPopulationMap(data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts



  return (
    <>
      <div>
        {chicagoPopulationMap &&
        <ChicagoGraph props={chicagoPopulationMap} />
        } 
      </div>
    </>
  );
};