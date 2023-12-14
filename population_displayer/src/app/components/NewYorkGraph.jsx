"use client";

import { useState, useEffect, useRef } from 'react'
import * as d3 from "d3";



export function NewYorkGraph() {

const [isNYCGraph, setIsNYCGraph] = useState(false)
const ref = useRef();

useEffect(() => {

  // setting the scale of the graph's container
let margin = { top: 70, right: 30, bottom: 40, left: 80 };
let width = 1200 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;

// setting the scale of the x and y axis

let x = d3.scaleTime()
  .range([0, width]);

let y = d3.scaleLinear()
  .range([height, 0]);

// creating the container for the graph

let svg = d3.select(ref.current)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// adding tooltip 

let toolTip = d3.select("body")
.append("div")
.attr("class", "tool-tip-NYC")

// This will be replaced with live population data (API)

let dataset = [
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

// New York Population Dataset

d3.csv("/population_data/New_York_City_Population_by_Borough__1950_-_2040.csv").then(function (data){

    let NYC = (data[0])
    let date = (Object.keys(NYC).slice(0,10))
    let population = (Object.values(NYC).slice(0,10))

    
    let updatedDataset = dataset.map((entry, index) => ({
      date: new Date(date[index]),
      population: parseInt(population[index], 10),
    }));

// setting y axis scale

// TODO programtic way to set y axis based on the population size
x.domain(d3.extent(updatedDataset, d => d.date));
y.domain([7000000, d3.max(updatedDataset, d => d.population)]);

// the x axis

svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .style("font-size", "14px")
  .call(d3.axisBottom(x)
    .ticks(d3.timeYear.every(5)) 
    .tickFormat(d3.timeFormat("%Y")))
    .call(g => g.select(".domain").remove())
    .selectAll(".tick line")
    .style("stroke-opacity", 0)
    svg.selectAll(".tick text")
    .attr("fill", "#777"); 


// the y axis 

svg.append("g")
  .style("font-size", "10px")
  .call(d3.axisLeft(y)
  .tickSize(0)
  .tickPadding(10))
  .call(g => g.select(".domain").remove())
  .selectAll(".tick text")
  .style("fill", "#777")
  .style("visibility", (d, i, nodes) => {
    if(i === 0){
      return "hidden"
    }
    else {
      return "visible"
    }
  });

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

// title of the graph

svg.append("text")
.attr("class", "chart-title")
.attr("x", margin.right + 200)
.attr("y", margin.top - 100)
.style("font-size", "24px")
.style("font-weight", "bold")
.style("font-family", "sans-serif")
.text("Historical and Projected Population of New York City (1950 - 2040)")

// adding y axis title

svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.style("font-size", "14px")
.style("fill", "#777")
.style("font-family", "sans-serif")
.text("Total Population")

// adding x axis title

svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", width - 570)
    .attr("y", height + 40)
    .style("fill", "#777")
    .style("font-size", "14px")
    .style("font-family", "sans-serif")
    .text("Year");


// adding source credit

svg.append("text")
.attr("class", "source-credit")
.attr("x", width - 1150)
.attr("y", height + margin.bottom + 0.1)
.style("font-size", "7px")
.style("font-family", "sans-serif")
.text("Source: https://data.cityofnewyork.us/")




let line = d3.line()
  .x(d => x(d.date))
  .y(d => y(d.population));

// plotting the line of the graph

svg.append("path")
  .datum(updatedDataset)
  .attr("fill", "none")
  .attr("stroke", "royalblue")
  .attr("stroke-width", 2)
  .attr("d", line);

  // Adding circle to graph when it intersection

  let circle = svg.append("circle")
    .attr("r", 0)
    .attr("fill", "steelblue")
    .style("stroke", "white")
    .attr("opacity", 0.70)
    .style("pointer-events", "none");

  // Adding the rect layer over the graph

  let listeningRect = svg.append("rect")
  .attr("width", width)
  .attr("height", height);

  // setting up the mouse over event

  listeningRect.on("mousemove", function (event) {
    let [xCoord] = d3.pointer(event, this);
    let bisectDate = d3.bisector(d => d.date).left;
    let x0 = x.invert(xCoord);
    let i = bisectDate(updatedDataset, x0, 1);
    let d0 = updatedDataset[i - 1];
    let d1 = updatedDataset[i];
    let d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    let xPos = x(d.date);
    let yPos = y(d.population);

  // Update the circle position

    circle.attr("cx", xPos)
      .attr("cy", yPos);


  // Adding the circle radius

  circle.transition()
  .duration(50)
  .attr("r", 5);

  // Adding the lable

  toolTip
  .style("display", "block")
  .style("left", `${xPos + 100}px`)
  .style("top", `${yPos + 50}px`)
  .html(`<strong>Date:</strong> ${d.date.toLocaleDateString()}<br><strong>Population:</strong> ${d.population.toLocaleString() !== undefined ? (d.population).toLocaleString() : 'N/A'}`)
  });

  // Removing the lable from the graph

  listeningRect.on("mouseleave", function () {
    circle.transition()
      .duration(50)
      .attr("r", 0);

    toolTip.style("display", "none");
  });
});
setIsNYCGraph(true)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
    {isNYCGraph ? (
      <div>
        <div className="chart-container-NYC" ref={ref} ></div>
        <div className="tool-tip-NYC"></div>
      </div>
    ) : (
      <h1>Loading</h1>
    )}
  </div>
  )
}
