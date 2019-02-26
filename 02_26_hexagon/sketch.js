// I'll refactor this later...

let zoff = 0;
let h = 0;
let hex;
let scl = 0.02;
let hexSize = 50;
let dis;

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);

    colorMode(HSB, 256);

    h = random(256);
    stroke(0);
    strokeWeight(0.5);
    
    dis = hexSize * sin(PI / 3) * 2;
    
    hex = [];
    
    for (let a = 0; a < TWO_PI; a += TWO_PI / 6) {
        let x = sin(a);
        let y = cos(a);
        hex.push(createVector(x,y));
    }
}

function drawHex(x, y, r) {
    beginShape();
    for (let i = 0; i < hex.length; i += 1) {
        vertex(x + hex[i].x * r, y + hex[i].y * r);
    }
    endShape(CLOSE);
}

function draw() {

    let row = 0;
    for (let y = -hexSize; y <= height + hexSize; y += hexSize * 1.5) {
        for (let x = (row % 2) ? -dis / 2 : -dis; x <= width + hexSize; x += dis) {
            let n = noise(x * scl, y * scl, zoff);
            n = pow(n, 3);
            fill(h % 256, 40, n * 256);
            drawHex(x, y, hexSize);
        }
        row += 1;
    }
    h += 0.2;
    zoff += 0.002;
}