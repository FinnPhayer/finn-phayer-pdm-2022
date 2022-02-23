let button;
let button2;
let button3;
let button4;

const sounds = new Tone.Players({
  'CtoF': 'media/CtoF.mp3',
  'SawC': 'media/SawC.mp3',
  'CtoFmaj': 'media/CtoFmaj.mp3',
  'CtoBbtoF': 'media/CtoBbtoF.mp3',
  'CtoEbtoBb': 'media/CtoEbtoBb.mp3'
})
const pitchShift = new Tone.PitchShift().toDestination();

sounds.player('SawC').connect(pitchShift);

function setup() {
  createCanvas(400, 650);
  background(220);
  let s = 'Click on the guitar neck to play sounds. Moving up and down will pitch shift the guitar accordingly. The buttons below offer some backing tracks.'
  textAlign(CENTER);
  text(s,175,300,200,300);

  button = createButton('C min to F maj');
  button.mousePressed(() => playSound('CtoF'));
  button2 = createButton('C maj to F maj');
  button2.mousePressed(() => playSound('CtoFmaj'));
  button3 = createButton('C to Bb to F');
  button3.mousePressed(() => playSound('CtoBbtoF'));
  button4 = createButton('Cmin to Eb to Bb');
  button4.mousePressed(()=> playSound('CtoEbtoBb'));
  sounds.player('CtoF').toDestination();
  sounds.player('CtoFmaj').toDestination();
  sounds.player('CtoBbtoF').toDestination();
  sounds.player('CtoEbtoBb').toDestination();
}

function draw() {
  fill(255);
  for(var i = 0; i < 13; i++){
    rect(0,i*50,100,50);
  }
  fill(0);
  ellipse(50,175,15,15);
  ellipse(50,275,15,15);
  ellipse(50,375,15,15);
  ellipse(50,475,15,15);
  ellipse(25,625,15,15);
  ellipse(75,625,15,15);

  if(mouseY >= 0 && mouseY < 49){
    pitchShift.pitch = 0;
  }else if(mouseY >= 50 && mouseY < 99){
    pitchShift.pitch = 1;
  }else if(mouseY >= 100 && mouseY < 149){
    pitchShift.pitch = 2;
  }else if(mouseY >= 150 && mouseY < 199){
    pitchShift.pitch = 3;
  }else if(mouseY >= 200 && mouseY < 249){
    pitchShift.pitch = 4;
  }else if(mouseY >= 250 && mouseY < 299){
    pitchShift.pitch = 5;
  }else if(mouseY >= 300 && mouseY < 349){
    pitchShift.pitch = 6;
  }else if(mouseY >=350 && mouseY < 399){
    pitchShift.pitch = 7;
  }else if(mouseY >=400 && mouseY < 449){
    pitchShift.pitch = 8;
  }else if(mouseY >=450 && mouseY < 499){
    pitchShift.pitch = 9;
  }else if(mouseY >=500 && mouseY < 549){
    pitchShift.pitch = 10;
  }else if(mouseY >=550 && mouseY < 599){
    pitchShift.pitch = 11;
  }else if(mouseY >=600 && mouseY <649){
    pitchShift.pitch = 12;
  }
}

function mousePressed(){
  if (mouseX < 100 && mouseY < height){
    sounds.player('SawC').start();
  }
}
function mouseReleased(){
  sounds.player('SawC').stop();
}

function playSound(sound){
  sounds.player(sound).start();
}

