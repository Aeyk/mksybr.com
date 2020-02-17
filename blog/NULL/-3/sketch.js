let note = 44;
let noteStack = [];
let osc, fft;;
let filter, filterFreq, filterRes; 
let oscList = [];
let ff = 4;
let noteX = 30;
let noteY = 30;
function setup() {
    osc = new p5.SinOsc;
    fft = new p5.FFT;
    filter = new p5.LowPass();
    filterFreq = 120;
    filterRes = 5;
    osc.amp(0.5);
    osc.disconnect();
    osc.connect(filter);
    createCanvas(screen.width, screen.height);
    noStroke();
    background(25);
    rectWidth = width/4;
}

function draw(){
    filter.set(filterFreq, filterRes);
}


function handleNoteVelocity() { 
   if(keyCode === ESCAPE) {
	noteStack.push(note);
    }
    if(keyCode === UP_ARROW) {
	note += 1;
    } else if(keyCode === DOWN_ARROW) {
	note -= 1;
    } else if(keyCode === LEFT_ARROW) {
	note -= 12;
    } else if(keyCode === RIGHT_ARROW) {
	note += 12;
    } else if(key == ' ') {
	if(noteStack.length >= 1) {   
	    note = noteStack.pop();
	}
    } else if(key == "W" ||  key == "w") {
	filterRes += ff;
    } else if(key == "S" ||  key == "s") {
	filterRes -= ff;
    }
    text(midi2note(note), noteX, noteY);
    text(note, noteX, noteY+24);
    text(filterRes, noteX, noteY+48);
    text(filterFreq, noteX+16, noteY+48);
    text(noteStack, noteX, noteY+72);
    osc.freq(midi2note(note));
    
    
}

function randomizeNoteVelocity() {

}

function midi2note(midi) {
    return (2**((midi - 69)/12)) * 440;
}

function keyPressed() {
    clear();
    osc.start();
    handleNoteVelocity();

}

function keyReleased() {
}

