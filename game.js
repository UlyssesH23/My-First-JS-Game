// My First JS game

// Creates variable for canvas
var canvas;
// Creates variable for everything in the canvas window
var canvasContext;
//Creates speed of  ball horizontally
var ballX = 50;
var ballspeedX = 5;
var scoreForPlayer = 0;
var scoreForComputer = 0;
var ballY = 50;
var ballspeedY = 5;
var paddle2Y = 250;
var paddle2YSpeed = 4.25;
var ballRadius = 10;
const MARGIN_FOR_ERROR = 5;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
const ONE_HALF_PADDLE_HEIGHT = PADDLE_HEIGHT / 2;
// number multiplied by deltaY to determine the bally speed
// calculated so the ball speed is never greater than 6
const REDUCER = 0.109091;
const WINNING_SCORE = 10;
const NET_LINE_WIDTH=2;
const NET_LINE_HEIGHT=20;
var showingWinScreen = false;
var showingLoseScreen = false;
var showingStartScreen = true;
var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
var chosenBallColor= "white";
var ballColor = "white";
var chosenColor="white";
var randomColor="white";

function calculateMousePos(evt) {

  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  }

}

// gets random number
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomColor(){
  var num = getRandomInt(49);
  var chosenColor = colorArray[num];
  if (chosenColor === randomColor ){
    var num = getRandomInt(49);
    chosenColor = colorArray[num];
}
else{
  var randomColor = chosenColor;
}
}

function changeBallColor() {
  var num = getRandomInt(49);
  var chosenBallColor = colorArray[num];

  if (chosenBallColor === ballColor){
    var num = getRandomInt(49);
    var chosenBallColor = colorArray[num];
  }
else{
  ballColor = chosenBallColor;
}
}

// Stops JS from loading till window loads
window.onload = function() {

  console.log("%c Hello World", "color:blue; font-weight:bold;");
  // Attachs canvas var to canvas on HTML page
  canvas = document.getElementById("gameCanvas");
  // Sets canvasContext var as the 2d objects in the canvas
  canvasContext = canvas.getContext("2d");
  var framesPerSecond = 60;
  setInterval(function() {
    drawGame();
    animateGame();
  }, 1000 / framesPerSecond);
  canvas.addEventListener("mousemove",
    function(evt) {
      var mousePos = calculateMousePos(evt);
      paddle1Y = mousePos.y - ONE_HALF_PADDLE_HEIGHT;
      paddle1X = mousePos.x;

    });

}




function gameReset() {
  showingWinScreen = false;
  showingLoseScreen = false;
  showingStartScreen = false;
  scoreForPlayer = 0;
  scoreForComputer = 0;
  paddle1Y = 250;
  paddle2Y = 250;
  ballRadius = 10;
  ballX = canvas.width / 2;
  ballspeedX = -ballspeedX;
}


function computerMovement() {


  var paddle2YCenter = paddle2Y + ONE_HALF_PADDLE_HEIGHT;
  if (paddle2YCenter < ballY - 35) {
    //moves it down by paddle2YSpeed
    paddle2Y += paddle2YSpeed;
  }
  // moves it up by paddle2YSpeed
  else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= paddle2YSpeed;
  } else {
    paddle2Y = paddle2Y;
  }

}

