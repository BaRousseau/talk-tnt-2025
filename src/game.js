// Configuration des types de cases spéciales
const specialTileConfig = {
  treasure: 3, // Nombre de cases "trésor"
  trap: 2,     // Nombre de cases "piège"
  bonus: 4,    // Nombre de cases "bonus"
};

export function start() {
  const game = document.getElementById("game");
  game.classList.remove("hidden");

  const grid = document.getElementById("grid");
  const gridSize = 21; // Taille du labyrinthe (impair pour la logique des murs)
  const pixelPosition = { x: 1, y: 0 }; // Position de l'entrée
  const exitPosition = { x: gridSize - 2, y: gridSize - 1 }; // Position de la sortie

  // Générer le labyrinthe
  const maze = generateMaze(gridSize);

  // Générer les cases spéciales selon la configuration
  const specialTiles = generateSpecialTiles(maze, gridSize, specialTileConfig);

  // Forcer l'entrée et la sortie à être des chemins
  maze[pixelPosition.y][pixelPosition.x] = 0;
  maze[exitPosition.y][exitPosition.x] = 0;

  grid.style.gridTemplateColumns = `repeat(${gridSize}, 20px)`;
  grid.style.gridTemplateRows = `repeat(${gridSize}, 20px)`;

  // Initialisation de la grille
  maze.forEach((row, y) => {
    row.forEach((cell, x) => {
      const div = document.createElement("div");
      div.classList.add("cell");
      if (cell === 1) {
        div.classList.add("wall");
      } else if (x === pixelPosition.x && y === pixelPosition.y) {
        div.classList.add("entry");
      } else if (x === exitPosition.x && y === exitPosition.y) {
        div.classList.add("exit");
      }

      // Ajouter une classe pour les cases spéciales
      const special = specialTiles.find((tile) => tile.x === x && tile.y === y);
      if (special) {
        div.classList.add(special.type); // Exemple : "treasure", "trap"
      }

      grid.appendChild(div);
    });
  });

  const cells = Array.from(document.querySelectorAll(".cell"));

  function updateGrid() {
    cells.forEach((cell) => cell.classList.remove("pixel"));

    const index = pixelPosition.y * gridSize + pixelPosition.x;
    const cell = cells[index];

    if (!cell.classList.contains("wall")) {
      cell.classList.add("pixel");
      cell.classList.add("discovered");
    }

    // Vérifier si le joueur est sur une case spéciale
    const special = specialTiles.find(
      (tile) => tile.x === pixelPosition.x && tile.y === pixelPosition.y
    );
    if (special) {
      triggerSpecialAction(special.type);
    }

    // Vérifier si le joueur a atteint la sortie
    if (pixelPosition.x === exitPosition.x && pixelPosition.y === exitPosition.y) {
      alert("Félicitations, vous avez trouvé la sortie !");
    }
  }

  function movePixel(dx, dy) {
    const newX = pixelPosition.x + dx;
    const newY = pixelPosition.y + dy;

    if (
      newX >= 0 &&
      newX < gridSize &&
      newY >= 0 &&
      newY < gridSize &&
      !maze[newY][newX] // Vérifie que ce n'est pas un mur
    ) {
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

// Générer des cases spéciales aléatoires
function generateSpecialTiles(maze, size, config) {
  const specialTiles = [];
  const types = Object.keys(config);

  types.forEach((type) => {
    let count = 0;

    while (count < config[type]) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);

      if (maze[y][x] === 0 && !specialTiles.some((tile) => tile.x === x && tile.y === y)) {
        specialTiles.push({ x, y, type });
        count++;
      }
    }
  });

  return specialTiles;
}

// Déclencher une action en fonction du type de case spéciale
function triggerSpecialAction(type) {
  switch (type) {
    case "treasure":
      alert("Vous avez trouvé un trésor !");
      break;
    case "trap":
      alert("Oh non, un piège !");
      break;
    case "bonus":
      alert("Bonus activé !");
      break;
    default:
      break;
  }
}

// Générateur de labyrinthe (identique à avant)
function generateMaze(size) {
  const maze = Array.from({ length: size }, () => Array(size).fill(1));
  const stack = [];
  const directions = [
    [0, -2], // Haut
    [0, 2],  // Bas
    [-2, 0], // Gauche
    [2, 0],  // Droite
  ];

  let current = { x: 1, y: 1 };
  maze[current.y][current.x] = 0;
  stack.push(current);

  while (stack.length > 0) {
    current = stack.pop();
    const shuffledDirections = directions.sort(() => Math.random() - 0.5);

    for (const [dx, dy] of shuffledDirections) {
      const nx = current.x + dx;
      const ny = current.y + dy;

      if (
        nx > 0 &&
        ny > 0 &&
        nx < size - 1 &&
        ny < size - 1 &&
        maze[ny][nx] === 1
      ) {
        const betweenX = current.x + dx / 2;
        const betweenY = current.y + dy / 2;

        maze[ny][nx] = 0;
        maze[betweenY][betweenX] = 0;
        stack.push({ x: nx, y: ny });
      }
    }
  }

  return maze;
}
