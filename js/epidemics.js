//modifiers
const eGridLenght = 70;
const nearDistance = 1;
const beta = .02;
const gamma = .045;
const randomVictim = .005;

const epOutput = document.getElementById('ep_output');
const epButton = document.getElementById('ep_button');

let eGrid = [];
let tempGrid = [];
let epGenerationsCounter = 0;
let outbreak;
let infected = 0;

// epOutput.innerHTML = '<h4>Grid Side</h4><div class="text">' + eGridLenght + '</div>';
// epOutput.innerHTML = '<h4>Max Infection Distance</h4><div class="text">' + nearDistance + '</div>';
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
    let boundI, boundJ;
    for (let ii = i-nearDistance; ii <= i+nearDistance; ii++) {
        boundI = boundIndex(ii, eGridLenght);
        for (let jj = j-nearDistance; jj <= j+nearDistance; jj++) {
            boundJ = boundIndex(jj, eGridLenght);
            if (Math.random() < randomVictim) {
                boundI = getRandomInt(0, eGridLenght-1);
                boundJ = getRandomInt(0, eGridLenght-1);
            }
            if (boundI === i && boundJ === j) continue;
            tryInfection(boundI, boundJ);
        }
    }
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