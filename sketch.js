
var No = 100, tr = 8;
var roun, r, t;
var speed = 1/10000;
var counter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  colorMode(HSB,1);
}

function gif(){
  
push();

  blendMode(ADD);
  
  
  for(var i=0; i<No; i++){
    for(var n=0; n<tr; n++){
      fill(i/tr,1,20/tr);
      stroke(i/No,1,n/tr);
     
      push();
      
      roun = TWO_PI*i/No;
      rotate(-roun);
      r = mouseX/2*sin(mouseY/2*roun + TWO_PI*t + .1*n);
      
      
        beginShape();
        vertex(r,100);
        vertex((windowWidth/2),(windowHeight/2));
        endShape(CLOSE);

      pop();
    }
  }
  pop();
}


function draw() {
  t = counter*speed*5000;
  translate(width/2,height/2);
  background(0);
  counter += 0.01;
  gif();
  }
}