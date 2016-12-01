const bases = ['A', 'C', 'G', 'T'];
var originalSeq = [];
var sequences = []; //population
var mutations = 0;

function randBase() {
    return bases[Math.floor(Math.random() * 4)];
}

function generateFirstGen(seqLength, numSeq) {
    generateFirstSeq(seqLength);
    for (var i = 0; i < numSeq; i++) {
        sequences.push(originalSeq.slice());
    }
}

function generateFirstSeq(seqLength) {
    for (var i = 0; i < seqLength; i++) {
        originalSeq.push(randBase());
    }
}

function mutGeneration(mutationRate, seqLength, numSeq) {
    for (var i = 0; i < numSeq; i++) {
        //generation
        for (var j = 0; j < sequences.length; j++) {
            //sequence
            for (var k = 0; k < sequences[j].length; k++) {
                //base
                if (Math.random() < mutationRate) {
                    mutations++;
                    do {
                        var base = sequences[j][k]
                        sequences[j][k] = randBase();
                    }while (base === sequences[j][k]);
                }
            }
        }
    }
}

function runSimulation(config) {
    generateFirstGen(config[2], config[3]);
    for (var i = 0; i < config[0]; i++) mutGeneration(config[1], config[2], config[3]);
}

onmessage = function(c) {
    runSimulation(c.data);
    postMessage([sequences, mutations, originalSeq]);
}