console.log("testing... linked");

let lastRenderTime = 0;
const SNAKE_SPEED = 2

function main(currentTime) {
  window.requestAnimationFrame(main)
  const timeSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (timeSinceLastRender < 1 / SNAKE_SPEED) return
  lastRenderTime = currentTime
  console.log("render");
}

//window.requestAnimationFrame(main);