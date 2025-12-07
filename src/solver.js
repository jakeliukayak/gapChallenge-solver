// JavaScript version of solver.py for client-side solving

function getEmpty(prob) {
  for (let row = 0; row < prob.length; row++) {
    for (let col = 0; col < prob[row].length; col++) {
      if (prob[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null;
}

function isValid(prob, ele, pos) {
  // Check row
  for (let col = 0; col < prob[pos[0]].length; col++) {
    if (col !== pos[1] && prob[pos[0]][col] === ele) {
      return false;
    }
  }

  // Check column
  for (let row = 0; row < prob.length; row++) {
    if (row !== pos[0] && prob[row][pos[1]] === ele) {
      return false;
    }
  }

  return true;
}

function isSolved(prob) {
  const consider = getEmpty(prob);

  if (!consider) {
    return true;
  }

  const [row, col] = consider;

  for (let potential = 1; potential <= prob.length; potential++) {
    if (isValid(prob, potential, [row, col])) {
      prob[row][col] = potential;

      if (isSolved(prob)) {
        return true;
      }

      prob[row][col] = 0;
    }
  }

  return false;
}

export function solvePuzzle(grid) {
  // Create a deep copy of the grid to avoid mutating the original
  const gridCopy = grid.map(row => [...row]);
  
  if (isSolved(gridCopy)) {
    return gridCopy;
  }
  
  return null;
}
