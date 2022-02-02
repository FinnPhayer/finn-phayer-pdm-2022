function setup() {
  createCanvas(1000, 800);
  red = color(255,0,0);
  orange = color(255,150,0);
  yellow = color(255,255,0);
  green = color(0,255,0);
  cyan = color(0,255,255);
  blue = color(0,0,255);
  magenta = color(255,0,255);
  brown = color(180,80,50);
  white = color(255);
  black = color(0);
  c = black;
  sW = 4;
}


function draw() {
  stroke(0);
  strokeWeight(4);
  line(0,0,width,0);
  line(0,0,0,height);
  line(width,0,width,height);
  line(0,height,width,height);
  //Palette
  stroke(230);
  strokeWeight(2);
  fill(red);
  rect(0,0,30,30);
  fill(orange);
  rect(0,30,30,30);
  fill(yellow);
  rect(0,60,30,30);
  fill(green);
  rect(0,90,30,30);
  fill(cyan);
  rect(0,120,30,30);
  fill(blue);
  rect(0,150,30,30);
  fill(magenta);
  rect(0,180,30,30);
  fill(brown);
  rect(0,210,30,30);
  fill(white);
  rect(0,240,30,30);
  fill(black);
  rect(0,270,30,30);

  //x
  stroke(red);
  strokeWeight(4);
  line(975,5,995,25);
  line(995,5,975,25);

  //pen size
  stroke(black);
  strokeWeight(2);
  fill(255);
  rect(0,770,90,30);
  line(0,770,90,770);
  line(90,770,90,800);
  line(30,770,30,800);
  line(60,770,60,800);
  line(5,785,25,785);
  line(65,785,85,785);
  line(75,775,75,795);
  fill(c);
  ellipse(45,785,sW);

  //drawing
  if (mouseIsPressed){
    stroke(c);
    strokeWeight(sW);
    line(pmouseX,pmouseY,mouseX,mouseY);
  }
}

//clicking on buttons
function mouseClicked(){
  if(mouseX <= 30)
  {
    if(mouseY >= 0 && mouseY <= 30)
      c = red;
    if (mouseY >= 31 && mouseY <= 60)
      c = orange;
    if (mouseY >= 61 && mouseY <= 90)
      c = yellow;
    if (mouseY >= 91 && mouseY <= 120)
      c = green;
    if (mouseY >= 121 && mouseY <= 150)
      c = cyan;
    if (mouseY >= 151 && mouseY <= 180)
      c = blue;
    if (mouseY >= 181 && mouseY <= 210)
      c = magenta;
    if (mouseY >= 211 && mouseY <= 240)
      c = brown;
    if (mouseY >= 241 && mouseY <= 270)
      c = white;
    if (mouseY >= 271 && mouseY <= 300)
      c = black;
  }
  if (mouseX >= 975 && mouseY <= 25){
    background(255);
    sW = 4;
  }
  if (mouseX <= 30 && mouseY >= 770)
    sW = sW - 1;
  if (mouseX <= 90 && mouseX >= 60 && mouseY >=770)
    sW = sW + 1;
}