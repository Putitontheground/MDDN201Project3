
var roun, r, t;
var counter = 0;
var mic;


//dat.GUI controls

var gui = new dat.GUI();

var obj = {
  size: 150,
  amount: 200,
  speed: 10,
  shape: 150,
  trails: 3
};

gui.add(obj, "size").min(1).max(500);

gui.add(obj, "amount").min(1).max(400);

gui.add(obj, "speed").min(1).max(20);

gui.add(obj, "shape").min(1).max(300);

gui.add(obj, "trails").min(2).max(4);

//p5 draw 

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  colorMode(HSB,1);
  mic = new p5.AudioIn();
  mic.start();


}

function gif(){
   var vol = mic.getLevel();
  console.log(vol);
  push();

    blendMode(ADD);
    
    
    for(var i=0; i<obj.amount; i++){
      for(var n=0; n<obj.trails; n++){
        fill(i/obj.trails,1,20/obj.trails);
        stroke(i/obj.amount,1,n/obj.trails);
       
        push();
        
        roun = TWO_PI*i/obj.amount;
        rotate(-roun);
        r = obj.shape*sin(obj.shape/2*roun + TWO_PI*t + .1*n);
     
        
          beginShape();
          vertex(r,obj.size*vol);
          vertex((windowWidth/2),(windowHeight));
          endShape(CLOSE);

        pop();
      }
    }
  pop();
}


function draw() {
  t = counter*obj.speed*0.0000005;
  translate(width/2,height/2);
  background(0);
  counter += 1000;
  gif();

}