// animates game
function animateGame() {
  //stops animate game from running if pne of the screens showing
  if (showingWinScreen || showingLoseScreen || showingStartScreen) {

    return;
  }
  //calls function to control right paddle
  computerMovement();
  // gives ball horizontal movement
  ballX += ballspeedX;
  //gives ball vertical movement
  ballY += ballspeedY;

  // makes boundry on the left resets ball if it goes past the paddle
  if (ballX < PADDLE_WIDTH+ballRadius)

    if (ballY >= paddle1Y - MARGIN_FOR_ERROR && ballY <= paddle1Y + PADDLE_HEIGHT + MARGIN_FOR_ERROR) {
      ballspeedX = -ballspeedX;
      //Finds exactly which part of the paddle the ball makes contact with and quantifys it by how far it was above (-) or below (+) the middle of the line
      var deltaY = ballY - (paddle1Y + ONE_HALF_PADDLE_HEIGHT);
      console.log(deltaY);
      ballspeedY = deltaY * REDUCER;
      console.log("bounced-left");
        changeBallColor();
    } else {
      scoreForComputer++;
      ballReset();
      console.log("reset-left");

    }




  //makes boundry on right side
  if (ballX > canvas.width - PADDLE_WIDTH-ballRadius) {
    // need to figure out why this works
    if (ballY >= paddle2Y - MARGIN_FOR_ERROR && ballY <= paddle2Y + PADDLE_HEIGHT + MARGIN_FOR_ERROR) {
      ballspeedX = -ballspeedX;
      var deltaY = ballY - (paddle2Y + ONE_HALF_PADDLE_HEIGHT);
      console.log(deltaY);
      ballspeedY = deltaY * REDUCER;
      console.log("bounced-right");
        changeBallColor();
    } else {
      // must add points before reset
      scoreForPlayer++;

      ballReset();
      console.log("reset-right");

    }
  }

  // keeps ball form disapeering on bottom
  if (ballY > canvas.height - 25) {
    ballspeedY = -ballspeedY;

  }
  // keeps ball from disapeering on top
  if (ballY < 50) {
    ballspeedY = -ballspeedY;
  }
}

function ballReset() {
  // Displays winning Screen
  if (scoreForPlayer >= WINNING_SCORE) {
    showingWinScreen = true;

  } else if (scoreForComputer >= WINNING_SCORE) {
    showingLoseScreen = true;

  } else {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballspeedX = -ballspeedX;
  }
}

// funcition to draw evrything in the game
function drawGame() {

  //black background
  colorRect(0, 0, canvas.width, canvas.height, "black");
  if (showingWinScreen || showingLoseScreen || showingStartScreen) {
    stopGame();
    return;
  }
  // Draws net
  drawNet();
  //Left player Paddle
  colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, "white");
  //Right Paddle
  colorRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, "white");
  //Ball
  drawBall(ballX, ballY, ballRadius, ballColor);
  //Player scores
  canvasContext.fillStyle="white";
  canvasContext.font = "20px Georgia";
  canvasContext.fillText(scoreForPlayer, 100, 100);
  canvasContext.fillText(scoreForComputer, 700, 100);

}

function colorRect(leftX, topY, width, height, drawColor) {
  // Sets color of .fill
  canvasContext.fillStyle = drawColor;
  // Creates rectangle in canvas and uses the .fill to fill in previously specified color
  // cordinate for x,y set location for top left corner of the box to perfectly place subtract desired cordinates by 1/2 x or y for width and height respectively

  canvasContext.fillRect(leftX, topY, width, height);
}

function drawBall(centerX, centerY, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}
function drawNet(){
  for ( i=0; i  < canvas.height; i+=40){
    getRandomColor();
    console.log(randomColor);
    colorRect(canvas.width/2 - 1,  i ,NET_LINE_WIDTH, NET_LINE_HEIGHT, randomColor);
  }
}

function stopGame() {
  if (showingWinScreen) {
    canvasContext.fillStyle = "white";
    canvasContext.font = "20px Georgia";
    canvasContext.fillText("You Win!", 325, 300);
    canvasContext.font = "10px Georgia";
    canvasContext.fillText("Click to continue", 375, 400);
    resetClick();
    return;
  } else if (showingLoseScreen) {
      canvasContext.fillStyle = "white";
    canvasContext.font = "20px Georgia";
    canvasContext.fillText("You Lost!", 325, 300);
    canvasContext.font = "10px Georgia";
    canvasContext.fillText("Click to continue", 375, 400);
    resetClick();
    return;
  } else if (showingStartScreen) {
    canvasContext.fillStyle = "white";
    canvasContext.font = "30px Georgia";
    canvasContext.fillText("Whiff Whaff", 325, 300);
    canvasContext.font = "10px Georgia";
    canvasContext.fillText("Click to Start Game", 375, 400);
    resetClick();
    return;
  }


}

function resetClick() {
  canvas.addEventListener('click', function(event) {
    if (showingWinScreen || showingLoseScreen || showingStartScreen) {
      gameReset();

    }
  });
}
