let pitch = 600;
let imgNum = 1;
let start;

let osc = new Tone.AMOscillator(pitch,'sine','sine').start()
let dist = new Tone.Distortion(0).toDestination();
let oscFilter = new Tone.Filter(800,'lowpass');
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.01,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(dist);
osc.connect(oscFilter);
oscFilter.connect(ampEnv);

function preload(){
  image1 = loadImage('patrickOne.PNG');
  image2 = loadImage('patrickTwo.PNG');
  image3 = loadImage('patrickThree.PNG');
}

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background(255);

  //Determine Images
  if (imgNum == 1){
    image(image1,0,0);
  }
  else if (imgNum == 2){
    image(image2,0,0);
  }
  else if (imgNum == 3){
    image(image3,0,0)
  }
  if(frameCount - start == 60){
    imgNum = 3;
  }
  if(frameCount - start == 120){
    imgNum = 1;
  }

  //distorting the splat
  if (frameCount - start == 50){
    dist.distortion = .6;
  }
}

function mousePressed() {
  start = frameCount;
  imgNum = 2;
  dist.distortion = 0;
  
  //slip
  Tone.start();
  osc.frequency.value = 600;
  osc.frequency.linearRampToValueAtTime(pitch+800, '+.2');
  ampEnv.triggerAttackRelease('.2');

  //splat
  osc.frequency.setValueAtTime(100,'+.6');
  ampEnv.triggerAttackRelease('.2', '+.6');
}