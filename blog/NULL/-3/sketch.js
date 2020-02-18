let note = 36;
let tickerSpeed = 40;
let aveToneBag = [30, 30, 34, 36];
let bassToneBag = [32, 36, 39, 40];
let halToneBag = [40, 40, 34, 46];

let ticker = 0;
let noteStack = [];
let osc, fft;;
let filter, filterFreq, filterRes;
let oscList = [];
let ff = 10;
let noteX = 30;
let noteY = 30;
function setup() {
    osc = new p5.SinOsc;
    fft = new p5.FFT;
    filter = new p5.LowPass();
    filterFreq = 220;
    filterRes = 5;
    osc.amp(0.5);
    osc.disconnect();
    osc.connect(filter);
    createCanvas(screen.width, screen.height);
    noStroke();
    background(25);
    rectWidth = width / 4;

}



function space_ticker() {
    if (noteStack.length >= 1)
        note = noteStack.pop();

    return note;
}

function youLose() {

}

function draw() {
    if (noteStack.length == 0) {
        youLose();
    }

    let barSpeed = 48;

    if (filterFreq >= midi2note(note)) {
        filterFreq -= 1;
    }
    if (filterFreq <= midi2note(note)) {
        filterFreq += midi2note(midi2note(ticker % 12));
    }

    filter.set(filterFreq, filterRes);
    clear();
    text("TO PLAY: DONT RUN OUT\n" +
        "W - A - S - D - I - J - K - L\n" +
        "ARROW KEYS SPACEBAR", 100, 160);
    ticker += 1;

    if (ticker % tickerSpeed == 0) {
        if (noteStack.length >= 1)
            note = noteStack.pop();
    }




    
    text(midi2note(note), noteX, noteY);
    text(ticker%tickerSpeed, noteX, noteY+108);
    text(note, noteX, noteY + 24);
    text(filterRes, noteX, noteY + 48);
    text(filterFreq, noteX + 16, noteY + 48);
    text(noteStack, noteX, noteY + 72);
    osc.freq(midi2note(note));

}


function handleNoteVelocity() {
    if (keyCode === ESCAPE) {
	console.log(noteStack.length - 1);
        noteStack.push(note);

    } else if (key == 'k' || key == 'K') {
        for (tone in bassToneBag) {
            noteStack.push(bassToneBag[tone]);
        }
    } else if (key == 'i' || key == 'I') {
        for (tone in aveToneBag) {
            noteStack.push(aveToneBag[tone]);
        }
    } else if (key == 'j' || key == 'J') {
        for (tone in halToneBag) {
            noteStack.push(halToneBag[tone]);
        }
    } else if (keyCode === UP_ARROW) {
        note += 1;
    } else if (keyCode === DOWN_ARROW) {
        note -= 1;
    } else if (keyCode === LEFT_ARROW) {
        note -= 12;
    } else if (keyCode === RIGHT_ARROW) {
        note += 12;
    } else if (key == ' ') {
        if (noteStack.length >= 1) {
            note = noteStack.pop();
        }
    } else if (key == "w" || key == "W") {
        filterRes += 1;
    } else if (key == "s" || key == "S") {
        filterRes -= 1;
    } else if (key == "d" || key == "D") {
        filterFreq += 1;
    } else if (key == "a" || key == "A") {
        filterFreq -= 1;
    }

}

function midi2note(midi) {
    return (2 ** ((midi - 69) / 12)) * 440;
}

function keyPressed() {
    clear();
    osc.start();
    handleNoteVelocity();

}

function keyReleased() {
}

