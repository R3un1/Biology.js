var p;
var fixations = 0;
var totGenerations = 0;

function fixGeneration(N) {
    var draws = 2 * N;
    var a1 = 0;
    var a2 = 0;
    for (var i = 0; i < draws; i++) {
        if (Math.random() < p) a1++;
        else a2++;
    }
    p = a1 / draws;
}

function runUntilFixation(N) {
    var _generations = 0;
    p = 1 / (2 * N);
    do {
        _generations++;
        fixGeneration(N);
    } while (p > 0 && p < 1);
    if (p == 1) {
        totGenerations += _generations;
        fixations++;
    }
}

function runSimulations(config) {
    for (var i = 0; i < config[0]; i++) {
        runUntilFixation(config[1]);
    }
}

onmessage = function(c) {
    runSimulations(c.data);
    postMessage([fixations, totGenerations]);
};