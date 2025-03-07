
/**
 * Génère un labyrinthe en utilisant un algorithme de parcours.
 */
export function generateMaze(size, startPosition = { x: 1, y: 1 }) {
  const maze = Array.from({ length: size.y }, () => Array(size.x).fill(1));
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

  // Forcer une ouverture initiale vers le bas si possible
  if (startPosition.y + 2 < size.y - 1) {
    maze[startPosition.y + 1][startPosition.x] = 0;
    maze[startPosition.y + 2][startPosition.x] = 0;
    stack.push({ x: startPosition.x, y: startPosition.y + 2 });
  }

  while (stack.length > 0) {
    current = stack.pop();
    const shuffledDirections = directions.sort(() => Math.random() - 0.5);

    for (const [dx, dy] of shuffledDirections) {
      const nx = current.x + dx;
      const ny = current.y + dy;

      if (
        nx > 0 &&
        ny > 0 &&
        nx < size.x - 1 &&
        ny < size.y - 1 &&
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
