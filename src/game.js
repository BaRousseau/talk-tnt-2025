import { LEVEL_2020 } from './levels/2020.js';
import { LEVEL_2021 } from './levels/2021.js';
import { LEVEL_2022 } from './levels/2022.js';
import { LEVEL_2023 } from './levels/2023.js';
import { LEVEL_2024 } from './levels/2024.js';
import { LEVEL_2025 } from './levels/2025.js';
import { LEVEL_STAGE_3 } from './levels/stage-3.js';

console.log(import.meta);

const gridSize = 21; // Taille de la grille (impair pour un labyrinthe)
const tileSize = 2.2; // Taille d'une case en rem
const cells = []; // Tableau pour stocker les cellules de la grille
let specialTiles = []; // Cases spéciales : trésors, pièges, bonus
let currentLevel = 0; // Niveau actuel
let currentLevelContent = {}; // Contenu du niveau actuel

const levels = [
  LEVEL_2020,
  LEVEL_2021,
  LEVEL_2022,
  LEVEL_2023,
  LEVEL_2024,
  LEVEL_2025,
  LEVEL_STAGE_3
];

const pixelPosition = { x: 1, y: 0 }; // Position actuelle du joueur
const entryPosition = { x: 1, y: 0 }; // Position de l'entrée
const exitPosition = { x: gridSize - 2, y: gridSize - 1 }; // Position de la sortie

/**
 * Génère un labyrinthe et initialise les cases spéciales.
 */
