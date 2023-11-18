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
  { date: new Date("2022-01-01"), value: 200 },
  { date: new Date("2022-02-01"), value: 250 },
  { date: new Date("2022-03-01"), value: 180 },
  { date: new Date("2022-04-01"), value: 300 },
  { date: new Date("2022-05-01"), value: 280 },
  { date: new Date("2022-06-01"), value: 220 },
  { date: new Date("2022-07-01"), value: 300 },
  { date: new Date("2022-08-01"), value: 450 },
  { date: new Date("2022-09-01"), value: 280 },
  { date: new Date("2022-10-01"), value: 600 },
  { date: new Date("2022-11-01"), value: 780 },
  { date: new Date("2022-12-01"), value: 320 }
];

// New York Population Dataset

d3.csv("population_data/New_York_City_Population_by_Borough__1950_-_2040.csv").then(function (data){
  const parseYear = d3.timeParse('%Y');

  data.forEach(d => {
    d.date = parseYear(d.date);
    d.population = +d.population;
  });

  console.log(data);
});


// 

x.domain(d3.extent(dataset, d => d.date));
y.domain([0, d3.max(dataset, d => d.value)]);

// 

svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x)
    .ticks(d3.timeMonth.every(1)) 
    .tickFormat(d3.timeFormat("%b %Y"))); 


// 

svg.append("g")
  .call(d3.axisLeft(y))

// 

const line = d3.line()
  .x(d => x(d.date))
  .y(d => y(d.value));

// 

svg.append("path")
  .datum(dataset)
  .attr("fill", "none")
  .attr("stroke", "red")
  .attr("stroke-width", 2)
  .attr("d", line);