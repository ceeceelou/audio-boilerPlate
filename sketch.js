let sound, amp, cnv;
let imgSelecter;
let smoothedLevel=0;

function preload() {
  //replace this sound with something we can distribute
  sound = loadSound('sounds/champagnecoast.mp3');
  
  img = loadImage('images/coconut.png');
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('p5-stuff')
  cnv.mousePressed(playSound);
  imgSelecter = document.querySelector('#imgStuff');
  textAlign(CENTER);
  fill(255,58,93);
  colorMode(HSB,360,100,100);
  amp = new p5.Amplitude();
  sound.connect(amp);
  //select DOM element using p5's select function
  //let imgSelector = Document.querySelector('#imgStuff');
  describe('The color of the background changes based on the amplitude of the sound.');
}
 
function playSound() {
  userStartAudio();
  sound.play();
}

function drawSpikes() {
  let numSpikes = 20; 
  let baseRadius = 90; // inner circle size
  let spikeLength = map(smoothedLevel, 0, 0.2, 20, 400); // spikes grow with sound

  beginShape();
  for (let i = 0; i < numSpikes * 2; i++) {
    let angle = map(i, 0, numSpikes * 2, 0, TWO_PI);
    
    let r = (i % 2 === 0) ? baseRadius + spikeLength : baseRadius;
    let x = cos(angle) * r;
    let y = sin(angle) * r;
    vertex(x, y);
  }
  endShape(CLOSE);
}
 
function draw() {
  background(255,58,93);
  let hue=(255,58,93);
  let brightness=map(smoothedLevel,0,0.2,40,80);
  background(hue,80,brightness);


  let level = amp.getLevel();
  smoothedLevel=lerp(smoothedLevel,level,0.3);
  let mappedLevel = map(smoothedLevel, 0, 0.2, 0, 1);

  translate(width / 2, height / 2);

  fill(25, 75, 100); 
  noStroke();
  drawSpikes();

  // Rotate slow at first and speed up based on amplitude
  let angle = frameCount * 0.005 + smoothedLevel * 0.3;
  rotate(angle);

  // Scale/pulse with the beat
  let scaleFactor = map(smoothedLevel, 0, 1, 0.8, 1.4);
  scale(scaleFactor);

  // Swirl offset using sine waves
  let swirX = sin(frameCount * 0.03) * smoothedLevel * 40;
  let swirY = cos(frameCount * 0.02) * smoothedLevel * 40;

  // Draw the image centered
  imageMode(CENTER);
  image(img, swirX, swirY, 300, 300);

  // Kaleidoscope: draw a second mirrored copy
  scale(-1, 1);
  image(img, -swirX, swirY, 300, 300);

  
}