export function start() {

  const grid = document.getElementById("grid");
  grid.classList.remove("hidden");

  const gridSize = 20;
  let pixelPosition = { x: 0, y: 0 };

  // Initialize the grid
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
  }

  const cells = Array.from(document.querySelectorAll(".cell"));

  function updateGrid() {
    cells.forEach((cell) => cell.classList.remove("pixel"));

    const index = pixelPosition.y * gridSize + pixelPosition.x;
    const cell = cells[index];

    cell.classList.add("pixel");
    cell.classList.add("discovered");
  }

  function movePixel(dx, dy) {
    const newX = pixelPosition.x + dx;
    const newY = pixelPosition.y + dy;

    if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
      pixelPosition.x = newX;
      pixelPosition.y = newY;
      updateGrid();
    }
  }

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        movePixel(0, -1);
        break;
      case "ArrowDown":
        movePixel(0, 1);
        break;
      case "ArrowLeft":
        movePixel(-1, 0);
        break;
      case "ArrowRight":
        movePixel(1, 0);
        break;
    }
  });

  updateGrid();
}
