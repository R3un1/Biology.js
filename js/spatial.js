//modifiers
const sGridLenght = 30;
const maxMatingDistance = 1;

const spaOutput = document.getElementById('mig_output');
const migButton = document.getElementById('mig_button');

var sP;
var sGrid = [];
var spaGenerationsCounter = 0;
var F = 0;
var sim;


spaOutput.innerHTML += '<h4>Grid Side</h4>' + '<div class="text">' + sGridLenght + '</div>';
spaOutput.innerHTML += '<h4>Max Mating Distance</h4>' + '<div class="text">' + maxMatingDistance + '</div>';
initSGrid();
draw_grid(spaOutput, sGrid, ["A1A2", "#e8ef8b", "A1A1", "#af2f2f", "A2A2", "#23a025"]);

function migrate() {
    function spaSimulation() {
        spaGeneration();
        update_grid(spaOutput, sGrid, ["A1A2", "#e8ef8b", "A1A1", "#af2f2f", "A2A2", "#23a025"]);
        spaGenerationsCounter++;
        writeF();
        if (sP === 1 || sP === 0) {
            clearInterval(sim);
            migButton.setAttribute('onclick', 'restart()');
            migButton.innerText = 'Restart';
        }

    }
    migButton.setAttribute('onclick', 'terminate()');
    migButton.innerText = 'Pause';
    sim = setInterval(spaSimulation, 60);
}

function terminate() {
    clearInterval(sim);
    migButton.setAttribute('onclick', 'migrate()');
    migButton.innerText = 'Unpause';
}

function restart() {
    sGrid = [];
    spaGenerationsCounter = 0;
    initSGrid();
    migrate();
}


function initSGrid() {
    sP = 0.5;
    for (var i = 0; i < sGridLenght; i++) {
        sGrid[i] = [];
        for (var j = 0; j < sGridLenght; j++) {
            var rdNumber = Math.random();
            if (rdNumber < (sP*sP)) sGrid[i][j] = 'A1A1'
            else if (rdNumber > (1-(1-sP)*(1-sP))) sGrid[i][j] = 'A2A2'
            else sGrid[i][j] = 'A1A2';
        }
    }
}

function pickMatingPartner(i, j) {
    var ii = Math.abs(getRandomInt(i-maxMatingDistance, i+maxMatingDistance) % sGridLenght);
    var jj = Math.abs(getRandomInt(j-maxMatingDistance, j+maxMatingDistance) % sGridLenght);
    return sGrid[ii][jj];
}

function getOffspring(parent1, parent2) {
    if (parent1 === 'A1A1' && parent2 === 'A1A1') return 'A1A1';
    else if ((parent1 === 'A1A1' && parent2 === 'A1A2') || (parent2 === 'A1A1' && parent1 === 'A1A2')) {
        return Math.random() < 0.5 ? 'A1A1' : 'A1A2';
    }
    else if ((parent1 === 'A1A1' && parent2 === 'A2A2') || (parent2 === 'A1A1' && parent1 === 'A2A2')) return 'A1A2';
    else if (parent1 === 'A1A2' && parent2 === 'A1A2') {
        var rnd = Math.random();
        if (rnd < .25) return 'A1A1';
        else if (rnd >= .75) return 'A2A2';
        else return 'A1A2';
    }
    else if ((parent1 === 'A2A2' && parent2 === 'A1A2') || (parent2 === 'A2A2' && parent1 === 'A1A2')) {
        return Math.random() < 0.5 ? 'A2A2' : 'A1A2';
    }
    else if (parent1 === 'A2A2' && parent2 === 'A2A2') return 'A2A2';
    else console.log('error');
}

function spaGeneration() {
    var tempGrid = [];
    for (var i = 0; i < sGridLenght; i++) {
        tempGrid[i] = [];
        for (var j = 0; j < sGridLenght; j++) {
            var matingPartner = pickMatingPartner(i, j);
            tempGrid[i][j] = getOffspring(sGrid[i][j], matingPartner);
        }
    }
    for (var i = 0; i < sGridLenght; i++) {
        for (var j = 0; j < sGridLenght; j++){
            sGrid[i][j] = tempGrid[i][j];
        }
    }
}


function printData() {
    var A1A1 = 0;
    var A1A2 = 0;
    var A2A2 = 0;
    for (var i = 0; i < sGridLenght; i++) {
        for (var j = 0; j < sGridLenght; j++) {
            switch (sGrid[i][j]) {
                case 'A1A1':
                A1A1++;
                break;
                case 'A1A2':
                A1A2++;
                break;
                case 'A2A2':
                A2A2++;
                break;
            }
        }
    }
    console.log('Generation ' + spaGenerationsCounter + ':');
    console.log(A1A1, A1A2, A2A2);
}

function writeF() {
    var A1A1 = 0;
    var A1A2 = 0;
    var A2A2 = 0;
    for (var i = 0; i < sGridLenght; i++) {
        for (var j = 0; j < sGridLenght; j++) {
            switch (sGrid[i][j]) {
                case 'A1A1':
                A1A1++;
                break;
                case 'A1A2':
                A1A2++;
                break;
                case 'A2A2':
                A2A2++;
                break;
            }
        }
    }
    var N = Math.pow(sGridLenght, 2);
    var h_o = A1A2 / N;
    sP = ((2 * A1A1) + A1A2) / (2 * N);
    var h_e = 2 * sP * (1-sP);
    F = (h_e - h_o) / h_e;
    document.getElementById('mig_parOutput').innerHTML = '<h4>Generation</h4>' + '<div class="text">' + spaGenerationsCounter + '</div>';
    // document.getElementById('mig_parOutput').innerHTML += '<h4>F of heterozygosity</h4>' + '<div class="text">' + precisionRound(F, 2) + '</div>';
}