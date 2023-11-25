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


d3.csv("population_data/San_Francisco-population.csv").then(function (data){

    console.log(data)

    // let date = (Object.values(SF).slice(15,25))
    // let population = (SF)



    // let population = (Object.values(NYC).slice(0,10))

    
    // let updatedDataset = dataset.map((entry, index) => ({
    //   date: new Date(date[index]),
    //   population: parseInt(population[index], 10),
    // }))

})