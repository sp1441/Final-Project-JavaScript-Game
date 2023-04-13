
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
const segmentSize = 10;
let serpent = [{ x: 5, y: 5 }];
let snack = { x: 10, y: 10 };
let heading = 'right';
let interval;
let obstacles = [];
let score = 0;

function resetGame() {
  serpent = [{ x: 5, y: 5 }];
  snack = [{ x: 10, y: 10 }];
  heading = "right";
  score = 0
  updateSnackScore();
  obstacles = [];
}

function displayGameOver() {
  const gameOverButton = document.getElementById("gameOverButton");
  gameOverButton.style.display = "block";
  gameOverButton.onclick = hideGameOverButton;
}

function hideGameOverButton() {
  const gameOverButton = document.getElementById("gameOverButton");
  gameOverButton.style.display = "none";
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  resetGame();
}

function updateSnackScore() {
  document.getElementById("snackScore").innerText = `Score: ${score}`;
}

function drawSegment(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * segmentSize, y * segmentSize, segmentSize, segmentSize);
}

function drawSerpent() {
  serpent.forEach(part => {
    drawSegment(part.x, part.y, "purple");
  });
}

function drawObstacles() {
  obstacles.forEach(obstacle => {
    drawSegment(obstacle.x, obstacle.y, "orange");
  })
}


function createObstacle(count) {
  for (let i = 0; i < count; i++) {
    const directions = ["right", "left", "up", "down"];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const obstacle = {
      x: Math.floor(Math.random() * gameCanvas.width / segmentSize),
      y: Math.floor(Math.random() * gameCanvas.height / segmentSize),
      direction: randomDirection
    };
    obstacles.push(obstacle);
  }
}

function changeObstacleDirection(obstacle) {
  const centerX = gameCanvas.width / (2 * segmentSize);
  const centerY = gameCanvas.height / (2 * segmentSize);

  const directions = [];

  if (obstacle.x < centerX) {
    directions.push("right");
  } else {
    directions.push("left");
  }

  if (obstacle.y < centerY) {
    directions.push("down");
  } else {
    directions.push("up");
  }

  const randomDirection = directions[Math.floor(Math.random() * directions.length)];
  obstacle.direction = randomDirection;
}


function moveSerpent() {
  let head = { x: serpent[0].x, y: serpent[0].y };
  switch (heading) {
    case 'right':
      head.x++;
      break;
    case 'left':
      head.x--;
      break;
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
  }
  serpent.unshift(head);
  if (head.x === snack.x && head.y === snack.y) {
    score++;
    updateSnackScore();
    snack.x = Math.floor(Math.random() * gameCanvas.width / segmentSize);
    snack.y = Math.floor(Math.random() * gameCanvas.height / segmentSize);

    if (score % 5 === 0) {
      createObstacle(1);
    }
  } else {
    serpent.pop();
  }
}

function moveObstacles() {
  obstacles.forEach(obstacle => {
    switch (obstacle.direction) {
      case "right":
        obstacle.x++;
        break;
      case "left":
        obstacle.x--;
        break;
      case "up":
        obstacle.y--;
        break;
      case "down":
        obstacle.y++;
        break;
    }
    if (obstacle.x < 0 || obstacle.x >= gameCanvas.width / segmentSize || obstacle.y < 0 || obstacle.y >= gameCanvas.height / segmentSize) {
      const sides = ["top", "bottom", "right", "left"];
      const respawnRandomSide = sides[Math.floor(Math.random() * sides.length)];

      switch (respawnRandomSide) {
        case "top":
          obstacle.x = Math.floor(Math.random() * gameCanvas.width / segmentSize);
          obstacle.y = 0;
          break;
        case "bottom":
          obstacle.x = Math.floor(Math.random() * gameCanvas.width / segmentSize);
          obstacle.y = gameCanvas.height / segmentSize - 1;
          break;
        case "right":
          obstacle.x = gameCanvas.width / segmentSize - 1;
          obstacle.y = Math.floor(Math.random() * gameCanvas.height / segmentSize);
          break;
        case "left":
          obstacle.x = 0;
          obstacle.y = Math.floor(Math.random() * gameCanvas.height / segmentSize);
          break;
      }
      changeObstacleDirection(obstacle);
    }
  });
}

function handleArrow(event) {
  switch (event.key) {
    case 'ArrowRight':
      if (heading !== 'left') {
        heading = 'right';
      }
      break;
    case 'ArrowLeft':
      if (heading !== 'right') {
        heading = 'left';
      }
      break;
    case 'ArrowUp':
      if (heading !== 'down') {
        heading = 'up';
      }
      break;
    case 'ArrowDown':
      if (heading !== 'up') {
        heading = 'down';
      }
      break;
  }
}

function detectCrash() {
  let head = serpent[0];
  if (head.x < 0 || head.x >= gameCanvas.width / segmentSize || head.y < 0 || head.y >= gameCanvas.height / segmentSize) {
    return true;
  }
  for (let i = 1; i < serpent.length; i++) {
    if (head.x === serpent[i].x && head.y === serpent[i].y) {
      return true;
    }
  }
  for (let i = 0; i < obstacles.length; i++) {
    for (let l = 0; l < serpent.length; l++)
      if (serpent[l].x === obstacles[i].x && serpent[l].y === obstacles[i].y) {
        return true;
      }
  }
  return false;
}

function restart() {
  clearInterval(interval);
  serpent = [{ x: 5, y: 5 }];
  snack = { x: 10, y: 10 };
  heading = 'right';
  score = 0;
  updateSnackScore();
}

function gameLoop() {
  if (detectCrash()) {
    clearInterval(interval);
    displayGameOver();
    return;
  }
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  drawSegment(snack.x, snack.y, "white");
  moveSerpent();
  drawSerpent();
  moveObstacles();
  drawObstacles();
}

function initiateGame() {
  restart();
  setTimeout(createObstacle, 3000);
  createObstacle(1);
  interval = setInterval(gameLoop, 100);
}

document.getElementById('playButton').addEventListener('click', initiateGame);
document.addEventListener('keydown', handleArrow);
