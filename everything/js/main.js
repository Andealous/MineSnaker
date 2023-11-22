
// Define the grid size
const gridSize = 16;
const bombCount = 40;

let grid = []; // items in the grid

let bombs = []; // 0 = no bomb, 1 = bomb
let bombProximityMask = []; // 0 = no bomb, 1 = 1 bomb, 2 = 2 bombs, etc.
let islandMask = []; // islands of 2 or more cells with a proximity of 0 and directly surrounding cells, islands are defined with a index number.
let cellState = []; // 0 = unclicked, 1 = clicked, 2 = flagged, 3 = question mark
let emptylist = []; // list of empty cells

let flag = false;

let surroundingCells = [[-1, -1], [0, -1], [1, -1], [-1, 0], [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];

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
        selectItem(x, y)
        if (islandMask[y][x] != 0) {
            console.log('Island!');
            clearIsland(1);
        }
    }
}

function selectItem(x, y) {
    item = grid[y][x];
    item.classList.add('clicked');
    item.classList.add('num'+bombProximityMask[y][x])
    item.innerHTML = bombProximityMask[y][x];
    cellState[y][x] = 0;
}

// clear full island
function clearIsland(islandIndex) {
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (islandMask[y][x] === islandIndex) {
                selectItem(x, y);
            }
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
            // Check if there is a bomb in the 9 surrounding cells
            for (let i = 0; i < 9; i++) {
                let xpos = x + surroundingCells[i][0];
                let ypos = y + surroundingCells[i][1];
                if (0 <= xpos && xpos < gridSize && 0 <= ypos && ypos < gridSize) {
                    if (bombs[ypos][xpos] === 1) {
                        bombCount++;
                    }
                }
            }
            bombProximityMask[y].push(bombCount);
        }
    }
}

// function to make islands
function makeIslands() {
    let tmplst = [];
    for (let y = 0; y < gridSize; y++) {
        tmplst.push([]);
        for (let x = 0; x < gridSize; x++) {
            if (bombs[y][x] === 0 && bombProximityMask[y][x] === 0 && islandMask[y][x] === 0) {
                islandMask[y][x] = 1;
            }
            tmplst[y].push(0);
        }
    }
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            for (let i = 0; i < 9; i++) {
                let xpos = x + surroundingCells[i][0];
                let ypos = y + surroundingCells[i][1];
                if (islandMask[y][x] != 0 && 0 <= xpos && xpos < gridSize && 0 <= ypos && ypos < gridSize) {
                    tmplst[ypos][xpos] = islandMask[y][x];
                }
            }
        }
    }
    islandMask = tmplst;
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

function btnselect() {
    selbtn = document.querySelector("#selectbtn");
    flgbtn = document.querySelector("#flagbtn");
    if (selbtn.classList.contains("btnactive")) {
        return;
    } else {
        selbtn.classList.add("btnactive");
        if (flgbtn.classList.contains("btnactive")) {
            flgbtn.classList.remove("btnactive");
        }
    }
}
function btnflag() {
    selbtn = document.querySelector("#selectbtn");
    flgbtn = document.querySelector("#flagbtn");
    if (flgbtn.classList.contains("btnactive")) {
        return;
    } else {
        flgbtn.classList.add("btnactive");
        if (selbtn.classList.contains("btnactive")) {
            selbtn.classList.remove("btnactive");
        }
    }
}

// Get the grid container element
const gridContainer = document.querySelector('.game');

// Create the grid cells
function createGrid(){
    for (let y = 0; y < gridSize; y++) {
        // Create a new row
        grid.push([]);
        cellState.push([]);
        bombs.push([]);
        islandMask.push([]);
        emptylist.push([]);

        for (let x = 0; x < gridSize; x++) {
            // Create a new div element for each cell
            const cell = document.createElement('button');
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
            islandMask[y].push(0);
            emptylist[y].push(0);
        }
    }
}

// Call the function to add bombs
createGrid();
addBombs();
calcBombProximity();
makeIslands();

// Print the bombs array
console.log('bombs', bombs);
console.log('bombproximity', bombProximityMask);
console.log('islandmask', islandMask);
