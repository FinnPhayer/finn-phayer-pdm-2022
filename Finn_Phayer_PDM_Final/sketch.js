let serialPDM;
let portName = 'COM3';
let sensors;
let ledOn = false;
let topCheck = 0;
let bottomCheck = 0;
let rightCheck = 0;
let leftCheck = 0;
let rotations = 0;
let rotationSpeed = 0;
let recentRotationTime = 0;
let startingRotations;
let startTime;
let measuringSpeed = false;
let inARotation = 0;
let atRest = true;
let rotationAmount = 0;
let wind = [];
let petals = [];
let randomWind = [];
let buttonPressed = false;
let stemCount = 0;

//sound setup
let playingSound = false;
const sounds = new Tone.ToneAudioBuffers({
  'windmillsound' : 'media/windmillsound.mp3'
})

const player = new Tone.Player().toDestination();



function preload(){
  windmillfan = loadImage("media/windmillfan.png");
  windmillbase = loadImage("media/windmillbase.png");
  daffodilpetal = loadImage("media/daffodilpetal.png");
  daffodilstem = loadImage("media/daffodilstem.png");
}
function setup() {
  // sounds.player('windmillsound').toDestination();
    // Setup the serial port for communication
  serialPDM = new PDMSerial(portName);
  console.log(serialPDM.inData);
  
    // Alias for the sensor Data . You can also just use serialPDM.sensorData...
  sensors = serialPDM.sensorData;
  
  createCanvas(600,600);
  background(0);
  resetSketch();
  
}

function playSound(sound){
  if (playingSound == false){
    playingSound = true;
    player.buffer = sounds.get(sound);
    player.start();
  }
}
function stopSound(sound){
  player.stop();
  playingSound = false;
}

function rotateCheck(){
  if (sensors.Y < 120 && sensors.X > 480 && sensors.X < 580){
    topCheck = 1;
    inARotation = 1;
  }
  if (sensors.Y > 880 && sensors.X > 480 && sensors.X < 580){
    bottomCheck = 1;
    inARotation = 1;
  }
  if (sensors.X > 880 && sensors.Y > 480 && sensors.Y < 580){
    rightCheck = 1;
    inARotation = 1;
  }
  if (sensors.X < 120 && sensors.Y > 480 && sensors.Y < 580){
    leftCheck = 1;
    inARotation = 1;
  }
  if (topCheck == 1 && bottomCheck == 1 && rightCheck == 1 && leftCheck == 1){
    rotations ++;
    topCheck = 0;
    bottomCheck = 0;
    rightCheck = 0;
    leftCheck = 0;
    inARotation = 0;
  }
  
  if (sensors.X > 460 && sensors.X < 550 && sensors.Y > 460 && sensors.Y < 550){
    atRest = true;
  } else{
    atRest = false;
  }
}

function calculateRotationSpeed(){
  if (inARotation == 1 && measuringSpeed == false){
    playSound('windmillsound');
    
    startTime = millis();
    startingRotations = rotations;
    measuringSpeed = true;
  }
  if (millis() - startTime > 2000){
    measuringSpeed = false;
    topCheck = 0;
    bottomCheck = 0;
    rightCheck = 0;
    leftCheck = 0;
    inARotation = 0;
  }
  if (inARotation == 0 && measuringSpeed == true){
    recentRotationTime = ((millis() - startTime))/1000;
    rotationSpeed = (rotationSpeed + 1/recentRotationTime) / 2;
    measuringSpeed = false;
  }
  if (atRest == true){
    rotationSpeed -= 0.01;
  }
  if (rotationSpeed <= 0){
    stopSound('windmillsound');
    rotationSpeed = 0;
  }
  rotationAmount = rotationAmount + (rotationSpeed * 2);
}

function resetSketch(){
  for(i = 0; i< 100; i++){
    randomWind[i] = new WindStreak(random(width),random(height),random(-2,2),0)
  }
  
  for(i = 0; i < 50; i++){
    wind[i] = new WindStreak(random(width),random(280,320),0,0);
  }
  for(i = 0; i < 20; i++){
    petals[i] = new Petal(random(295,315),random(305,320),0,0,random(1,4),random(230,250));
  }
  
  ledOn = false;
  rotationSpeed = 0;
}

function onStemCheck(){
  stemCount = 0;
  for(i =0; i< 20; i++){
    if (petals[i].onStem == false){
      stemCount = stemCount + 1;
    }
  }
  
  if (stemCount >= 20)
    ledOn = true;
}

