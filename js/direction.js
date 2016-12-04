var dataA = [];
var dataB = [];

function dP(p, s, h) {
    let q = 1 - p;
    return (p*q*s*(p*h+q*(q*(1-h)))/(1-2*p*q*h*s-2*q*s));
}

function runAgainstP(config) {
    for (let i = 0; i < 1.005; i += 0.01) {
        dataA.push(dP(i, config[0], config[1]))
    }
}

function runAgainstTime(config) {
    let p = config[2];
    for (let i = 0; i < config[3]; i++) {
        p += dP(p, config[0], config[1]);
        dataB.push(p);
    }
}

onmessage = function(c) {
    runAgainstP(c.data);
    runAgainstTime(c.data);
    postMessage([dataA, dataB]);
};