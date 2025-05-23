import { generateOpenTerrain } from './generators/open-terrain.js';
import { LEVEL_2020 } from './levels/2020.js';
import { LEVEL_2021 } from './levels/2021.js';
import { LEVEL_2022 } from './levels/2022.js';
import { LEVEL_2023 } from './levels/2023.js';
import { LEVEL_2024 } from './levels/2024.js';
import { LEVEL_2025 } from './levels/2025.js';
import { LEVEL_STAGE_3 } from './levels/stage-3.js';
import { LEVEL_STAGE_2_7 } from './levels/stage-2-7.js';
import { LEVEL_STAGE_2 } from './levels/stage-2.js';
import { LEVEL_STAGE_1 } from './levels/stage-1.js';
import { LEVEL_ECOSYSTEM } from './levels/ecosystem-news.js';

const screenWidth = globalThis.innerWidth;
const screenHeight = globalThis.innerHeight;

// Taille souhaitée d'un carré (en pixels)
const squareSize = 35;

// Taille de la grille
const gridSize = { x: Math.floor(screenWidth / squareSize), y: Math.floor(screenHeight / squareSize) };

const cells = []; // Tableau pour stocker les cellules de la grille
let specialTiles = []; // Cases spéciales : trésors, pièges, bonus
let currentLevelIndex = 0; // Niveau actuel
let currentLevelContent = {}; // Contenu du niveau actuel

const levels = [
  LEVEL_2025,
  LEVEL_STAGE_3,
  LEVEL_STAGE_2_7,
  LEVEL_STAGE_2,
  LEVEL_STAGE_1,
  LEVEL_ECOSYSTEM,
  LEVEL_2020,
  LEVEL_2021,
  LEVEL_2022,
  LEVEL_2023,
  LEVEL_2024
];

const entryPosition = { x: 1, y: 0 }; // Position par défaut de l'entrée
const exitPosition = { x: gridSize.x - 2, y: gridSize.y - 1 }; // Position par défaut de la sortie
const pixelPosition = { x: entryPosition.x, y: entryPosition.y }; // Position actuelle du joueur

function initPositions() {
  // Position de l'entrée
  entryPosition.x = Math.floor(Math.random() * (gridSize.x - 2)) + 1;
  entryPosition.y = 0;

  // Position de la sortie
  exitPosition.x = Math.floor(Math.random() * (gridSize.x - 2)) + 1;
  exitPosition.y = gridSize.y - 1;

  // Position du joueur
  pixelPosition.x = entryPosition.x;
  pixelPosition.y = entryPosition.y;
}

/**
 * Génère un labyrinthe et initialise les cases spéciales.
 */
