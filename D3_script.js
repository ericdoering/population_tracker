// 


const margin = { top: 70, right: 30, bottom: 40, left: 80 };
const width = 1200 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

//

const x = d3.scaleTime()
  .range([0, width]);

const y = d3.scaleLinear()
  .range([height, 0]);

// 

const svg = d3.select("#chart-container")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// This will be replaced with live population data (API)

const dataset = [
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

d3.csv("population_data/New_York_City_Population_by_Borough__1950_-_2040.csv").then(function (data){

    let NYC = (data[0])
    let date = (Object.keys(NYC).slice(0,10))
    let population = (Object.values(NYC).slice(0,10))

    
    const updatedDataset = dataset.map((entry, index) => ({
      date: new Date(date[index]),
      population: parseInt(population[index], 10),
    }));



// 

x.domain(d3.extent(updatedDataset, d => d.date));
y.domain([7000000, d3.max(updatedDataset, d => d.population)]);

// 

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


// 

svg.append("g")
  .style("font-size", "14px")
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

// 

svg.selectAll("xGrid")
.data(x.ticks().slice(1))
.join("line")
.attr("x1", d => x(d))
.attr("x2", d => x(d))
.attr("y1", 0)
.attr("y2", height)
.attr("stroke", "#e0e0e0")
.attr("stroke-width", .5)

//

svg.selectAll("yGrid")
.data(y.ticks().slice(1))
.join("line")
.attr("x1", d => 0)
.attr("x2", d => width)
.attr("y1", d => y(d))
.attr("y2", d => y(d))
.attr("stroke", "#e0e0e0")
.attr("stroke-width", .5)



const line = d3.line()
  .x(d => x(d.date))
  .y(d => y(d.population));

// 

svg.append("path")
  .datum(updatedDataset)
  .attr("fill", "none")
  .attr("stroke", "royalblue")
  .attr("stroke-width", 2)
  .attr("d", line);
  })