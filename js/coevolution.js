let data = [];
let hostFrequencies = [0, 0];
let parasiteFrequencies = [0, 0];

let config;

function initFrequencies() {
    data.push([hostFrequencies[0] = Math.random()]);
    data.push([hostFrequencies[1] = 1 - hostFrequencies[0]]);
    data.push([parasiteFrequencies[0] = Math.random()]);
    data.push([parasiteFrequencies[1] = 1 - parasiteFrequencies[0]]);
}

function hostSelection() {
    let sumHostFreq = 0;
    for (let i = 0; i < hostFrequencies.length; i++) {
        let hostFitness = 0;
        for (let j = 0; j < parasiteFrequencies.length; j++) {
            hostFitness += (i === j ? 1 - config[1] : 1) * parasiteFrequencies[j];
        }
        hostFrequencies[i] *= hostFitness;
        sumHostFreq += hostFrequencies[i];
    }
    for (let i = 0; i < hostFrequencies.length; i++) {
        hostFrequencies[i] /= sumHostFreq;
    }
}

function parasiteSelection() {
    let sumParFreq = 0;
    for (let i = 0; i < parasiteFrequencies.length; i++) {
        let parasiteFitness = 0;
        for (let j = 0; j < hostFrequencies.length; j++) {
            parasiteFitness += (i === j ? 1 : 1 - config[2]) * hostFrequencies[j];
        }
        parasiteFrequencies[i] *= parasiteFitness;
        sumParFreq += parasiteFrequencies[i];
    }
    for (let i = 0; i < hostFrequencies.length; i++) {
        hostFrequencies[i] /= sumParFreq;
    }
}

function runSimulation () {
    for (let i = 0; i < config[0]; i++) {
        hostSelection();
        parasiteSelection();
        data[0].push(hostFrequencies[0]);
        data[1].push(hostFrequencies[1]);
        data[2].push(parasiteFrequencies[0]);
        data[3].push(parasiteFrequencies[1]);
    }
}

onmessage = function (c) {
    config = c.data;
    initFrequencies();
    runSimulation();
    postMessage(data);
};