let cells = [];
let speed = 1;

function Cell() {
    this.pos = createVector(random(width), random(height));
    this.speed = 4;
    this.hue = random(256);
    this.bright = random(150, 256);
    this.prev = this.pos.copy();
    
    this.follow = function(c) {
        let vec = c.pos.copy().sub(this.pos).setMag(this.speed);
        this.pos.add(vec);
    }
    this.flee = function(c) {
        let vec = this.pos.copy().sub(c.pos).setMag(this.speed);
        this.pos.add(vec);
    }

    this.show = function(c) {
        stroke(this.hue, 256, this.bright);
        line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
        this.prev = this.pos.copy();
    }
}

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);
    background(0);
    colorMode(HSB, 256);
    let num = random(2,4);
    for (let n = 0; n < num; n++) {
    	cells.push(new Cell());
    }
}

function draw() {
    for (let n = 0; n < speed; n++) {
        for (let i = 0; i < cells.length; i++) {
            let followIndex = i + 1;
            let fleeIndex = i - 1;
            if (followIndex >= cells.length) followIndex = 0;
            if (fleeIndex < 0) fleeIndex = cells.length - 1;

            cells[i].show();
            cells[i].follow(cells[followIndex]);
            cells[i].flee(cells[fleeIndex]);
        }
    }
    if(speed < 500) speed *= 1.005;
}