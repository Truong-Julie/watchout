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
  highScore: 0
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

var updateCurrentScore = function (score) {
  d3.select(".current").select("span")
  .text(score);
};

// not sure where to update score?
//gameStats.highScore = Math.max(gameStats.highScore, gameStats.score);
var updateHighScore = function (score) {
  d3.select(".highscore").select("span")
  .text(score);
};


// Using a enemy class -> create a bunch of enemies
var Enemy = function(id) {
  this.id = id;
  this.x = Math.random() * gameOptions.width;
  this.y = Math.random() * gameOptions.height;
  // this.x = axes.x(Math.random()) * gameOptions.width;
  // this.y = axes.y(Math.random()) * gameOptions.height;
};
// init a bunch of enenmies
var enemiesArray = [];
for (var i = 0; i < gameOptions.nEnemies; i++) {
  var e = new Enemy(i);
  enemiesArray.push(e);
}
// push to enemies array

console.log(enemiesArray);
// use d3 to add enemies as svg circles to the dom
d3.select("body").select(".board").select("svg").selectAll("circle")
  .data(enemiesArray, function(d) { return d.id; })
  .enter()
  .append("circle")
  .attr('cx', function(d) { return d.x;} )
  .attr('cy', function(d) { return d.y;} );


var Player = function () {
  this.path = 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z';
  this.fill = '#ff6600';
  this.x = gameOptions.width * 0.5;
  this.y = gameOptions.height * 0.5;
  this.angle = 0;
  this.r = 5;

};





// d3.select("body").select(".board").selectAll("div")
//   .data(nEnemies, function (d) { return d; })
//   .enter()
//   .append("div")
//   .text(function (d) { return d; });

// d3.select("body").select(".board").select("svg").selectAll("circle")
//   // .data(nEnemies, function(d) {return d;})
//   .data([1])
//   .enter()
//   .append("circle")
//   .attr("cx", "25")
//   .attr("cy", "25")
//   .attr("r", "22");

// var Enemies = function () {

// }