function draw(){
  background(135,206,235);
  textSize(32);
  fill(135,206,235);
  // fill(0);
  text("Y: "+ sensors.Y, 10, 30);
  text("X: "+ sensors.X, 10, 60);
  text("button" + sensors.button, 10, 90);
  text("Rotations: " + rotations, 10, 120);
  text("top: " + topCheck +" right: " + rightCheck + " bottom: " + bottomCheck + " left: " + leftCheck, 10, 150);
  text("Recent Rotation Time: " + recentRotationTime,10, 180);
  text("Rotation Speed: " + rotationSpeed, 10, 210);
  if (sensors.button == 1){
    // buttonPressed();
  }
  // text("ledOn: " + ledOn, 10, 90);
  
  if (sensors.button == 1 && buttonPressed == false){
    resetSketch();
    buttonPressed = true;
  }
  if (sensors.button == 0){
    buttonPressed = false;
  }
  
  if (ledOn == false)
    serialPDM.transmit('led', 0);
  if (ledOn == true)
    serialPDM.transmit('led', 1);
  
  
  rotateCheck();
  calculateRotationSpeed();
  
  
  //Draw random wind
  
  for(i=0;i<100; i++){
    randomWind[i].draw();
    randomWind[i].randomMove();
  }
  
  //Draw wind
  for(i = 0; i< 50; i++){
    wind[i].draw();
    wind[i].move();
  }
  
  // grass
  fill('green');
  rect(0,399,width,200);
  
  image(daffodilstem,270,304,100,100);
  
  //Draw the petals
  for(i = 0; i< 20; i++){
    petals[i].draw();
    petals[i].move();
    petals[i].touchTimer();
    push();
    petals[i].rotate();
    pop();
  }
  
  //touching wind
  for(i = 0; i <20; i++){
    for(j = 0; j<50;j++){
      if(wind[j].xpos >= petals[i].xpos - 5 && wind[j].xpos < petals[i].xpos + 5 && wind[j].ypos >= petals[i].ypos - 5 && wind[j].ypos < petals[i].ypos + 5 && petals[i].touched == false && wind[j].xvel > 0){
        if(petals[i].onStem == false){
          petals[i].xvel = petals[i].xvel + wind[j].xvel/3;
          petals[i].yvel = -wind[j].xvel/2;
          petals[i].touchedTime = millis();
          petals[i].touched = true;
        } else if (petals[i].onStem == true){
          petals[i].wiggle();
          // petals[i].strength = petals[i].strength - wind[j].xvel;
          if (petals[i].strength <= rotationSpeed)
            petals[i].onStem = false;
        }
      }       
    }
  }
  
  //touching random wind
  for(i = 0; i <20; i++){
    for(j = 0; j<60;j++){
      if(randomWind[j].xpos >= petals[i].xpos - 15 && randomWind[j].xpos < petals[i].xpos + 15 && randomWind[j].ypos >= petals[i].ypos - 15 && randomWind[j].ypos < petals[i].ypos + 15 && petals[i].randomTouched == false && petals[i].touched == false){
        petals[i].xvel = petals[i].xvel + randomWind[j].xvel;
        petals[i].yvel = -randomWind[j].xvel/2;
        petals[i].randomTouchedTime = millis();
        petals[i].randomTouched = true;
      }       
    }
  }
  
  //temp windmill
  image(windmillbase,26,270,150,150);
  push();
  angleMode(DEGREES);
  translate(width/6, height/2);
  rotate(rotationAmount);
  imageMode(CENTER);
  image(windmillfan,0,0,150,150);
  pop();
  
  
  //check stem count
  onStemCheck();
  
}

class WindStreak{
  constructor(xpos,ypos,xvel,yvel){
    this.xpos = xpos;
    this.ypos = ypos;
    this.xvel = xvel;
    this.yvel = yvel;
  }
  draw(){
    noStroke();
    fill(135,206,235);
    ellipse(this.xpos,this.ypos,10,10);
  }
  move(){
    if (this.xpos > width){
      this.xpos = 100;
      this.ypos = 300;
    }
    this.ypos = this.ypos + this.yvel;
    this.xpos = this.xpos + this.xvel;
    this.xvel = random(rotationSpeed*3);
    this.yvel = random(-rotationSpeed, rotationSpeed);
  }
  randomMove(){
    if (this.xpos > width){
      this.xpos = 0;
      this.ypos = random(height);
      this.xvel = random(2);
    }
    if (this.xpos < 0){
      this.xpos = width;
      this.ypos = random(height);
      this.xvel = -random(2);
    }
    if (this.xvel < 0.5 && this.xvel > 0){
      this.xvel = random(-2,2);
    } else if (this.xvel > -0.5 && this.xvel < 0){
      this.xvel = random(-2,2);
    }
    this.ypos = this.ypos + this.yvel;
    this.xpos = this.xpos + this.xvel;
  }
  
}
class Petal{
  constructor(xpos, ypos, xvel, yvel, strength,color){
    this.xpos = xpos;
    this.ypos = ypos;
    this.xvel = xvel;
    this.yvel = yvel;
    this.strength = strength;
    this.color = color;
    this.touched = false;
    this.randomTouched = false;
    this.touchedTime = 0;
    this.randomTouchedTime = 0;
    this.onStem = true;
    this.rotation = 0;
  }
  draw(){
    push();
    translate(this.xpos,this.ypos);
    rotate(this.rotation);
    stroke(200)
    fill(this.color);
    image(daffodilpetal,0,0);
    // ellipse(0, 0, 15, 25);
    pop();
  }
  move(){
    this.yvel += 0.008;
    
    if (this.xvel > 0)
      this.xvel -= 0.01;
    
    if (this.xvel < 0)
      this.xvel += 0.01;
    
    if (this.yvel >= 0.5)
      this.yvel = 0.8;
    
    if (this.ypos >= height-10){
      this.ypos = height-10;
    }
    
    if (this.onStem == false){
      this.ypos = this.ypos + this.yvel;
      this.xpos = this.xpos + this.xvel;
    }
    if (this.ypos >= height-this.length)
      this.yvel = 0;
    
    if (this.xpos > width){
      this.xvel = this.xvel - 0.1;
    }
    
    if (this.xpos < 0){
      this.xvel = this.xvel + 0.1;
    }
    
    if (this.ypos < -20){
      this.ypos = -20;
    }
  }
  touchTimer(){
    if (millis() - this.touchedTime >= 1200){
      this.touched = false;
    }
    if (millis() - this.randomTouchedTime >= 1200){
      this.randomTouched = false;
    }
  }
  rotate(){
    if (this.onStem == false){
      if (this.xvel > 0){
        this.rotation = this.rotation + 1;
      } else if (this.xvel < 0){
        this.rotation = this.rotation - 1;
      } else if (this.vel == 0){
        this.rotation = this.rotation + random(-1,1);
      }
    }
  }
  wiggle(){
    this.rotation = this.rotation + random(-6,6);
  }
}
