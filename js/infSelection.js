var dataA = [];
var dataB = [];

function dP(p, s, h) {
    let q = 1 - p;
    return (p*q*s*(p*h+q*(1-h))/(1-2*p*q*h*s-2*q*s));
}

function runAgainstP(config) {
    for (let i = 0; i < 1.0005; i += 0.01) {
        dataA.push(dP(i, config[0], config[1]))
    }
}

function runSimulation(sim, initP, config) {
    let p = initP;
    for (let i = 0; i < config[2]; i++) {
        p += dP(p, config[0], config[1]);
        dataB[sim].push(p);
    }
}

function runAgainstTime(config) {
    let sim = 0;
    for (let p = 0.02; p < 1; p += 0.02) {
        dataB.push([]);
        runSimulation(sim++, p, config);
    }
}

onmessage = function(c) {
    runAgainstP(c.data);
    runAgainstTime(c.data);
    postMessage([dataA, dataB]);
};