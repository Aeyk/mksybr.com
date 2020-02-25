let note = 36;
let tickerSpeed = 40;
let aveToneBag = [40, 40, 44, 46];
let bassToneBag = [42, 46, 49, 40];
let halToneBag = [40, 40, 34, 46];

let ticker = 0;
let noteStack = [];
let osc, fft;
let filter, filterFreq, filterRes;
let oscList = [];
let ff = 10;
let noteX = 30;
let noteY = 30;
var sloop;

function togglePlayPause() {
  if (sloop.isPlaying) {
    sloop.stop();
    synth.noteRelease(); // Release all notes
  } else {
    sloop.start();
  }
}
function setup() {
  sloop = new p5.SoundLoop(soundLoop, 0.1);

  osc = new p5.SinOsc();
  synth = new p5.PolySynth();
  fft = new p5.FFT();
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
  playPauseButton = createButton('Play / Pause');
  playPauseButton.position(20, 90);

  playPauseButton.mousePressed(togglePlayPause);
}

function space_ticker() {
  if (noteStack.length >= 1) note = noteStack.pop();

  return note;
}

function youLose() {}
let value = 1;

function mouseMoved() {
  value = value + 5;
  if (value > 255) {
    value = 0;
  }
  osc.freq(midi2note(note));
}

function draw() {
  fill(value);

  let barSpeed = 48;

  if (filterFreq >= midi2note(note)) {
    filterFreq -= 1;
  }
  if (filterFreq <= midi2note(note)) {
    filterFreq += midi2note(midi2note(ticker % 12));
  }

  filter.set(filterFreq, filterRes);
  clear();
  text(
    'TO PLAY: DONT RUN OUT\n' + 'W - A - S - D - I - J - K - L\n' + 'ARROW KEYS SPACEBAR',
    100,
    160
  );
  ticker += 1;

  if (ticker % tickerSpeed == 0) {
    if (noteStack.length >= 1) note = noteStack.pop();
    note = noteStack[Math.round(Math.random() * noteStack.length)] || 32;
  }

  text(midi2note(note), noteX, noteY);
  text(ticker % tickerSpeed, noteX, noteY + 108);
  text(note, noteX, noteY + 24);
  text(filterRes, noteX, noteY + 48);
  text(filterFreq, noteX + 16, noteY + 48);
  text(noteStack, noteX, noteY + 72);
}

function handleNoteVelocity() {
  if (keyCode === ESCAPE) {
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
  } else if (key == 'w' || key == 'W') {
    filterRes += 1;
  } else if (key == 's' || key == 'S') {
    filterRes -= 1;
  } else if (key == 'd' || key == 'D') {
    filterFreq += 1;
  } else if (key == 'a' || key == 'A') {
    filterFreq -= 1;
  }
}

function midi2note(midi) {
  return 2 ** ((midi - 69) / 12) * 440;
}

function keyPressed() {
  clear();
  osc.start();
  handleNoteVelocity();
}

function keyReleased() {}
function soundLoop(cycleStartTime) {
  let toneBags = [aveToneBag, bassToneBag, halToneBag];
  if (noteStack.length == 0) {
    for (aToneBag in toneBags) {
      console.log(toneBags[aToneBag]);
      let bag = toneBags[aToneBag];
      for (tone in bag) {
        noteStack.push(bag[tone]);
      }
    }
  }

  // Play the sound of this node
  var midiNoteNumber = noteStack.pop;
  var freq = midi2note(midiNoteNumber);
  if (Math.round(Math.random())) {
    synth.noteAttack(freq, Math.random * 10, cycleStartTime);
  } else {
    synth.noteRelease(freq, cycleStartTime);
  }
  osc.freq(midi2note(note));

  this.interval = max(cycleStartTime + 10, 0.01); // Cannot have interval of exactly 0
}