function generateGrid() {
  const gridElement = document.getElementById("grid");
  gridElement.innerHTML = "";
  gridElement.style.gridTemplateColumns = `repeat(${gridSize.x}, 1fr)`;
  gridElement.style.gridTemplateRows = `repeat(${gridSize.y}, 1fr)`;

  specialTiles = generateSpecialTiles(currentLevelContent.specialTiles);

  const terrain = generateOpenTerrain(gridSize, entryPosition, [entryPosition, exitPosition, ...specialTiles]);
  terrain.forEach((row, y) => {
    row.forEach((cell, x) => {
      const div = document.createElement("div");
      div.classList.add("cell", "fog", ...cell.class);

      // Marquer l'entrée et la sortie
      if (x === entryPosition.x && y === entryPosition.y) {
        div.classList.add("entry");
      }
      if (x === exitPosition.x && y === exitPosition.y) {
        div.classList.add("exit");
      }

      const special = specialTiles.find((tile) => tile.x === x && tile.y === y);
      if (special) {
        div.id = special.id;
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
function generateSpecialTiles(specialTilesContent) {
  const specialTiles = [];

  specialTilesContent.forEach((specialTile) => {
    let x, y;
    do {
      x = Math.floor(Math.random() * gridSize.x);
      y = Math.floor(Math.random() * gridSize.y);
    } while (
      (x === pixelPosition.x && y === pixelPosition.y) || // Pas sur le joueur
      (x === entryPosition.x && y === entryPosition.y) || // Pas sur l'entrée
      (x === exitPosition.x && y === exitPosition.y) || // Pas sur la sortie
      specialTiles.some((tile) => tile.x === x && tile.y === y)
    );

    specialTiles.push({ x, y, ...specialTile });
  });

  return specialTiles;
}

/**
 * Met à jour l'affichage de la grille en fonction de la position du joueur.
 */
function updateGrid() {
  cells.forEach((cell, index) => {
    // Calculer la distance de Manhattan entre le joueur et la cellule
    const cellPosition = { x: index % gridSize.x, y: Math.floor(index / gridSize.x) };
    const distance = Math.abs(cellPosition.x - pixelPosition.x) + Math.abs(cellPosition.y - pixelPosition.y);

    // Lors de la découverte d'une case, retire le brouillard autour
    if (distance <= 2) {
      cell.classList.add("discovered");
      cell.classList.remove("fog");
    }

    cell.classList.remove("pixel");
  });

  const pixelCell = getCell(pixelPosition);
  if (!pixelCell.classList.contains("wall")) {
    pixelCell.classList.add("pixel", "discovered");
    pixelCell.classList.remove("fog");
  }
}

// Position actuelle du joueur
function getCell(position) {
  const index = position.y * gridSize.x + position.x;
  return cells[index];
}

/**
 * Charge le niveau suivant.
 */
function loadNextLevel(nextLevel) {
  currentLevelIndex = (currentLevelIndex + 1) % levels.length;
  if (!nextLevel) {
    nextLevel = levels[currentLevelIndex];
  }
  start(nextLevel);
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

  const cell = getCell(newPosition);
  if (
    newPosition.x >= 0 &&
    newPosition.x < gridSize.x &&
    newPosition.y >= 0 &&
    newPosition.y < gridSize.y &&
    !cell.classList.contains("wall")
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
  // Space bar
  if (event.key === " ") {
    const specialTile = specialTiles.find(tile =>
      tile.x === pixelPosition.x && tile.y === pixelPosition.y
    );

    if (specialTile) {
      showModal(specialTile);
    }
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
export function start(newLevelContent = levels[0]) {
  // Réinitialisation des variables
  cells.length = 0;
  specialTiles = [];
  currentLevelContent = newLevelContent;

  // Réinitialisation de la position du joueur
  initPositions();

  // Supprimer entièrement l'ancienne grille pour éviter les doublons
  const gridElement = document.getElementById("grid");
  gridElement.innerHTML = "";

  const MAIN_TITLE_ID = "mainTitle";
  let mainTitle = document.getElementById(MAIN_TITLE_ID)
  if (mainTitle) {
    mainTitle.remove();
  }
  mainTitle = document.createElement("h1");
  mainTitle.id = MAIN_TITLE_ID;
  mainTitle.classList.add("fade-out-element");
  mainTitle.innerText = currentLevelContent.title;
  document.body.appendChild(mainTitle);

  // Ajoute l'effet de fondu
  setTimeout(() => {
    mainTitle.classList.add("fade-out-opacity");
  }, 300);

  // Supprime le titre après un certain délai
  setTimeout(() => {
    mainTitle.remove();
  }, 5000);

  // Construit le menu de navigation
  document.getElementById("menu").innerHTML = levels.map((level) => {
    let currentMenu = '';
    if (newLevelContent.title === level.title) {
      currentMenu = `<div id="current-menu">` + level.specialTiles
        .map((specialTile) => {
          if (!specialTile.id) {
            console.warn("Case spéciale sans identifiant unique : ", specialTile.title);
          }
          return `<div id="menu-${specialTile.id}" class="menu-item">${specialTile.title}</div>`
        }).join("") + `</div>`;
    }
    return `<div id="level-${level.id}" class="level-item ${currentMenu ? 'current-level' : ''}">${level.shortTitle}</div>${currentMenu}`
  }).join("");

  newLevelContent.specialTiles.forEach((specialTile) => {
    const menuItem = document.getElementById(`menu-${specialTile.id}`);
    menuItem.addEventListener("click", () => {
      showModal(specialTile);
    });
  });

  levels.forEach((level) => {
    const menuItem = document.getElementById(`level-${level.id}`);
    menuItem.addEventListener("click", () => {
      loadNextLevel(level)
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
  const modalSubTitle = document.getElementById("modalSubTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalGoals = document.getElementById("modalGoals");
  const modalCodes = document.getElementById("modalCodes");
  const modalAssets = document.getElementById("modalAssets");
  const modalCloseButton = document.getElementById("closeModal");

  // Marque la case spéciale comme activée
  const specialCell = document.getElementById(specialTile.id);
  specialCell.classList.add("activated");

  // Marque le menu comme activé
  const menuItem = document.getElementById(`menu-${specialTile.id}`)
  menuItem.classList.add("discovered");
  menuItem.classList.add(specialTile.type);

  modalTitle.innerText = currentLevelContent.title;
  modalSubTitle.innerText = specialTile.title;
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
      return `<div class="code-container">
  <button id="copyModal" class="icon-container">
    <img id="${ID_COPY + index}" class="icon" src="/assets/icons/copy.svg"></img>
  </button>
  <pre><code id="${ID_CONTENT + index}" class="language-javascript"></code></pre>
</div>`;
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
