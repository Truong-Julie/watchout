// start slingin' some d3 here.
var nEnemies = [30, 40, 50];

var gameOptions = {
  height: 500,
  width: 800,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  highScore: 0,
  collision: 0
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

// var updateCollision = function (count) {
//   d3.select(".collisions").select("span")
//   .text(count);
// };
// Using a enemy class -> create a bunch of enemies
var Enemy = function(id) {
  this.id = id;
  this.x = Math.random() * gameOptions.width;
  this.y = Math.random() * gameOptions.height;
  this.r = 5;
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
  .attr('cy', function(d) { return d.y; })
  .attr('r', function(d) { return d.r; });
  // .attr("transform", "translate ( 350, 400 )" )
  // .attr("transform", function(d) { return "translate (" + [d.x, d.y] + ")"; })
  // .call(drag);
// ;


d3.selectAll(".mouse").selectAll("circle")
  .call(d3.behavior.drag()
        .on("drag", function(d) {
          d3.select(this)
          .attr("cx", function(d) {
            //var pointer = d3.event.x;
              if (d3.event.x < 0) {
                return d.x = 0;
              } else if (d3.event.x > gameOptions.width) {
                return d.x = gameOptions.width;
              } else {
                return d.x = d3.event.x;
              }
          })
          .attr("cy", function(d) {
            if (d3.event.y < 0) {
              return d.y = 0;
            } else if (d3.event.y > gameOptions.height) {
              return d.y = gameOptions.height;
            } else {
              return d.y = d3.event.y;
            }
          });
        })
  );

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
  .attr('cy', function(d) { return d.y;} )
  .attr('r', function(d) { return d.r;} );

/******************* BOUNCING ENEMIES ******************************/

var updatePosition = function (enemiesArray) {
  d3.selectAll("circle")
    .data(enemiesArray, function(d) { return d.id; })
    .transition()
    .duration(1000)
    .attr('cx', function(d, i) { return d.x  = Math.random() * gameOptions.width; })
    .attr('cy', function(d) { return d.y = Math.random() * gameOptions.height; });
    // .attr('cx', function(d, i) { return d.x = 10; })
    // .attr('cy', function(d) { return d.y = 10; });
};



//make a function that detects collision 

// var onCollision = function () {
//   gameStats.score = 0;
// };

var checkCollision = function () {
  var player = mouseArray[0];
  var radiusSum = player.r + enemiesArray[0].r;
  var currentScore = gameStats.score;
  if (currentScore > gameStats.highScore) {
    gameStats.highScore = currentScore;
    updateHighScore(gameStats.highScore);
  }
  d3.select(".enemy").selectAll("circle")
    .each(function() {
      var xDiff = this.cx.baseVal.value - player.x; 
      var yDiff = this.cy.baseVal.value - player.y;
      var distance = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2) );
      if (distance < radiusSum) {
        gameStats.score = 0;
      }
    });

  // d3.select(".enemy").selectAll("circle")
  //   .data(enemiesArray)
  //   .each(function (d) {
  //     console.log(d);
  //     var xDiff = this.cx - player.x;
  //     var yDiff = this.cy - player.y;
  //     var distance = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2) );
  //     if (distance < radiusSum) {
  //       gameStats.score = 0;
  //     }
  //   });
    // .each(function() {
    //   var xDiff = this.cx.baseVal.value - player.x; 
    //   var yDiff = this.cy.baseVal.value - player.y;
    //   var distance = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2) );
    //   if (distance < radiusSum) {
    //     gameStats.score = 0;
    //   }
    // });
};

  // for (var i = 0; i < enemiesArray.length; i++) {
  //   var xDiff = enemiesArray[i].x - player.x; 
  //   // console.log(xDiff);
  //   var yDiff = enemiesArray[i].y - player.y;
  //   var distance = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2) );
  //   // distances.push(Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2) ));
  //   //console.log("distance", distance);
  //   // console.log("radius Sum", radiusSum);
  //   if (distance < radiusSum) {
  //     console.log('hit!');
  //     onCollision();
  //   }

  // }

  // for (var i = 0; distances.length; i++) {
  // } 

// d3.selectAll(".enemy")
//   .data(enemiesArray)
//   .

setInterval(function () {
  updatePosition(enemiesArray);
  // checkCollision();
}, 1000);

setInterval(function () {
  gameStats.score++;
  updateCurrentScore(gameStats.score);
}, 100);

// checkCollision();

setInterval(function () { 
  checkCollision();
}, 100);

// radiusSum = player r + enemy r
// Distance = sqrt (playerR^2 + enemyR^2)
// if that any time if the dis btw player and enemy is less than rSum

//




