let character = [];
let count = 10;
let startTime;
let gameState = 'wait';
let squishCounter = 0;
let maxSpeed = 15;

function preload(){
  spriteSheet = loadImage("BugSprite.png");
  squishedBug = loadImage("BugSquished.png");
}

function setup() {
  createCanvas(800, 800);
  imageMode(CENTER);
  character = new Character(spriteSheet, 0, 300);

  for ( i = 0; i < count; i++){
    character[i] = new Character(spriteSheet,
    random(100,700),random(100,700),random(squishCounter/2 + 1, squishCounter + 5), random([-1,1]), random([0,1]));
  }

}

function timer(){
  return int((millis() - startTime)/1000)
}

function mousePressed(){
  let dmin = -1;
  let character_id = -1;


  for(i = 0; i < count; i++){
    let d = character[i].squishCheck();
    if (d != -1){
      if (dmin == -1 || d < dmin){
        dmin = d;
        character_id = i;
      }
    }
  }

  if (character_id != -1){
    character[character_id].squish();
  }
}

function draw() {
  background(255,255,255);
  if (gameState == 'wait'){
    textSize(30);
    text("Press any key to start", 200, 400);
    if (mouseIsPressed){
      startTime = millis();
      gameState = 'playing';
    }
  }
  else if (gameState == 'playing'){
    let time = timer();
    let totalTime = 30;
    if (time % 5 == 0){
      count = count;
    }
    for(i = 0; i < count; i++){
       character[i].draw();
    }
    text("Time: " + (totalTime - time), 10, 30);
    text("Bugs Squished: " + squishCounter, 200, 30);
    if (time >= totalTime){
      gameState = 'end'
    }
  }
  else if (gameState == 'end'){
    text("Final Score: " + squishCounter, 150, 300);
    text("Press any key to restart", 200 ,400);

    if (mouseIsPressed){
      startTime = millis();
      gameState = 'playing';
      squishCounter = 6;
      for(i = 0; i < count; i++){
        character[i].respawn();
      }
      squishCounter = 0;
    }
  }
}

class Character{
  constructor(spriteSheet,x,y,speed, move, vertical){
    this.spriteSheet = spriteSheet;
    this.x = x; 
    this.y = y;
    this.move = move;
    this.facing = move;
    this.speed = speed;
    this.squished = false;
    this.spriteFrame = 0;
    this.vertical = vertical;
    this.degrees = 90;
  }

  animate(){
    let sx, sy;
    if (this.move == 0){
      if (this.squished){
        // print("beep boop");
        // image(squishedBug,this.x,this.y);
      } else {
        // standing still
        sx = 0;
        sy = 0;
      }
    }
    else{
      //walking
      sx = this.spriteFrame % 2;
      sy = 0;
    }
    return [sx, sy];
  }

  draw(){
    push();
    translate(this.x, this.y);
    scale(this.facing, 1);
    rotate(this.vertical * this.degrees);

    //draw sprite frame
    let[sx, sy] = this.animate();
    image(this.spriteSheet, 0, 0, 100, 100, 80 * sx, 80 * sy , 80, 80);

    // duration of each sprite
    if (frameCount % 5 == 0){
      this.spriteFrame += 1;
    }

    // moving character
    if (this.vertical == 0){
      this.x += this.speed * this.move;
    } else if (this.vertical == 1){
      this.y += this.speed * this.move;
    }

    // turn around
    if (this.x < 0){
      this.move = 1;
      this.facing = 1;
    }
    if (this.x > width){
      this.move = -1;
      this.facing = -1;
    }
    if (this.y < 0){
      this.move = 1;
      this.facing = 1;
    }
    if (this.y > height){
      this.move = -1;
      this.facing = -1;
    }
    pop();
  }

  go(direction){
    this.move = direction;
    this.facing = direction;
    this.sx = 3;
  }

  stop(){
    this.move = 0;
  }

  squishCheck(){
    let d = -1;
    if (mouseX > this.x -40 && mouseX < this.x + 40 &&
      mouseY > this.y - 40 && mouseY < this.y+40){
        d = dist(mouseX, mouseY, this.x, this.y)
      }
    return d;
  }

  squish(){
    image(squishedBug,pmouseX,pmouseY);
    this.stop();
    squishCounter += 1;
    this.squished = true;
    this.respawn();
  }

  respawn(){
    if(this.vertical == 0){
      if (this.facing == 1){
        this.x = -100
        this.y = random(100,700);
      } else if (this.facing == -1){
        this.x = width + 100;
        this.y = random(100,700);
      }  
    }else if (this.vertical == 1){
      if (this.facing == 1){
        this.y = -100;
        this.x = random(100,700);
      } else if (this.facing == -1){
        this.y = height + 100;
        this.x = random(100,700);
      }
    }
    this.go(this.facing);
    this.squished = false;
    if (squishCounter/2 <= maxSpeed){
      this.speed = random(2,squishCounter/2);
    } else {
      this.speed = random(2, maxSpeed);
    }
   }
}