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
var paddle2YSpeed = 5;
var ballRadius=10;
const MARGIN_FOR_ERROR = 0;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
const ONE_HALF_PADDLE_HEIGHT = PADDLE_HEIGHT / 2;
// number multiplied by deltaY to determine the bally speed
const REDUCER = 0.175;
const WINNING_SCORE = 10;
var showingWinScreen= false;
var showingLoseScreen=false;

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
  scoreForPlayer = 0;
  scoreForComputer = 0;
  paddle1Y=250;
  paddle2Y=250;
  ballRadius=10;
  ballX = canvas.width / 2;
  ballspeedX = -ballspeedX;
}

function ballReset() {
  if (scoreForPlayer >= WINNING_SCORE) {
    showingWinScreen=true;
ballspeedx=0;
    ballx=canvas.width/2;
    canvasContext.fillText("You Win", 450, 300, 200);
setTimeout(function () {
  gameReset();
}, 6000);


  } else if (scoreForComputer >= WINNING_SCORE) {
    canvasContext.fillText("You Lose", 450, 300, 200);
    showingLoseScreen=true;
    gameReset();
  } else {
    ballX = canvas.width / 2;
    ballspeedX = -ballspeedX;
  }
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
  ballX += ballspeedX;
  ballY += ballspeedY;

  //calls function to control right paddle
  computerMovement();


  // makes boundry on the left resets ball if it goes past the paddle
  if (ballX < PADDLE_WIDTH) 

    if (ballY >= paddle1Y - MARGIN_FOR_ERROR && ballY <= paddle1Y + PADDLE_HEIGHT + MARGIN_FOR_ERROR) {
      ballspeedX = -ballspeedX;
      //Finds exactly which part of the paddle the ball makes contact with and quantifys it by how far it was above (-) or below (+) the middle of the line
      var deltaY = ballY - (paddle1Y + ONE_HALF_PADDLE_HEIGHT);
      console.log(deltaY);
      ballspeedY = deltaY * REDUCER;
      console.log("bounced-left");
    } else {
      scoreForComputer++;
      ballReset();
      console.log("reset-left");

    }
  }

  //makes boundry on right side
  if (ballX > canvas.width - PADDLE_WIDTH) {
    // need to figure out why this works
    if (ballY >= paddle2Y - MARGIN_FOR_ERROR && ballY <= paddle2Y + PADDLE_HEIGHT + MARGIN_FOR_ERROR) {
      ballspeedX = -ballspeedX;
      var deltaY = ballY - (paddle2Y + ONE_HALF_PADDLE_HEIGHT);
      console.log(deltaY);
      ballspeedY = deltaY * REDUCER;
      console.log("bounced-right");
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

// funcition to draw evrything in the game
function drawGame() {
  //black background
  colorRect(0, 0, canvas.width, canvas.height, "black");
  //Left player Paddle
  colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, "white");
  //Right Paddle
  colorRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, "white");
  //Ball
  drawBall(ballX, ballY, ballRadius, "white");

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
