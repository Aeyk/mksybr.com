
let osc, fft, gyroscope;

function setup() {

    var clickToStartDiv = createDiv("Click here to enable sound");
    clickToStartDiv.position(30, 30);

    
    userStartAudio().then(function() {
	clickToStartDiv.remove();
    });
    

    createCanvas(screen.width, screen.height/2);
    osc = new p5.SinOsc;
    osc.amp(0.5);

    
    fft = new p5.FFT;
    osc.start();
}



function draw() {
    background(255);

    let waveform = fft.waveform();
    beginShape();
    strokeWeight(1);
    stroke(63, 20, 0);
    for(let i = 0; i < waveform.length; i++) {
	let x = map(i, 0, waveform.length, 0, width);
	let y = map(waveform[i], -1, 1, height, 0);
	vertex(x, y);
    }
    endShape();

    let C0 = 16.34;
    let octave = 12;
    let f = map(mouseX, 0, width, C0*40, C0*800);
    osc.freq(f / C0);

    

    //let amp = map(mouseY, 0, height, 0.8, 0.2);
    //osc.amp(amp);
}
