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
};

var Player = function () {
  this.path = 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z';
  this.x = gameOptions.width * 0.5;
  this.y = gameOptions.height * 0.5;
  this.angle = 0;
  this.r = 5;
};



/****************** ADD PLAYER TO THE BOARD ***********************/
var mouseArray = [new Player ()];
// console.log(mouse);
// var dragStart = d3.classed

// var drag = d3.behavior.drag()
//             .on("drag", function(d) {
//               // d.x += d3.event.dx;
//               // d.y += d3.event.dy;
//               // d.x = d3.event.dx;
//               // d.y = d3.event.dy;
//               //d.x += d3.mouse(this)[0];
//               // if d.x becomes less than 0
//                 // set d.x to zero
//               d.x < 0 ? 0 : d.x += d3.mouse(this)[0];
//               // else if d.x is greater than 700
//                 // set d.x to 700
//               d.x > 700 ? 700 : d.x += d3.mouse(this)[0];

//               //d.y += d3.mouse(this)[1];
//               d.y < 0 ? 0 : d.y += d3.mouse(this)[1];
//               d.y > 450 ? 450 : d.y += d3.mouse(this)[1];
//               d3.select(this).attr("transform", function(d) {
//                 return "translate(" + d.x + "," + d.y + ")";
//               });
//             });



d3.selectAll(".mouse").selectAll("circle")
  .data(mouseArray)
  .enter()
  .append("circle")
  // .attr('d', function(d) { return d.path; })
  // .attr('view-box', function(d) { return d.x+d.y 0 0});
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; });
  // .attr("transform", "translate ( 350, 400 )" )
  // .attr("transform", function(d) { return "translate (" + [d.x, d.y] + ")"; })
  // .call(drag);
// ;

// DRAG FUNCTION
// d3.select(".mouse").select("circle").call()

d3.selectAll(".mouse").selectAll("circle")
  .call(d3.behavior.drag()
        .on("drag", function(d) {
          d3.select(this)
          .attr("cx", function(d) {
              if (d3.event.x < 0) {
                return 0;
              } else if (d3.event.x > 700) {
                return 700;
              } else {
                return d3.event.x;
              }

            d3.event.x < 0 ? loc = 0 : loc = d3.event.x;
            d3.event.x > 700 ? loc = 700 : loc = d3.event.x;
            // if event is < 0 set to 0
            // if event is > 700 set to 700
            // return loc; 
          })
          .attr("cy", d3.event.y);
        }));

/****************** ADD ENEMIES TO THE BOARD **********************/

var enemiesArray = [];
for (var i = 0; i < gameOptions.nEnemies; i++) {
  var e = new Enemy(i);
  enemiesArray.push(e);
}

// use d3 to add enemies as svg circles to the dom
d3.select(".enemy").selectAll("circle")
  .data(enemiesArray, function(d) { return d.id; })
  .enter()
  .append("circle")
  .attr('cx', function(d) { return d.x;} )
  .attr('cy', function(d) { return d.y;} );

/******************* BOUNCING ENEMIES ******************************/

function updatePosition(enemiesArray) {
  d3.selectAll("circle")
    .data(enemiesArray, function(d) { return d.id; })
    .transition()
    .duration(1000)
    .attr('cx', function(d) { return d.x = Math.random() * gameOptions.width; })
    .attr('cy', function(d) { return d.y = Math.random() * gameOptions.height; });
}

setInterval(function () {
  updatePosition(enemiesArray);
}, 1000);


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