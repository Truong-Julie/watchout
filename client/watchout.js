// start slingin' some d3 here.
var nEnemies = [30, 40, 50];

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