let reverbSlider = new Nexus.Slider('#reverbSlider');
let delaySlider = new Nexus.Slider('#delaySlider',{
  'min': 0,
  'max': 1,
  'step': .05
});
let delayFeedbackSlider = new Nexus.Slider('#delayFeedbackSlider',{
  'min': 0,
  'max': .99,
  'step': .05
});

const synth = new Tone.Synth();
const reverb = new Tone.JCReverb(0.4).toDestination();
const delay = new Tone.FeedbackDelay(.1, 0.5).toDestination();

synth.connect(reverb);
synth.connect(delay);
let notes = {
  'q': 'C4',
  '2': 'C#4',
  'w': 'D4',
  '3': 'D#4',
  'e': 'E4',
  'r': 'F4',
  '5': 'F#4',
  't': 'G4',
  '6': 'G#4',
  'y': 'A4',
  '7': 'A#4',
  'u': 'B4',
  'i': 'C5',
  '9': 'C#5',
  'o': 'D5',
  '0': 'D#5',
  'p': 'E5',
  '[': 'F5',
  '=': 'F#5',
  ']': 'G5'

}

function setup() {
  createCanvas(432, 400);
  reverbSlider.on('change', (v)=>{
    reverb.roomSize.value = v;
  })
  delaySlider.on('change', (v)=>{
    delay.delayTime.value = v;
  })
  delayFeedbackSlider.on('change', (v)=>{
    delay.feedback.value = v;
  })
}

function draw() {
  background(222,184,135);

  textAlign(CENTER,CENTER);
  textSize(15);

  fill(0);
  text('Reverb', 200, 50);
  text('Delay Time', 200, 125);
  text('Delay Feedback', 200, 200);


  fill(255);
  for(var i = 0; i < 12; i++){
    rect(36*i,340,36,60);
  }

  fill(0);
  rect(26,340,24,30);
  rect(62,340,24,30);
  rect(134,340,24,30);
  rect(170,340,24,30);
  rect(206,340,24,30);
  rect(278,340,24,30);
  rect(314,340,24,30);
  rect(386,340,24,30);
  
  text('Q',18,390);
  text('W',54,390);
  text('E',90,390);
  text('R',126,390);
  text('T',162,390);
  text('Y',198,390);
  text('U',234,390);
  text('I',270,390);
  text('O',306,390);
  text('P',342,390);
  text('[',378,390);
  text(']',414,390);
  fill(255);
  text('2',36,360);
  text('3',72,360);
  text('5',144,360);
  text('6',180,360);
  text('7',216,360);
  text('9',288,360);
  text('0',324,360);
  text('=',396,360);
}

function keyPressed() {
  let toPlay = notes[key];
  synth.triggerAttackRelease(toPlay,"8n");
}
