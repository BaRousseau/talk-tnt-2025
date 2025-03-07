import { Noise } from "./perlin.js";

/**
 * Génère un terrain ouvert avec des obstacles en utilisant Perlin Noise.
 * @param {Object} size - Dimensions du terrain { x, y }.
 * @param {Array} terrainTiles - Liste des tuiles spéciales (entrée, sortie, etc.).
 * @returns {Array} Terrain généré avec connectivité garantie.
 */
export function generateOpenTerrain(size, entryTile, terrainTiles = [{ x: 1, y: 1 }]) {
  const terrain = Array.from({ length: size.y }, () => Array(size.x).fill({ class: ['ground'], value: 0 }));
  Noise.seed(Date.now()); // Génère un bruit unique à chaque exécution

  // Détermine l'échelle du bruit (ajuste la taille des îlots)
  const noiseScale = 0.2; // Plus petit = îlots plus grands
  const safeRadius = 1; // Rayon de sécurité autour des tuiles spéciales

  for (let y = 0; y < size.y; y++) {
    for (let x = 0; x < size.x; x++) {
      // Calcul de la distance aux tuiles spéciales
      const isSafeZone = terrainTiles.some(tile => Math.hypot(x - tile.x, y - tile.y) <= safeRadius);

      if (!isSafeZone) {
        // Génération du bruit de Perlin et conversion en obstacle (0 ou 1)
        const noiseValue = (Noise.simplex2(x * noiseScale, y * noiseScale) + 1) / 2; // Normalise entre 0 et 1
        console.log(noiseValue)
        terrain[y][x] = noiseValue < 0 ? { class: ['wall'], value: 1 } : { class: ['ground'], value: 0 };
      }
    }
  }

  // Marquer les tuiles spéciales comme accessibles
  terrainTiles.forEach(tile => terrain[tile.y][tile.x] = { class: ['ground'], value: 0 });

  // Garantir la connectivité avec un flood fill
  ensureConnectivity(terrain, terrainTiles, entryTile);

  return terrain;
}

/**
 * Utilise un flood fill pour garantir que toutes les tuiles spéciales sont accessibles depuis l'entrée.
 * @param {Array} terrain - La grille du terrain.
 * @param {Array} terrainTiles - Liste des tuiles spéciales (entrée, sortie, etc.).
 * @param {Object} entryTile - Point d'entrée.
 */
export function ensureConnectivity(terrain, terrainTiles, entryTile) {
  const sizeY = terrain.length;
  const sizeX = terrain[0].length;
  const directions = [
    { x: 0, y: -1 }, { x: 0, y: 1 }, // Haut, Bas
    { x: -1, y: 0 }, { x: 1, y: 0 }  // Gauche, Droite
  ];

  const isValid = (x, y) => x >= 0 && y >= 0 && x < sizeX && y < sizeY;

  // Effectue un flood fill à partir de l'entrée
  const visited = Array.from({ length: sizeY }, () => Array(sizeX).fill(false));
  const queue = [entryTile];
  visited[entryTile.y][entryTile.x] = true;

  while (queue.length > 0) {
    const { x, y } = queue.shift();

    for (const { x: dx, y: dy } of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (isValid(nx, ny) && terrain[ny][nx].value === 0 && !visited[ny][nx]) {
        visited[ny][nx] = true;
        queue.push({ x: nx, y: ny });
      }
    }
  }

  // Vérifie si toutes les tuiles spéciales (y compris la sortie et les autres) sont accessibles
  const inaccessibleTiles = terrainTiles.filter(tile => !visited[tile.y][tile.x]);

  // Si des tuiles spéciales ne sont pas accessibles, ajuster le terrain
  for (const tile of inaccessibleTiles) {
    // Trouver un chemin vers la tuile inaccessible en utilisant un BFS
    const path = findPath(terrain, entryTile, tile);

    if (path) {
      // Supprimer les obstacles le long du chemin
      for (const { x, y } of path) {
        if (terrain[y][x].value === 1) {
          terrain[y][x] = { class: ['ground'], value: 0 }; // Déblaye l'obstacle
        }
      }
    } else {
      console.warn(`Aucun chemin trouvé vers la tuile spéciale (${tile.x}, ${tile.y})`);
      terrain[tile.y][tile.x].class.push('debug');
    }
  }
}

/**
 * Trouve un chemin entre deux points en utilisant l'algorithme A*.
 * @param {Array} terrain - La grille du terrain.
 * @param {Object} start - Point de départ.
 * @param {Object} end - Point d'arrivée.
 * @returns {Array|null} Le chemin trouvé, ou null si aucun chemin n'existe.
 */
function findPath(terrain, start, end) {
  const sizeY = terrain.length;
  const sizeX = terrain[0].length;
  const directions = [
    { x: 0, y: -1 }, { x: 0, y: 1 }, // Haut, Bas
    { x: -1, y: 0 }, { x: 1, y: 0 }  // Gauche, Droite
  ];

  const isValid = (x, y) => x >= 0 && y >= 0 && x < sizeX && y < sizeY;

  // Fonction heuristique (distance de Manhattan)
  const heuristic = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

  const openSet = [{ x: start.x, y: start.y, g: 0, h: heuristic(start, end), f: heuristic(start, end), path: [] }];
  const closedSet = new Set();

  while (openSet.length > 0) {
    // Trouver la case avec le coût total (f) le plus bas
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift();

    // Si on atteint la destination, retourner le chemin
    if (current.x === end.x && current.y === end.y) {
      return current.path;
    }

    closedSet.add(`${current.x},${current.y}`);

    for (const { x: dx, y: dy } of directions) {
      const nx = current.x + dx;
      const ny = current.y + dy;

      if (isValid(nx, ny)) {
        const neighborKey = `${nx},${ny}`;

        if (!closedSet.has(neighborKey)) {
          const isObstacle = terrain[ny][nx] === 1;
          const gScore = current.g + (isObstacle ? 10 : 1); // Coût plus élevé pour les obstacles

          const neighbor = {
            x: nx,
            y: ny,
            g: gScore,
            h: heuristic({ x: nx, y: ny }, end),
            f: gScore + heuristic({ x: nx, y: ny }, end),
            path: [...current.path, { x: nx, y: ny }]
          };

          // Vérifier si cette case est déjà dans l'openSet avec un meilleur coût
          const existing = openSet.find(n => n.x === nx && n.y === ny);
          if (!existing || gScore < existing.g) {
            openSet.push(neighbor);
          }
        }
      }
    }
  }

  // Aucun chemin trouvé
  return null;
}
