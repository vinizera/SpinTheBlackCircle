const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const circle = {
  x: 100,
  y: 100,
  radius: 20,
  dx: 2, // Horizontal speed
  dy: 2, // Vertical speed
};

let missMessage = null; // Tracks the miss message text
let missMessageTimeout = null; // Tracks the timeout to clear the message

// Function to generate random positions
function getRandomPosition(max) {
  return Math.floor(Math.random() * (max - circle.radius * 2)) + circle.radius;
}

// Function to draw the circle
function drawCircle() {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
}

// Function to draw the "Miss" message
function drawMissMessage() {
    if (missMessage) {
      ctx.font = '20px Consolas'; // Set the font to Consolas
      ctx.fillStyle = 'red';
      ctx.textAlign = 'center';
      ctx.fillText(missMessage, canvas.width / 2, canvas.height / 2);
    }
  }
  

// Function to update the circle's position
function updateCirclePosition() {
  // Move the circle
  circle.x += circle.dx;
  circle.y += circle.dy;

  // Bounce off the walls
  if (circle.x - circle.radius <= 0 || circle.x + circle.radius >= canvas.width) {
    circle.dx *= -1;
  }
  if (circle.y - circle.radius <= 0 || circle.y + circle.radius >= canvas.height) {
    circle.dy *= -1;
  }
}

// Function to randomly teleport the circle
function teleportCircle() {
  circle.x = getRandomPosition(canvas.width);
  circle.y = getRandomPosition(canvas.height);
}

// Check if the circle is clicked or missed
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const distance = Math.sqrt(
    (mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2
  );

  if (distance <= circle.radius) {
    alert('You win!');
    teleportCircle(); // After winning, teleport the circle
  } else {
    // Display "Miss" message
    missMessage = 'miss';
    clearTimeout(missMessageTimeout); // Clear any existing timeout
    missMessageTimeout = setTimeout(() => {
      missMessage = null; // Clear the message after 1 second
    }, 1000);
  }
});

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateCirclePosition();
  drawCircle();
  drawMissMessage();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

// Randomly teleport the circle every 3 seconds
setInterval(teleportCircle, 3000);
