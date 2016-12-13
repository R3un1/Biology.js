//modifiers
const eGridLenght = 30;
const nearDistance = 1;

const epOutput = document.getElementById('ep_output');
const epButton = document.getElementById('ep_button');

var eGrid = [];
var epGenerationsCounter = 0;
var eP;
var outbreak;

epOutput.innerHTML = '<h4>Grid Side</h4><div class="text">' + eGridLenght + '</div>';
epOutput.innerHTML = '<h4>Max Infection Distance</h4><div class="text">' + nearDistance + '</div>';
initEGrid();
draw_grid(epOutput, eGrid, ["S", "#1e1e1e", "I", "#af2f2f", "R", "#23a025"]);

function breakout() {
    function epSimulation() {
        epGeneration();
        update_grid(epOutput, eGrid, ["S", "#1e1e1e", "I", "#af2f2f", "R", "#23a025"]);
        epGenerationsCounter++;
        writeG();
        switch (eP) {
            case 0:
            case 1:
                clearInterval(outbreak);
                epButton.setAttribute('onclick', 'rebreak()');
                epButton.innerText = 'Restart';
        }
    }
    epButton.setAttribute('onclick', 'pause()');
    epButton.innerText = 'Pause';
    outbreak = setInterval(epSimulation, 60);
}

function pause() {
    clearInterval(outbreak);
    epButton.setAttribute('onlick', 'breakout()');
    epButton.innerText = 'Unpause';
}

function rebreak() {
    eGrid = [];
    epGenerationsCounter = 0;
    initEGrid();
    breakout();
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

function spaGeneration() {
    let tempGrid = [];
    for (let i = 0; i < eGridLenght; i++) {
        tempGrid[i] = [];
        for (let j = 0; j < eGridLenght; j++) {
            let victim = pickVictim(i, j);
            tempGrid[i][j] = getVictim();
        }
    }
    for (let i = 0; i < eGridLenght; i++) {
        for (let j = 0; j < eGridLenght; j++) {
            eGrid[i][j] = tempGrid[i][j];
        }
    }
}

function pickVictim(i, j) {
    let ii = Math.abs(getRandomInt(i-nearDistance, i+nearDistance) % eGridLenght);
    let jj = Math.abs(getRandomInt(j-nearDistance, j+nearDistance) % eGridLenght);
    return eGrid[ii][jj];
}

function getVictim(source, victim) {
    
}