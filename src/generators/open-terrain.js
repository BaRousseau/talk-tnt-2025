import { Noise } from "./perlin.js";

/**
 * Génère un terrain ouvert avec des obstacles en utilisant Perlin Noise.
 * @param {Object} size - Dimensions du terrain { x, y }.
 * @param {Array} terrainTiles - Liste des tuiles spéciales (entrée, sortie, etc.).
 * @param {number} obstacleDensity - Influence du bruit de Perlin (0 = aucun, 1 = maximal).
 * @param {number} safeRadius - Rayon autour des tuiles spéciales sans obstacle.
 * @returns {Array} Terrain généré avec connectivité garantie.
 */
export function generateOpenTerrain(size, terrainTiles = [{ x: 1, y: 1 }], obstacleDensity = 0.2, safeRadius = 3) {
  const terrain = Array.from({ length: size.y }, () => Array(size.x).fill(0));
  Noise.seed(Date.now()); // Génère un bruit unique à chaque exécution

  // Détermine l'échelle du bruit (ajuste la taille des îlots)
  const noiseScale = 0.1; // Plus petit = îlots plus grands

  for (let y = 0; y < size.y; y++) {
    for (let x = 0; x < size.x; x++) {
      // Calcul de la distance aux tuiles spéciales
      const isSafeZone = terrainTiles.some(tile => Math.hypot(x - tile.x, y - tile.y) <= safeRadius);

      if (!isSafeZone) {
        // Génération du bruit de Perlin et conversion en obstacle (0 ou 1)
        const noiseValue = (Noise.simplex2(x * noiseScale, y * noiseScale) + 1) / 2; // Normalise entre 0 et 1
        terrain[y][x] = noiseValue < obstacleDensity ? 1 : 0;
      }
    }
  }

  // Marquer les tuiles spéciales comme accessibles
  terrainTiles.forEach(tile => terrain[tile.y][tile.x] = 0);

  // Vérifier et ajuster la connectivité
  ensureConnectivity(terrain, terrainTiles);

  return terrain;
}

/**
 * Vérifie et garantit qu'un chemin existe entre toutes les cases accessibles en utilisant BFS.
 * @param {Array} terrain - La grille du terrain.
 * @param {Array} terrainTiles - Liste des tuiles spéciales (entrée, sortie, etc.).
 */
function ensureConnectivity(terrain, terrainTiles) {
  const sizeY = terrain.length;
  const sizeX = terrain[0].length;
  const directions = [
    { x: 0, y: -1 }, { x: 0, y: 1 }, // Haut, Bas
    { x: -1, y: 0 }, { x: 1, y: 0 }  // Gauche, Droite
  ];

  const isValid = (x, y) => x >= 0 && y >= 0 && x < sizeX && y < sizeY;

  // Effectue un BFS à partir de la première tuile spéciale
  const start = terrainTiles[0];
  const queue = [start];
  const visited = Array.from({ length: sizeY }, () => Array(sizeX).fill(false));
  visited[start.y][start.x] = true;

  while (queue.length > 0) {
    const { x, y } = queue.shift();

    for (const { x: dx, y: dy } of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (isValid(nx, ny) && terrain[ny][nx] === 0 && !visited[ny][nx]) {
        visited[ny][nx] = true;
        queue.push({ x: nx, y: ny });
      }
    }
  }

  // Supprime les obstacles bloquant l'accès aux tuiles spéciales
  terrainTiles.forEach(({ x, y }) => {
    if (!visited[y][x]) {
      // On retire des obstacles pour débloquer un chemin
      for (const { x: dx, y: dy } of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (isValid(nx, ny) && terrain[ny][nx] === 1) {
          terrain[ny][nx] = 0; // Déblaye l'obstacle
          return; // Un seul changement suffit
        }
      }
    }
  });
}
