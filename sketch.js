var roun;
var r;
var t;
var counter = 0;
var tracking;

//dat.GUI controls

var gui = new dat.GUI();

var obj = {
    size: 150,
    amount: 200,
    speed: 10,
    shape: 150,
    trails: 3
};

//dat.gui interface

gui.add(obj, "size").min(1).max(500);

gui.add(obj, "amount").min(1).max(400);

gui.add(obj, "speed").min(1).max(20);

gui.add(obj, "shape").min(1).max(300);

gui.add(obj, "trails").min(2).max(4);

//p5 draw 

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    colorMode(HSB, 1);

}

//color tracker

var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);

colors.on('track', function(event) {
    if (event.data.length === 0) {// No colors were detected in this frame.
    } else {
        event.data.forEach(function(rect) {
            console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
        });
    }
});

tracking.track('#myVideo', colors);

window.onload = function() {
      var canvas = document.getElementById('myVideo');
      var context = canvas.getContext('2d');
      tracking.ColorTracker.registerColor('purple', function(r, g, b) {
        var dx = r - 120;
        var dy = g - 60;
        var dz = b - 210;
        if ((b - g) >= 100 && (r - g) >= 60) {
          return true;
        }
        return dx * dx + dy * dy + dz * dz < 3500;
      });
      var tracker = new tracking.ColorTracker(['yellow', 'purple']);
      tracker.setMinDimension(5);
      tracking.track('#video', tracker);
      tracker.on('track', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach(function(rect) {
          if (rect.color === 'custom') {
            rect.color = tracker.customColor;
          }
          context.strokeStyle = rect.color;
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.font = '11px Helvetica';
          context.fillStyle = "#fff";
          context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
          context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        });
      });
      initGUIControllers(tracker);
    };

function gif() {

    push();

    blendMode(ADD);

    for (var i = 0; i < obj.amount; i++) {
        for (var n = 0; n < obj.trails; n++) {
            fill(i / obj.trails, 1, 20 / obj.trails);
            stroke(i / obj.amount, 1, n / obj.trails);

            push();

            roun = TWO_PI * i / obj.amount;
            rotate(-roun);
            r = obj.shape * sin(obj.shape / 2 * roun + TWO_PI * t + .1 * n);

            beginShape();
            vertex(r, obj.shape);
            vertex((windowWidth / 2), (windowHeight / 1.15));
            endShape(CLOSE);

            pop();
        }
    }
    pop();
}

function draw() {
    t = counter * obj.speed * 0.0000005;
    counter += 1000;
    translate(width / 2, height / 2);
    background(0);
    gif();

}
