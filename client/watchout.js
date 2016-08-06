// start slingin' some d3 here.
var nEnemies = [30, 40, 50];

var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0
};

// function to generate a coordinate based on the limits of the board
var axes = {
  x: d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
  y: d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])
};

var gameBoard = d3.select(".board")
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height)
  .attr('padding', gameOptions.padding);

  


d3.select("body").select(".board").selectAll("div")
  .data(nEnemies, function (d) { return d; })
  .enter()
  .append("div")
  .text(function (d) { return d; });

d3.select("body").select(".board").select("svg").selectAll("circle")
  // .data(nEnemies, function(d) {return d;})
  .data([1])
  .enter()
  .append("circle")
  .attr("cx", "25")
  .attr("cy", "25")
  .attr("r", "22");

var Enemies = function () {

}