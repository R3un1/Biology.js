var p;
var grid = [];
var spaGenerationsCounter = 0;
var F = 0;
var sim;
var gridLenght;
var maxMatingDistance;

function initGrid() {
    p = 0.5;
    for (var i = 0; i < gridLenght; i++) {
        grid[i] = [];
        for (var j = 0; j < gridLenght; j++) {
            var rdNumber = Math.random();
            if (rdNumber < (p*p)) grid[i][j] = 'A1A1'
            else if (rdNumber > (1-(1-p)*(1-p))) grid[i][j] = 'A2A2'
            else grid[i][j] = 'A1A2';
        }
    }
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function pickMatingPartner(i, j) {
    var ii = Math.abs(getRandomInt(i-maxMatingDistance, i+maxMatingDistance) % gridLenght);
    var jj = Math.abs(getRandomInt(j-maxMatingDistance, j+maxMatingDistance) % gridLenght);
    return grid[ii][jj];
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
    for (var i = 0; i < gridLenght; i++) {
        tempGrid[i] = [];
        for (var j = 0; j < gridLenght; j++) {
            var matingPartner = pickMatingPartner(i, j);
            tempGrid[i][j] = getOffspring(grid[i][j], matingPartner);
        }
    }
    for (var i = 0; i < gridLenght; i++) {
        for (var j = 0; j < gridLenght; j++){
            grid[i][j] = tempGrid[i][j];
        }
    }
}


function printData() {
    var A1A1 = 0;
    var A1A2 = 0;
    var A2A2 = 0;
    for (var i = 0; i < gridLenght; i++) {
        for (var j = 0; j < gridLenght; j++) {
            switch (grid[i][j]) {
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
    for (var i = 0; i < gridLenght; i++) {
        for (var j = 0; j < gridLenght; j++) {
            switch (grid[i][j]) {
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
    var N = Math.pow(gridLenght, 2);
    var h_o = A1A2 / N;
    p = ((2 * A1A1) + A1A2) / (2 * N);
    var h_e = 2 * p * (1-p);
    F = (h_e - h_o) / h_e;
    document.getElementById('mig_parOutput').innerHTML = '<h4>Generation</h4>' + '<div class="text">' + spaGenerationsCounter + '</div>';
    // document.getElementById('mig_parOutput').innerHTML += '<h4>F of heterozygosity</h4>' + '<div class="text">' + precisionRound(F, 2) + '</div>';
}

onmessage = function(c) {
    gridLenght = c.data[0];
    maxMatingDistance = c.data[1];
    initGrid();
};