function generateGrid() {
  const gridElement = document.getElementById("grid");
  gridElement.innerHTML = "";
  gridElement.style.gridTemplateColumns = `repeat(${gridSize}, ${tileSize}rem)`;
  gridElement.style.gridTemplateRows = `repeat(${gridSize}, ${tileSize}rem)`;

  const maze = generateMaze(gridSize);
  specialTiles = generateSpecialTiles(maze);

  // Forcer l'entrée et la sortie à être accessibles
  maze[entryPosition.y][entryPosition.x] = 0; // Entrée
  maze[exitPosition.y][exitPosition.x] = 0; // Sortie

  maze.forEach((row, y) => {
    row.forEach((cell, x) => {
      const div = document.createElement("div");
      div.classList.add("cell", "fog");

      if (cell === 1) {
        div.classList.add("wall");
      }

      // Marquer l'entrée et la sortie
      if (x === entryPosition.x && y === entryPosition.y) {
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
function generateSpecialTiles(maze) {
  const specialTiles = [];

  currentLevelContent.specialTiles.forEach((specialTile) => {
    let x, y;
    do {
      x = Math.floor(Math.random() * gridSize);
      y = Math.floor(Math.random() * gridSize);
    } while (
      maze[y][x] !== 0 || // Doit être une case vide
      (x === pixelPosition.x && y === pixelPosition.y) || // Pas sur le joueur
      (x === entryPosition.x && y === entryPosition.y) || // Pas sur l'entrée
      (x === exitPosition.x && y === exitPosition.y) || // Pas sur la sortie
      specialTiles.some((tile) => tile.x === x && tile.y === y)
    );

    specialTiles.push({ x, y, ...specialTile });
  });
  console.log('Cases spéciales', specialTiles);
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

    if (cell.classList.contains("treasure") || cell.classList.contains("trap") || cell.classList.contains("bonus")) {
      cell.classList.add("activated");
    }
  }
}

/**
 * Charge le niveau suivant.
 */
function loadNextLevel() {
  currentLevel = (currentLevel + 1) % levels.length;
  start(levels[currentLevel]);
}

/**
 * Vérifie si le joueur est sur une case spéciale et affiche la modal.
 */
function openSpecialTile() {
  const specialTile = specialTiles.find(tile =>
    tile.x === pixelPosition.x && tile.y === pixelPosition.y
  );

  if (specialTile) {
    // Marquer le menu de la case spéciale comme découverte
    const menuItem = document.getElementById(`menu-${specialTile.id}`)
    menuItem.classList.add("discovered");
    menuItem.classList.add(specialTile.type);

    showModal(specialTile);
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

    // Vérifier si le joueur est à la sortie
    if (pixelPosition.x === exitPosition.x && pixelPosition.y === exitPosition.y) {
      loadNextLevel();
    }
  }
}

/**
 * Configure les contrôles du clavier pour déplacer le joueur.
 */
function setupControls() {
  const keydownKey = 'keydown';
  const keyupKey = 'keyup';

  // Supprimer les anciens écouteurs d'événements pour éviter les doublons
  document.removeEventListener(keydownKey, handleKeydown);
  document.removeEventListener(keyupKey, handleKeyup);

  // Ajouter le nouvel écouteur d'événement
  document.addEventListener(keydownKey, handleKeydown);
  document.addEventListener(keyupKey, handleKeyup);
}

// Fonction de gestion des touches sur lors du keydown
function handleKeydown(event) {
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
}

// Fonction de gestion des touches sur lors du keyup
function handleKeyup(event) {
  switch (event.key) {
    // Space bar
    case " ":
      openSpecialTile();
      break;
  }
}

/**
 * Configure les contrôles de la modal.
 */
function setupModalControls() {
  const modalCloseButton = document.getElementById("closeModal");

  // Supprimer l'écouteur d'événement pour le bouton de fermeture
  modalCloseButton.removeEventListener("click", closeModal);

  // Ajouter un écouteur d'événement pour le bouton de fermeture
  modalCloseButton.addEventListener("click", closeModal);
}

/**
 * Démarre un niveau avec une configuration spéciale.
 */
export function start(level = LEVEL_2020) {
  // Réinitialisation des variables
  cells.length = 0;
  specialTiles = [];
  currentLevelContent = level;

  // Réinitialisation de la position du joueur
  pixelPosition.x = 1;
  pixelPosition.y = 0;

  // Supprimer entièrement l'ancienne grille pour éviter les doublons
  const gridElement = document.getElementById("grid");
  gridElement.innerHTML = "";

  // Afficher le jeu
  document.getElementById("game").classList.remove("hidden");

  // Change le titre du niveau
  document.getElementById("gameTitle").innerText = level.title;

  // Change la description du niveau
  document.getElementById("gameDesc").innerText = level.description;

  // Construit le menu de navigation
  document.getElementById("menu").innerHTML = level.specialTiles
    .map((specialTile) => {
      if (!specialTile.id) {
        console.warn("Case spéciale sans identifiant unique : ", specialTile.title);
      }
      return `<div id="menu-${specialTile.id}" class="menu-item">${specialTile.title}</div>`
    })
    .join("");

  level.specialTiles.forEach((specialTile) => {
    const menuItem = document.getElementById(`menu-${specialTile.id}`);
    menuItem.addEventListener("click", () => {
      showModal(specialTile);
    });
  });

  generateGrid();
  setupControls();
  setupModalControls();
  updateGrid();
}

function showModal(specialTile) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalGoals = document.getElementById("modalGoals");
  const modalCodes = document.getElementById("modalCodes");
  const modalAssets = document.getElementById("modalAssets");
  const modalCloseButton = document.getElementById("closeModal");

  modalTitle.innerText = specialTile.title;
  modalDesc.innerText = specialTile.description;

  if (specialTile.goals) {
    modalGoals.innerHTML = specialTile.goals.map((goal) => `<p>${goal}</p>`).join("");
  } else {
    modalGoals.innerHTML = "";
  }

  if (specialTile.codes) {
    const ID_COPY = "modal-code-copy-";
    const ID_CONTENT = "modal-code-content-";
    modalCodes.innerHTML = specialTile.codes.map((_code, index) => {
      return `<button id="closeModal" class="btn btn-action icon-container">
  <img id="${ID_COPY + index}" class="icon" src="/assets/icons/copy.svg"></img>
</button>
<pre><code id="${ID_CONTENT + index}" class="language-javascript"></code></pre>
<hr />`;
    }).join("");

    specialTile.codes.map((code, index) => {
      const button = document.getElementById(ID_COPY + index);
      const content = document.getElementById(ID_CONTENT + index);
      content.innerHTML = code;

      hljs.highlightElement(content);

      button.addEventListener("click", () => {
        navigator.clipboard.writeText(code);
      });
    });
  } else {
    modalCodes.innerHTML = "";
  }

  if (specialTile.assets) {
    modalAssets.innerHTML = specialTile.assets.map((asset) => {
      if (asset.type === 'img') {
        return `<img src="${asset.src}" alt="${specialTile.title}" />`;
      }
      if (asset.type === 'video') {
        return `<video controls width="500" autoplay loop muted>
  <source src="${asset.src}" type="video/mp4" />
</video>`;
      }
    }).join("<hr />");
  } else {
    modalAssets.innerHTML = "";
  }

  modal.classList.remove("hidden");
  modalCloseButton.focus();
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}
