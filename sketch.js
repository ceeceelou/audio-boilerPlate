let mic, delay, filter;

function setup() {
  describe('a sketch that accesses the user\'s microphone and connects it to a delay line.')
  let cnv = createCanvas(100, 100);
  cnv.parent('p5-stuff');
  cnv.mousePressed(startMic);
  background(220);
  
  mic = new p5.AudioIn();
  delay = new p5.Delay(0.74, 0.1);
  filter = new p5.Biquad(600, "bandpass");
  
  mic.disconnect();
  mic.connect(delay);
  delay.disconnect();
  delay.connect(filter);
  
  textAlign(CENTER);
  textWrap(WORD);
  textSize(10);
  text('click to open mic, watch out for feedback', 0, 20, 100);
}

function startMic() {
  mic.start();
}

function draw() {
  d = map(mouseX, 0, width, 0.1, 0.5);
  delay.delayTime(d);
}