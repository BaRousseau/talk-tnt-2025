const gridSize = 21; // Taille de la grille (impair pour un labyrinthe)
const cells = []; // Tableau pour stocker les cellules de la grille
let specialTiles = []; // Cases spéciales : trésors, pièges, bonus

const pixelPosition = { x: 1, y: 0 }; // Position actuelle du joueur
const exitPosition = { x: gridSize - 2, y: gridSize - 1 }; // Position de la sortie

/**
 * Génère un labyrinthe et initialise les cases spéciales.
 */
function generateGrid(tileSize = 2, specialTileConfig = {}) {
  const gridElement = document.getElementById("grid");
  gridElement.innerHTML = "";
  gridElement.style.gridTemplateColumns = `repeat(${gridSize}, ${tileSize}rem)`;
  gridElement.style.gridTemplateRows = `repeat(${gridSize}, ${tileSize}rem)`;

  const maze = generateMaze(gridSize);
  specialTiles = generateSpecialTiles(maze, specialTileConfig);

  // Forcer l'entrée et la sortie à être accessibles
  maze[pixelPosition.y][pixelPosition.x] = 0; // Entrée
  maze[exitPosition.y][exitPosition.x] = 0; // Sortie

  maze.forEach((row, y) => {
    row.forEach((cell, x) => {
      const div = document.createElement("div");
      div.classList.add("cell", "fog");

      if (cell === 1) {
        div.classList.add("wall");
      }

      // 🔹 Marquer l'entrée et la sortie
      if (x === pixelPosition.x && y === pixelPosition.y) {
        div.classList.add("entry");
      }
      if (x === exitPosition.x && y === exitPosition.y) {
        div.classList.add("exit");
      }

      const special = specialTiles.find((tile) => tile.x === x && tile.y === y);
      if (special) {
        div.classList.add(special.type);
      }

      gridElement.appendChild(div);
      cells.push(div);
    });
  });
}

/**
 * Génère des cases spéciales dans le labyrinthe.
 */
function generateSpecialTiles(maze, specialTileConfig) {
  const specialTiles = [];
  const types = ["treasure", "trap", "bonus"];

  types.forEach((type) => {
    for (let i = 0; i < specialTileConfig[type]; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * gridSize);
        y = Math.floor(Math.random() * gridSize);
      } while (
        maze[y][x] !== 0 || // Doit être une case vide
        (x === pixelPosition.x && y === pixelPosition.y) || // Pas sur le joueur
        (x === exitPosition.x && y === exitPosition.y) || // Pas sur la sortie
        specialTiles.some((tile) => tile.x === x && tile.y === y)
      );

      specialTiles.push({ x, y, type });
    }
  });

  return specialTiles;
}

/**
 * Génère un labyrinthe en utilisant un algorithme de parcours.
 */
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

/**
 * Met à jour l'affichage de la grille en fonction de la position du joueur.
 */
function updateGrid() {
  cells.forEach((cell, index) => {
    const x = index % gridSize;
    const y = Math.floor(index / gridSize);

    // Calculer la distance de Manhattan entre le joueur et la cellule
    const distance = Math.abs(x - pixelPosition.x) + Math.abs(y - pixelPosition.y);

    if (distance <= 2) {
      cell.classList.add("discovered");
      cell.classList.remove("fog"); // Enlève définitivement le brouillard
    }

    cell.classList.remove("pixel");
  });

  // Position actuelle du joueur
  const index = pixelPosition.y * gridSize + pixelPosition.x;
  const cell = cells[index];

  if (!cell.classList.contains("wall")) {
    cell.classList.add("pixel", "discovered");
    cell.classList.remove("fog");
  }
}


/**
 * Déplace le joueur selon la direction donnée.
 */
function movePlayer(direction) {
  const newPosition = { ...pixelPosition };

  switch (direction) {
    case "up":
      newPosition.y -= 1;
      break;
    case "down":
      newPosition.y += 1;
      break;
    case "left":
      newPosition.x -= 1;
      break;
    case "right":
      newPosition.x += 1;
      break;
  }

  if (
    newPosition.x >= 0 &&
    newPosition.x < gridSize &&
    newPosition.y >= 0 &&
    newPosition.y < gridSize &&
    !cells[newPosition.y * gridSize + newPosition.x].classList.contains("wall")
  ) {
    pixelPosition.x = newPosition.x;
    pixelPosition.y = newPosition.y;
    updateGrid();
  }

  closeModal();

  const specialTile = specialTiles.find(tile =>
    tile.x === pixelPosition.x && tile.y === pixelPosition.y
  );

  if (specialTile) {
    let title = "";
    let content = "";

    switch (specialTile.type) {
      case "treasure":
        title = "Trésor trouvé !";
        content = "Vous avez découvert un trésor ancien rempli de richesses.";
        break;
      case "trap":
        title = "Attention, un piège !";
        content = "Vous êtes tombé dans un piège et perdez du temps.";
        break;
      case "bonus":
        title = "Bonus trouvé !";
        content = "Vous gagnez un avantage spécial pour votre voyage.";
        break;
    }

    showModal(title, content);
  }

}

/**
 * Configure les contrôles du clavier pour déplacer le joueur.
 */
function setupControls() {
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        movePlayer("up");
        break;
      case "ArrowDown":
        movePlayer("down");
        break;
      case "ArrowLeft":
        movePlayer("left");
        break;
      case "ArrowRight":
        movePlayer("right");
        break;
    }
  });
}

/**
 * Démarre le jeu.
 */
export function start(tileSize = 2, specialTileConfig = {}) {
  // Réinitialisation des variables
  cells.length = 0;
  specialTiles = [];
  pixelPosition.x = 1;
  pixelPosition.y = 0;

  // Supprimer entièrement l'ancienne grille pour éviter les doublons
  const gridElement = document.getElementById("grid");
  gridElement.innerHTML = "";

  document.getElementById("game").classList.remove("hidden");

  generateGrid(tileSize, specialTileConfig);
  setupControls();
  updateGrid();
}

function showModal(title, content) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");
  const modalButton = document.getElementById("closeModal");

  modalTitle.innerText = title;
  modalContent.innerText = content;
  modal.classList.remove("hidden");
  modalButton.focus();
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// Fermer la modal
document.getElementById("closeModal").addEventListener("click", () => {
  closeModal();
});
