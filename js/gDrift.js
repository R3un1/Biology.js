var p;
var data = [];
var populations = [];


function harmonicMean(set){
    var denominator = 0;
    for (var i = 0; i < set.length; i++){
        denominator += 1 / set[i];
    }
    return Math.round(set.length / denominator);
}

function driftingGeneration(generationData, cN){
    var draws = 2 * cN;
    var a1 = 0;
    var a2 = 0;
    for (var i = 0; i < draws; i++){
        if (Math.random() < p) a1++;
        else a2++;
    }
    p = a1 / draws;
    generationData.push(p);
}

function simulation(simNum, simulations, generations, N, bN, flag){
    p = 0.5;
    var populationSize;
    for (var i = 0; i < generations; i++){
        if (i % 10 === 9 && flag) {
            populationSize = bN;
        }
        else populationSize = N;
        populations.push(populationSize);
        if (simulations > 1) driftingGeneration(data[simNum], populationSize);
        else driftingGeneration(data, populationSize);
    }
}

function runSimulations(config) {
    for (var i = 0; i < config[0]; i++){
        if (config[0] > 1) data.push([]);
        simulation(i, config[0], config[1], config[2], config[3], config[4]);
    }
    var Ne = harmonicMean(populations);
    postMessage([data, Ne]);
}


onmessage = function (c) {
    runSimulations(c.data);
};