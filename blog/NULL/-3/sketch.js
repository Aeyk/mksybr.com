let note = 44;
let osc;

function setup() {
    osc = new p5.SinOsc;
    osc.amp(0.5);
    createCanvas(width, height);
    noStroke();
    background(25);
    rectWidth = width/4;
}

function draw(){

}


function handleNoteVelocity() {
    if(keyCode === UP_ARROW) {
	note += 1;
    } else if(keyCode === DOWN_ARROW) {
	note -= 1;
    } else if(keyCode === LEFT_ARROW) {
	note -= 12;
    } else if(keyCode === RIGHT_ARROW) {
	note += 12;
    }
}

function midi2note(midi) {
    return (2**((midi - 69)/12)) * 440;
}

function keyPressed() {
    clear();
    osc.start();
    handleNoteVelocity();
    osc.freq(midi2note(note));
    text(midi2note(note), 30, 30);
}

function keyReleased() {
}

