//modifiers
const sGridLenght = 100;
const maxMatingDistance = 1;

const spaOutput = document.getElementById('mig_output');
const migButton = document.getElementById('mig_button');

let sP;
let sGrid = [];
let spaGenerationsCounter = 0;
let F = 0;
let sim;


spaOutput.innerHTML += '<h4>Grid Side</h4>' + '<div class="text">' + sGridLenght + '</div>';
spaOutput.innerHTML += '<h4>Max Mating Distance</h4>' + '<div class="text">' + maxMatingDistance + '</div>';
initSGrid();
draw_grid(spaOutput, sGrid, ["AB", "#e8ef8b", "A", "#af2f2f", "B", "#23a025", "O", "#273075"]);

function migrate() {
    function spaSimulation() {
        spaGeneration();
        update_grid(spaOutput, sGrid, ["AB", "#e8ef8b", "A", "#af2f2f", "B", "#23a025", "O", "#273075"]);
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
    for (let i = 0; i < sGridLenght; i++) {
        sGrid[i] = [];
        for (let j = 0; j < sGridLenght; j++) {
            sGrid[i][j] = Math.random() < .5 ? (
                Math.random() < .5 ? 'A' : 'B'
            ) : (
                Math.random() < .5 ? 'AB' : 'O'
            );
            // let rdNumber = Math.random();
            // if (rdNumber < (sP*sP)) sGrid[i][j] = 'A'
            // else if (rdNumber > (1-(1-sP)*(1-sP))) sGrid[i][j] = 'B'
            // else sGrid[i][j] = 'AB';
        }
    }
}

function pickMatingPartner(i, j) {
    let ii = getRandomInt(i-maxMatingDistance, i+maxMatingDistance);
    let jj = getRandomInt(j-maxMatingDistance, j+maxMatingDistance);
    return sGrid[boundIndex(ii, sGridLenght)][boundIndex(jj, sGridLenght)];
}

function getOffspring(parent1, parent2) {
    let rnd = Math.random();
    /* pure parents */
    if (parent1 === 'O' && parent2 === 'O') return 'O';
    else if (parent1 === 'A' && parent2 === 'A') return rnd < .5 ? 'O' : 'A';
    else if (parent1 === 'B' && parent2 === 'B') return rnd < .5 ? 'O' : 'B';
    else if (parent1 === 'AB' && parent2 === 'AB') {
        if (rnd < .25) return 'A';
        else if (rnd >= .75) return 'B';
        else return 'AB';
    }
    /* 0 parent */
    else if ((parent1 === 'O' && parent2 === 'A') || (parent2 === 'O' && parent1 === 'A')) return rnd < .5 ? 'O' : 'A';
    else if ((parent1 === 'O' && parent2 === 'B') || (parent2 === 'O' && parent1 === 'B')) return rnd < .5 ? 'O' : 'B';
    else if ((parent1 === 'O' && parent2 === 'AB') || (parent2 === 'O' && parent1 === 'AB')) return rnd < .5 ? 'A' : 'B';
    /* A parent */
    else if ((parent1 === 'A' && parent2 === 'O') || (parent2 === 'A' && parent1 === 'O')) return rnd < .5 ? 'A' : 'O';
    else if ((parent1 === 'A' && parent2 === 'B') || (parent2 === 'A' && parent1 === 'B')) {
        return rnd < .5 ? (
            Math.random() < .5 ? 'O' : 'A'
        ) : (
            Math.random() < .5 ? 'B' : 'AB'
        );
    }
    else if ((parent1 === 'A' && parent2 === 'AB') || (parent2 === 'A' && parent1 === 'AB')) {
        if (rnd < .25) return 'AB';
        else if (rnd >= .75) return 'B';
        else return 'A';
    }
    /* B parent */
    else if ((parent1 === 'B' && parent2 === 'O') || (parent2 === 'B' && parent1 === 'O')) return rnd < .5 ? 'B' : 'O';
    else if ((parent1 === 'B' && parent2 === 'A') || (parent2 === 'B' && parent1 === 'A')) {
        return rnd < .5 ? (
            Math.random() < .5 ? 'O' : 'A'
        ) : (
            Math.random() < .5 ? 'B' : 'AB'
        );
    }
    else if ((parent1 === 'B' && parent2 === 'AB') || (parent2 === 'B' && parent1 === 'AB')) {
        if (rnd < .25) return 'AB';
        else if (rnd >= .75) return 'A';
        else return 'B';
    }
    /* AB parent */
    else if ((parent1 === 'AB' && parent2 === 'O') || (parent2 === 'AB' && parent1 === 'O')) return rnd < .5 ? 'A' : 'B';
    else if ((parent1 === 'AB' && parent2 === 'A') || (parent2 === 'AB' && parent1 === 'A')) {
        if (rnd < .25) return 'AB';
        else if (rnd >= .75) return 'B';
        else return 'A';
    }
    else if ((parent1 === 'AB' && parent2 === 'B') || (parent2 === 'AB' && parent1 === 'B')) {
        if (rnd < .25) return 'AB';
        else if (rnd >= .75) return 'A';
        else return 'B';
    }
    else console.log('error');
}

function spaGeneration() {
    let tempGrid = [];
    for (let i = 0; i < sGridLenght; i++) {
        tempGrid[i] = [];
        for (let j = 0; j < sGridLenght; j++) {
            let matingPartner = pickMatingPartner(i, j);
            tempGrid[i][j] = getOffspring(sGrid[i][j], matingPartner);
        }
    }
    for (let i = 0; i < sGridLenght; i++) {
        for (let j = 0; j < sGridLenght; j++){
            sGrid[i][j] = tempGrid[i][j];
        }
    }
}

function writeF() {
    let A = 0;
    let AB = 0;
    let B = 0;
    let O = 0;
    for (let i = 0; i < sGridLenght; i++) {
        for (let j = 0; j < sGridLenght; j++) {
            switch (sGrid[i][j]) {
                case 'A':
                A++;
                break;
                case 'AB':
                AB++;
                break;
                case 'B':
                B++;
                break;
                case 'O':
                O++;
            }
        }
    }
    let N = Math.pow(sGridLenght, 2);
    let h_o = AB / N;
    sP = ((2 * A) + AB) / (2 * N);
    let h_e = 2 * sP * (1-sP);
    F = (h_e - h_o) / h_e;
    spaGenerationsCounter++;
    document.getElementById('mig_parOutput').innerHTML = '<h4>Generation</h4>' + '<div class="text">' + spaGenerationsCounter + '</div>';
    document.getElementById('mig_parOutput').innerHTML += '<h4>F of heterozygosity</h4>' + '<div class="text">' + precisionRound(F, 2) + '</div>';
}