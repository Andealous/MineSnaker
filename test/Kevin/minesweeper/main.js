
// Define the grid size
const gridSize = 16;
const bombCount = 40;

grid = []; // items in the grid

bombs = []; // 0 = no bomb, 1 = bomb
bombProximityMask = []; // 0 = no bomb, 1 = 1 bomb, 2 = 2 bombs, etc.
islandMask = []; // islands of 2 or more cells with a proximity of 0 and directly surrounding cells, islands are defined with a index number.
cellState = []; // 0 = unclicked, 1 = clicked, 2 = flagged, 3 = question mark

// Function to call with x and y coordinates
function processItem(x, y, event) {
    console.log(`Processing item at (${x}, ${y})`);
    const item = grid[y][x]

    // Add logic here
    // Check if the item has a bomb
    if (bombs[y][x] === 1) {
        console.log('BOOM!');
        youlose();
    } else {
        // check if the item has the class clicked (basicaly a toggle)
        if (item.classList.contains('clicked')) {
            item.classList.remove('clicked');
            item.classList.add('num'+bombProximityMask[y][x])
            item.innerHTML = '';
            cellState[y][x] = 1;
        } else {
            item.classList.add('clicked');
            item.classList.add('num'+bombProximityMask[y][x])
            item.innerHTML = bombProximityMask[y][x];
            cellState[y][x] = 0;
        }
    }
}

// Function to add bombs randomly
function addBombs() {
    let bC = 0;
    while (bC < bombCount) {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        if (bombs[y][x] === 0) {
            bombs[y][x] = 1;
            bC++;
            console.log(`Added bomb at (${x}, ${y})`);
        }
    }
}

// Function to calculate the bomb proximity mask
function calcBombProximity() {
    for (let y = 0; y < gridSize; y++) {
        bombProximityMask.push([]);
        for (let x = 0; x < gridSize; x++) {
            let bombCount = 0;
            // Check if there is a bomb in the 8 surrounding cells
            if (x > 0 && y > 0 && bombs[y - 1][x - 1] === 1) {
                bombCount++;
            }
            if (y > 0 && bombs[y - 1][x] === 1) {
                bombCount++;
            }
            if (x < gridSize - 1 && y > 0 && bombs[y - 1][x + 1] === 1) {
                bombCount++;
            }
            if (x > 0 && bombs[y][x - 1] === 1) {
                bombCount++;
            }
            if (x < gridSize - 1 && bombs[y][x + 1] === 1) {
                bombCount++;
            }
            if (x > 0 && y < gridSize - 1 && bombs[y + 1][x - 1] === 1) {
                bombCount++;
            }
            if (y < gridSize - 1 && bombs[y + 1][x] === 1) {
                bombCount++;
            }
            if (x < gridSize - 1 && y < gridSize - 1 && bombs[y + 1][x + 1] === 1) {
                bombCount++;
            }
            bombProximityMask[y].push(bombCount);
        }
    }
}

function makeIslands() {
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {

        }
    }
    console.log(islandMask);
}

function youlose() {
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            if (bombs[y][x] === 1) {
                grid[y][x].classList.add('mine');
            }
        }
    }
}

// Get the grid container element
const gridContainer = document.querySelector('.game');

// Create the grid cells
for (let y = 0; y < gridSize; y++) {
    // Create a new row
    grid.push([]);
    cellState.push([]);
    bombs.push([]);

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
        bombs[y].push(0);
    }
}

// Call the function to add bombs
addBombs();
calcBombProximity();
makeIslands();

// Print the bombs array
console.log(bombs);
console.log(bombProximityMask);
