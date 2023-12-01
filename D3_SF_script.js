

let margin = { top: 70, right: 30, bottom: 40, left: 80 };
let width = 1200 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;

// setting the scale of the x and y axis

let x = d3.scaleTime()
  .range([0, width]);

let y = d3.scaleLinear()
  .range([height, 0]);

// creating the container for the graph

let svg = d3.select("#chart-container-SF")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// adding tooltip 

let toolTip = d3.select("body")
.append("div")
.attr("class", "tool-tip-SF")

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

d3.json("population_data/San_Francisco-population.json").then(function (data){


  let population = data.map(entry => entry.Population);
  let date = data.map(entry => entry.Date);

  let updatedDataset = dataset.map((entry, index) => ({
    date: new Date(date[index]),
    population: parseInt(population[index], 10),
  }));

  console.log(population)

  // setting y axis scale

x.domain(d3.extent(updatedDataset, d => d.date));
y.domain([500000, d3.max(updatedDataset, d => d.population) + 1000000]);


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
.text("Historical and Projected Population of San Francisco (1950 - 2040)")

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

})