
// Define the grid size
const gridSize = 16;

grid = [];

// Function to call with x and y coordinates
function processItem(x, y) {
    console.log(`Processing item at (${x}, ${y})`);
    grid[y][x].classList.add('clicked');

    // Add your logic here
}

// Get the grid container element
const gridContainer = document.querySelector('.game');

// Create the grid cells
for (let y = 0; y < gridSize; y++) {
    // Create a new row
    grid.push([]);

    for (let x = 0; x < gridSize; x++) {
        // Create a new div element for each cell
        const cell = document.createElement('div');
        cell.onclick = () => processItem(x, y);
        cell.classList.add('grid-cell');
        cell.className = 'cell';
        cell.id = 'cell-' + x + '-' + y;

        // Append the cell to the grid container
        gridContainer.appendChild(cell);

        // Add the cell to the grid
        grid[y].push(cell);
    }
}

// Print the grid
console.log(grid);
