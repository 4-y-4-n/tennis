// Pong game variables
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

let paddleLeftY = canvas.height / 2 - paddleHeight / 2;
let paddleRightY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Keyboard controls
let upPressed = false;
let downPressed = false;
let wPressed = false;
let sPressed = false;

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    upPressed = true;
  } else if (event.key === 'ArrowDown') {
    downPressed = true;
  } else if (event.key === 'w') {
    wPressed = true;
  } else if (event.key === 's') {
    sPressed = true;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowUp') {
    upPressed = false;
  } else if (event.key === 'ArrowDown') {
    downPressed = false;
  } else if (event.key === 'w') {
    wPressed = false;
  } else if (event.key === 's') {
    sPressed = false;
  }
});

// Update the game
function update() {
  // Move paddles
  if (upPressed && paddleLeftY > 0) {
    paddleLeftY -= 7;
  } else if (downPressed && paddleLeftY + paddleHeight < canvas.height) {
    paddleLeftY += 7;
  }

  if (wPressed && paddleRightY > 0) {
    paddleRightY -= 7;
  } else if (sPressed && paddleRightY + paddleHeight < canvas.height) {
    paddleRightY += 7;
  }

  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collisions with walls
  if (ballY <= 0 || ballY >= canvas.height - ballSize) {
    ballSpeedY *= -1;
  }

  // Ball collisions with paddles
  if (
    (ballX <= paddleWidth && ballY + ballSize >= paddleLeftY && ballY <= paddleLeftY + paddleHeight) ||
    (ballX >= canvas.width - paddleWidth - ballSize && ballY + ballSize >= paddleRightY && ballY <= paddleRightY + paddleHeight)
  ) {
    ballSpeedX *= -1;
  }

  // Ball out of bounds
  if (ballX <= 0 || ballX >= canvas.width - ballSize) {
    // You can implement game over or score logic here
    // For this simple example, we reset the ball to the center
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX *= -1;
  }
}

// Draw the game
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  ctx.fillStyle = 'white';
  ctx.fillRect(0, paddleLeftY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, paddleRightY, paddleWidth, paddleHeight);

  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
}

// Game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
