const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const blockSize = 10;
let snake = [{ x: 5, y: 5 }];
let food = { x: 10, y: 10 };
let direction = 'right';
let intervalId;

function drawBlock(x, y) {
  context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

function drawSnake() {
  snake.forEach(segment => {
    drawBlock(segment.x, segment.y);
  });
}

function moveSnake() {
  let head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
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
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    food.x = Math.floor(Math.random() * canvas.width / blockSize);
    food.y = Math.floor(Math.random() * canvas.height / blockSize);
  } else {
    snake.pop();
  }
}

function handleKeydown(event) {
  switch (event.key) {
    case 'ArrowRight':
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case 'ArrowLeft':
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 'ArrowUp':
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 'ArrowDown':
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
}

function checkCollision() {
  let head = snake[0];
  if (head.x < 0 || head.x >= canvas.width / blockSize || head.y < 0 || head.y >= canvas.height / blockSize) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function resetGame() {
  clearInterval(intervalId);
  snake = [{ x: 5, y: 5 }];
  food = { x: 10, y: 10 };
  direction = 'right';
}

function main() {
  if (checkCollision()) {
    resetGame();
    alert('Game Over');
    intervalId = setInterval(main, 100);
    return;
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBlock(food.x, food.y);
  moveSnake();
  drawSnake();
}

function startGame() {
  resetGame();
  intervalId = setInterval(main, 100);
}

document.getElementById('start-button').addEventListener('click', startGame);
