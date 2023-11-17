
import * as d3 from 'd3';

const margin = { top: 70, right: 30, bottom: 40, left: 80 };
const width = 1200 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const x = d3.scaleTime().range([0, width]);
const y = d3.scaleTime().range([0, height]);