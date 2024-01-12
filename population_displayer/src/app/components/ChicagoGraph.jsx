"use client";

import React, { useEffect, useState, useMemo } from "react";
import * as d3 from "d3";


export function ChicagoGraph(props){

  let data = props.props

  const [hasGraphRendered, setHasGraphRendered] = useState(false)
  const createGraph = async () => {


      data.forEach((d) => {
        d.date = (d.date);
        d.value = +d.population;
      });

      const margin = { top: 70, right: 30, bottom: 40, left: 80 };
      const width = 800 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;
  
      const svg = d3.select("body").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .style("margin-left", "auto")
          .style("margin-right", "auto")
          .style("margin-top", "10%")
          .append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const x = d3.scaleTime().range([0, width]);
      const y = d3.scaleLinear().range([height, 0]);

          x.domain(d3.extent(data, (d) => { return new Date(d.date); }));
          y.domain([4500000, d3.max(data, (d) => { return d.population; })]);

          svg.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x));
          svg.append("g")
          .call(d3.axisLeft(y));

      const valueLine = d3.line()
          .x((d) => { return x(new Date(d.date)); })
          .y((d) => { return y(d.population); });

          const path = svg.append("path")
          .data([data])
          .attr("class", "line")
          .attr("fill", "none")
          .attr("stroke", "navy")
          .attr("stroke-width", 1.5)
          .attr("d", valueLine);

          const totalLength = path.node().getTotalLength();

          path
          .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
          .attr('stroke-dashoffset', totalLength)
          .transition()
          .duration(2000) // Animation duration in milliseconds
          .attr('stroke-dashoffset', 0);



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
        .attr("x", margin.right)
        .attr("y", margin.top - 100)
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .style("font-family", "sans-serif")
        .text("Historical and Projected Population of Chicago (1950 - 2040)")


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
        .attr("x", width - 400)
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
        .text("Source: https://www.macrotrends.net/cities/22956/chicago/population")


        // Adding cicles at intersections

        svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("class", "data-point")
        .attr("cx", d => x(new Date(d.date)))
        .attr("cy", d => y(d.population))
        .attr("r", 4)
        .attr("fill", "navy")
        .style("opacity", 0)
        .transition()
        .duration(1000) 
        .style("opacity", 1);  

        setHasGraphRendered(true)
    }
          
  useEffect(() => {
    if (data.length && !hasGraphRendered) {
      createGraph();
    }
  }, [data]);


  return (
     <>
     <div>

     </div>
     </>
  );
};