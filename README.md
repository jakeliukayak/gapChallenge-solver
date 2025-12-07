# Gap Challenge Solver

A web-based solver for the Aon mapTQ gap challenge puzzle game.

## Live Demo

Visit the live application at: [https://jakeliukayak.github.io/gapChallenge-solver/](https://jakeliukayak.github.io/gapChallenge-solver/)

## Game Rules

- The game uses a 4×4 or 5×5 grid
- Each cell can contain one of 4 (or 5) shapes: Circle (●), Triangle (▲), Star (★), Cross (✚), and Square (■)
- Each row and column must contain exactly one of each shape
- No shape can repeat in the same row or column

## How to Use

1. **Select Grid Size**: Choose between 4×4 or 5×5 grid
2. **Fill Pre-filled Cells**: Use the dropdown menus in each cell to select shapes
3. **Mark Question Cell**: Click on the cell you want to solve to mark it with a "?" symbol
4. **Solve**: Click the "Solve" button to find the answer for the marked cell
5. **Clear**: Reset the grid to start over

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Solver Algorithm

The solver uses a backtracking algorithm (implemented in `solver.py` and `src/solver.js`) to find the solution that satisfies all constraints.

## Technologies Used

- React 19
- Vite 7
- JavaScript (ES6+)
- CSS3

## License

MIT

