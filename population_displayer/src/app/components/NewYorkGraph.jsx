"use client";

import React, { useEffect, useState, useMemo } from "react";
import * as d3 from "d3";



export function NewYorkGraph(props){

  let data = props.props

  const [hasGraphRendered, setHasGraphRendered] = useState(false)
  const createGraph = async () => {


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

          x.domain(d3.extent(data, (d) => { return new Date(d.date); }));
          y.domain([7000000, d3.max(data, (d) => { return d.population; })]);

          svg.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x));
          svg.append("g")
          .call(d3.axisLeft(y));

      const valueLine = d3.line()
          .x((d) => { return x(new Date(d.date)); })
          .y((d) => { return y(d.population); });

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
}