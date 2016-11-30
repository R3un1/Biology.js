//initial set of values
const factor = Math.random();
var a1a1 = precisionRound(Math.random() * (1-factor), 2);
var a1a2 = precisionRound(Math.random() * factor, 2);
var a2a2 = precisionRound(1 - a1a1 - a1a2, 2);

const hardyGenerations = 3;

var p;
var q;

var output = document.getElementById('hw_output');

function writeResult(i){
    output.innerHTML += '<h4>Generation ' + i + ': </h4>';
    output.innerHTML += '<div class="text">' + a1a1 + '\t' + a1a2 + '\t' + a2a2 + '</div>';
}

function hardyGeneration(){
    a1a1 = precisionRound(p*p, 2);
    a1a2 = precisionRound(2*p*q, 2);
    a2a2 = precisionRound(q*q, 2);
}

for (var i = 0; i < hardyGenerations; i++){
    writeResult(i);
    p = precisionRound(a1a1 + a1a2 / 2, 2);
    q = precisionRound(1 - p, 2);
    hardyGeneration();
}