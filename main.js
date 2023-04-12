
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
const segmentSize = 10;
let serpent = [{ x: 5, y: 5 }];
let snack = { x: 10, y: 10 };
let heading = 'right';
let interval;
let obstacles = [];

function drawSegment(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * segmentSize, y * segmentSize, segmentSize, segmentSize);
}

function drawSerpent() {
  serpent.forEach(part => {
    drawSegment(part.x, part.y, "pink");
  });
}

function drawObstacles() {
  drawObstacles.forEach(obstacle => {
    drawSegment(obstacle.x, obstacle.y, "red");
  })
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
    snack.x = Math.floor(Math.random() * gameCanvas.width / segmentSize);
    snack.y = Math.floor(Math.random() * gameCanvas.height / segmentSize);
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
  })
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
    if (head.x === obstacles[i].x && head.y === obstacles[i].y) {
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
}

function gameLoop() {
  if (detectCrash()) {
    restart();
    alert('Game Over');
    interval = setInterval(gameLoop, 100);
    return;
  }
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  drawSegment(snack.x, snack.y);
  moveSerpent();
  drawSerpent();
}

function initiateGame() {
  restart();
  interval = setInterval(gameLoop, 100);
}

document.getElementById('playButton').addEventListener('click', initiateGame);
document.addEventListener('keydown', handleArrow);
