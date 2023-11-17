
// Define the grid size
const gridSize = 16;

grid = [];

bombMask = []; // 0 = no bomb, 1 = bomb
cellState = []; // 0 = unclicked, 1 = clicked, 2 = flagged, 3 = question mark

// Function to call with x and y coordinates
function processItem(x, y, event) {
    console.log(`Processing item at (${x}, ${y})`);
    const item = grid[y][x]

    // check if the item has the class clicked (basicaly a toggle)
    if (item.classList.contains('clicked')) {
        item.classList.remove('clicked');
        cellState[y][x] = 1;
    } else {
        item.classList.add('clicked');
        cellState[y][x] = 0;
    }
    
    // Add logic here
}

// Get the grid container element
const gridContainer = document.querySelector('.game');

// Create the grid cells
for (let y = 0; y < gridSize; y++) {
    // Create a new row
    grid.push([]);
    cellState.push([]);

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
        cellState[y].push(0);
    }
}

// Print the grid
console.log(grid);
console.log(cellState);
