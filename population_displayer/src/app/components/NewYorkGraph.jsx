"use client";

import React, { useEffect, useState, useMemo } from "react";
import * as d3 from "d3";



export function NewYorkGraph() {

  let data = [
    { date: new Date("2022-01-01"), population: 200 },
    { date: new Date("2022-02-01"), population: 250 },
    { date: new Date("2022-03-01"), population: 180 },
    { date: new Date("2022-04-01"), population: 300 },
    { date: new Date("2022-05-01"), population: 280 },
    { date: new Date("2022-06-01"), population: 220 },
    { date: new Date("2022-07-01"), population: 300 },
    { date: new Date("2022-08-01"), population: 450 },
    { date: new Date("2022-09-01"), population: 280 },
    { date: new Date("2022-10-01"), population: 600 },
  ];

  
  d3.csv("population_data/New_York_City_Population_by_Borough__1950_-_2040.csv").then(function (rawData){

    let NYC = (rawData[0])
    let date = (Object.keys(NYC).slice(0,10))
    let population = (Object.values(NYC).slice(0,10))


    let updatedDataset = data.map((entry, index) => ({
      date: new Date(date[index]),
      population: parseInt(population[index], 10),
    }));
  })




  const createGraph = async () => {

    let parseTime = d3.timeParse("%Y-%m-%d");

      data.forEach((d) => {
        d.date = (d.date);
        d.value = +d.population;
      });

      const margin = { top: 70, right: 30, bottom: 40, left: 80 };
      const width = 1200 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;
  
      const svg = d3.select("body").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const x = d3.scaleTime().range([0, width]);
      const y = d3.scaleLinear().range([height, 0]);

          x.domain(d3.extent(data, (d) => { return d.date; }));
          y.domain([0, d3.max(data, (d) => { return d.value; })]);

          svg.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x));
          svg.append("g")
          .call(d3.axisLeft(y));

      const valueLine = d3.line()
          .x((d) => { return x(d.date); })
          .y((d) => { return y(d.value); });

        svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", valueLine)


        // vertical graph lines

        svg.selectAll("xGrid")
        .data(x.ticks().slice(1))
        .join("line")
        .attr("x1", d => x(d))
        .attr("x2", d => x(d))
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "#e0e0e0")
        .attr("stroke-width", .5)

        // horizontal graph lines

        svg.selectAll("yGrid")
        .data(y.ticks().slice(1))
        .join("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", d => y(d))
        .attr("y2", d => y(d))
        .attr("stroke", "#e0e0e0")
        .attr("stroke-width", .5)
    }
          
  useEffect(() => {
    createGraph();
  }, []);


  return (
     <>
     <div>

     </div>
     </>
  );
}