//modifiers
const seqLength = 16;
const numSeq = 64;
const mutationRate = 0.000055;
const mutGenerations = 8;

const bases = ['A', 'C', 'G', 'T'];
var textOutput = document.getElementById("mut_textOutput");
var parOutput = document.getElementById("mut_parOutput");

var originalSeq = [];
var sequences = []; //population
var mutations = 0;

function randBase() {
    return bases[Math.floor(Math.random() * 4)];
}

function isEqual(setA, setB) {
    if (setA.length !== setB.length) return false;
    for (var i = 0; i < setA.length; i++) {
        if (setA[i] !== setB[i]) return false;
    }
    return true;
}

function outputSequence(set) {
    var item = (isEqual(originalSeq, set) ? '<li>' : '<li class="mutated">');
    for (var i = 0; i < set.length; i++) {
        item += set[i];
    }
    textOutput.innerHTML += item + '</li>';
}

function outputSequences() {
    for (var i = 0; i < sequences.length; i++) {
        textOutput.innerHTML += '<ul>'
        outputSequence(sequences[i]);
        textOutput.innerHTML += '</ul>'
    }
}

function generateFirstGen() {
    generateFirstSeq();
    for (var i = 0; i < numSeq; i++) {
        sequences.push(originalSeq.slice());
    }
}

function generateFirstSeq() {
    for (var i = 0; i < seqLength; i++) {
        originalSeq.push(randBase());
    }
}

function mutGeneration() {
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

parOutput.innerHTML += '<h4>Mutation Rate</h4>' + '<div class="text">' + mutationRate + ' per base & generation</div>';
parOutput.innerHTML += '<h4>Generations</h4>' + '<div class="text">' + mutGenerations + '</div>';
generateFirstGen();
for (var i = 0; i < mutGenerations; i++) mutGeneration();
outputSequences(sequences);
parOutput.innerHTML += '<h4>Mutations</h4>' + '<div class="text">' + mutations + '/' + numSeq + '</div>';