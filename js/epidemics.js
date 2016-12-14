//modifiers
const eGridLenght = 30;
const nearDistance = 1;
const beta = 0.5;
const gamma = 0.2;

const epOutput = document.getElementById('ep_output');
const epButton = document.getElementById('ep_button');

let eGrid = [];
let tempGrid = [];
let epGenerationsCounter = 0;
let outbreak;
let infected = 0;

epOutput.innerHTML = '<h4>Grid Side</h4><div class="text">' + eGridLenght + '</div>';
epOutput.innerHTML = '<h4>Max Infection Distance</h4><div class="text">' + nearDistance + '</div>';
initEGrid();
draw_grid(epOutput, eGrid, ["S", "#1e1e1e", "I", "#af2f2f", "R", "#23a025"]);

function breakout() {
    epButton.setAttribute('onclick', 'pause()');
    epButton.innerText = 'Pause';
    outbreak = setInterval(epSimulation, 60);
}

function epSimulation() {
    epGeneration();
    update_grid(epOutput, eGrid, ["S", "#1e1e1e", "I", "#af2f2f", "R", "#23a025"]);
    epGenerationsCounter++;
    writeG();
    if (searchFor("I") === false) {
        clearInterval(outbreak);
        epButton.setAttribute('onclick', 'rebreak()');
        epButton.innerText = 'Restart';
    }
}

function pause() {
    clearInterval(outbreak);
    epButton.setAttribute('onclick', 'breakout()');
    epButton.innerText = 'Unpause';
}

function rebreak() {
    eGrid = [];
    epGenerationsCounter = 0;
    initEGrid();
    breakout();
}

function searchFor(s) {
    for (let i = 0; i < eGridLenght; i++) {
        for (let j = 0; j < eGridLenght; j++) {
            if (eGrid[i][j] === s) return true;
        }
    }
    return false;
}

function writeG() {
    document.getElementById('ep_parOutput').innerHTML = '<h4>T</h4>' + '<div class="text">' + epGenerationsCounter + '</div>';
}

function initEGrid() {
    for (let i = 0; i < eGridLenght; i++) {
        eGrid[i] = [];
        for (let j = 0; j < eGridLenght; j++) {
            eGrid[i][j] = "S";
        }
    }
    eGrid[getRandomInt(0, eGridLenght - 1)][getRandomInt(0, eGridLenght - 1)] = "I";
}

function epGeneration() {
    tempGrid = [];
    for (let i = 0; i < eGridLenght; i++) {
        tempGrid[i] = [];
        for (let j = 0; j < eGridLenght; j++) {
            tempGrid[i][j] = eGrid[i][j];
        }
    }

    for (let i = 0; i < eGridLenght; i++) {
        for (let j = 0; j < eGridLenght; j++) {
            switch (eGrid[i][j]) {
                case "I":
                exposeNeighbors(i, j);
                tryRecovery(i, j);
            }
        }
    }

    for (let i = 0; i < eGridLenght; i++) {
        for (let j = 0; j < eGridLenght; j++) {
            eGrid[i][j] = tempGrid[i][j];
        }
    }
}

function exposeNeighbors(i, j) {
    for (let ii = i-1; ii <= i+1; ii++) {
        for (let jj = j-1; jj <= j+1; jj++) {
            if (ii === i && jj === j) continue;
            tryInfection(boundIndex(ii), boundIndex(jj));
        }
    }
}

function boundIndex(i) {
    return Math.abs(i % eGridLenght);
}

function tryInfection(i, j) {
    if (eGrid[i][j] === "S") {
        if (Math.random() < beta) {
            tempGrid[i][j] = "I";
            infected++;
        }
    }
}

function tryRecovery(i, j) {
    if (Math.random() < gamma) tempGrid[i][j] = "R";
}