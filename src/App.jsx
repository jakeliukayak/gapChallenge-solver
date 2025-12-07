import { useState } from 'react';
import './App.css';
import { solvePuzzle } from './solver';

const SHAPES = {
  0: '?',
  1: '●',  // Circle
  2: '▲',  // Triangle
  3: '★',  // Star
  4: '✚',  // Cross
  5: '■',  // Square
};

const SHAPE_NAMES = {
  0: 'Empty (?)',
  1: 'Circle',
  2: 'Triangle',
  3: 'Star',
  4: 'Cross',
  5: 'Square',
};

function App() {
  const [gridSize, setGridSize] = useState(4);
  const [grid, setGrid] = useState(Array(4).fill(null).map(() => Array(4).fill(0)));
  const [questionCell, setQuestionCell] = useState(null);
  const [solution, setSolution] = useState(null);

  const handleGridSizeChange = (newSize) => {
    setGridSize(newSize);
    setGrid(Array(newSize).fill(null).map(() => Array(newSize).fill(0)));
    setQuestionCell(null);
    setSolution(null);
  };

  const handleCellChange = (row, col, value) => {
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = parseInt(value);
    setGrid(newGrid);
    setSolution(null);
  };

  const handleQuestionCellClick = (row, col) => {
    if (questionCell && questionCell.row === row && questionCell.col === col) {
      // Unmark as question cell
      setQuestionCell(null);
    } else {
      // Mark as question cell and set to 0
      setQuestionCell({ row, col });
      const newGrid = grid.map(r => [...r]);
      newGrid[row][col] = 0;
      setGrid(newGrid);
    }
    setSolution(null);
  };

  const handleSolve = () => {
    if (!questionCell) {
      alert('Please mark a cell as the question cell (?) to solve');
      return;
    }

    const solved = solvePuzzle(grid);
    if (solved) {
      setSolution(solved[questionCell.row][questionCell.col]);
    } else {
      alert('No solution found! Please check your inputs.');
    }
  };

  const handleClear = () => {
    setGrid(Array(gridSize).fill(null).map(() => Array(gridSize).fill(0)));
    setQuestionCell(null);
    setSolution(null);
  };

  return (
    <div className="App">
      <h1>Gap Challenge Solver</h1>
      <p className="description">
        Fill in the grid with shapes. Each row and column must have exactly one of each shape.
        Click a cell to mark it as the question cell (?), then click "Solve" to find the answer.
      </p>

      <div className="controls">
        <label>
          Grid Size:
          <select value={gridSize} onChange={(e) => handleGridSizeChange(parseInt(e.target.value))}>
            <option value={4}>4×4</option>
            <option value={5}>5×5</option>
          </select>
        </label>
      </div>

      <div className="grid-container">
        <div className={`grid grid-${gridSize}`}>
          {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) => {
              const isQuestionCell = questionCell && questionCell.row === rowIndex && questionCell.col === colIndex;
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`cell ${isQuestionCell ? 'question-cell' : ''}`}
                  onClick={() => handleQuestionCellClick(rowIndex, colIndex)}
                >
                  {isQuestionCell ? (
                    <div className="shape-display">{SHAPES[0]}</div>
                  ) : (
                    <select
                      value={cell}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="cell-select"
                    >
                      <option value={0}>-</option>
                      {Array.from({ length: gridSize }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>
                          {SHAPES[num]} {SHAPE_NAMES[num]}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              );
            })
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={handleSolve} className="solve-button">Solve</button>
        <button onClick={handleClear} className="clear-button">Clear</button>
      </div>

      {solution !== null && (
        <div className="solution">
          <h2>Solution</h2>
          <div className="solution-display">
            The answer is: <span className="solution-shape">{SHAPES[solution]}</span> ({SHAPE_NAMES[solution]})
          </div>
        </div>
      )}

      <div className="legend">
        <h3>Shape Legend</h3>
        <div className="legend-items">
          <div className="legend-item"><span>{SHAPES[1]}</span> Circle</div>
          <div className="legend-item"><span>{SHAPES[2]}</span> Triangle</div>
          <div className="legend-item"><span>{SHAPES[3]}</span> Star</div>
          <div className="legend-item"><span>{SHAPES[4]}</span> Cross</div>
          {gridSize === 5 && <div className="legend-item"><span>{SHAPES[5]}</span> Square</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
