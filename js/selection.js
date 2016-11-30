var p;
var data = [];
var extinct = 0;
var fixed = 0;

function runGeneration(generationData, cN, fitness){
    var draws = 2 * cN;
    var a1 = 0;
    var a2 = 0;
    for (var i = 0; i < draws; i++){
        if (Math.random() < p * fitness) a1++;
        else a2++;
    }
    p = a1 / draws;
    generationData.push(p);
}

function runSimulation(simNum, simulations, generations, N, P, fitness){
    p = P;
    for (var i = 0; i < generations; i++){
        if (simulations > 1) runGeneration(data[simNum], N, p, fitness);
        else runGeneration(data, N, fitness);
    }
}

function runSimulations(config) {
    for (var i = 0; i < config[0]; i++){
        if (config[0] > 1) data.push([]);
        runSimulation(i, config[0], config[1], config[2], config[3], config[4]);
    }
    postMessage(data);
}

onmessage = function(c) {
    runSimulations(c.data);
};