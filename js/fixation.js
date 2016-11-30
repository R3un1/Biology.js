const fixPopulation = 100;
const fixSimulations = 10000;
const fixOutput = document.getElementById('fix_output')

var p;

var fixations = 0;
var totGenerations = 0;

function fixGeneration() {
    var draws = 2 * fixPopulation;
    var a1 = 0;
    var a2 = 0;
    for (var i = 0; i < draws; i++) {
        if (Math.random() < p) a1++;
        else a2++;
    }
    p = a1 / draws;
}

function runUntilFixation() {
    var _generations = 0;
    p = 1 / (2 * fixPopulation);
    do {
        _generations++;
        fixGeneration();
    } while (p > 0 && p < 1);
    if (p == 1) {
        totGenerations += _generations;
        fixations++;
    }
}

for (var i = 0; i < fixSimulations; i++) {
    runUntilFixation();
}

fixOutput.innerHTML += '<h4>Fixations / Simulations (p)</h4>' + '<div class="text">' + (fixations/fixSimulations) + '</div>';
fixOutput.innerHTML += '<h4>Average Fixation Runtime</h4>' + '<div class="text">' + precisionRound(totGenerations/fixations, 2) + '</div>';