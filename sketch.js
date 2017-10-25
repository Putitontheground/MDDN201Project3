var roun, r, t;
var counter = 0;

//var song;



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
    createCanvas(windowWidth, windowHeight/1.15);
    frameRate(60);
    colorMode(HSB, 1);
   

    //song = loadSound("assets/song.mp3");
    //song.setVolume(0.5);
    //song.play();
}



function gif() {

    var prediction = webgazer.getCurrentPrediction();

            if (prediction) {
        var x = prediction.x;
        var y = prediction.y;
}

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
            vertex(x*r/2, y/2);
            vertex((windowWidth / 2), (windowHeight/1.15));
            endShape(CLOSE);

            pop();
        }
    }
    pop();
}



window.onload = function() {
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
         //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
         //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .begin()
        .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */

    var width = 220;
    var height = 140;
    var topDist = '0px';
    var leftDist = '0px';
    
    var setup = function() {
        var video = document.getElementById('webgazerVideoFeed');
        video.style.display = 'block';
        video.style.position = 'absolute';
        video.style.top = topDist;
        video.style.left = leftDist;
        video.width = width;
        video.height = height;
        video.style.margin = '0px';

        webgazer.params.imgWidth = width;
        webgazer.params.imgHeight = height;

        var overlay = document.createElement('canvas');
        overlay.id = 'overlay';
        overlay.style.position = 'absolute';
        overlay.width = width;
        overlay.height = height;
        overlay.style.top = topDist;
        overlay.style.left = leftDist;
        overlay.style.margin = '0px';

        document.body.appendChild(overlay);

        var cl = webgazer.getTracker().clm;

        function drawLoop() {
            requestAnimFrame(drawLoop);
            overlay.getContext('2d').clearRect(0,0,width,height);
            if (cl.getCurrentPosition()) {
                cl.draw(overlay);
            }
        }
        drawLoop();
    };

    function checkIfReady() {
        if (webgazer.isReady()) {
            setup();
        } else {
            setTimeout(checkIfReady, 100);
        }
    }
    setTimeout(checkIfReady,100);
};


window.onbeforeunload = function() {
    //webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
    window.localStorage.clear(); //Comment out if you want to save data across different sessions 
}

function draw() {
    t = counter * obj.speed * 0.0000005;
    counter += 1000;
    translate(width/2,height/2);
    background(0);
    gif();

}

//function loaded() {
 // song.play();
//}





/*@inproceedings{papoutsaki2016webgazer,
author = {Alexandra Papoutsaki and Patsorn Sangkloy and James Laskey and Nediyana Daskalova and Jeff Huang and James Hays},
title = {WebGazer: Scalable Webcam Eye Tracking Using User Interactions},
booktitle = {Proceedings of the 25th International Joint Conference on Artificial Intelligence (IJCAI)},
pages = {3839--3845},
year = {2016},
organization={AAAI}
}*/


