
            //dat.GUI controls
            var No = 50, tr = 8;
            var roun, r, t;
            var speed = 1 / 10000;
            var counter = 0;

            //dat.gui interface

            function setup() {
                createCanvas(windowWidth, windowHeight);
                frameRate(10);
                colorMode(HSB, 1);

            }

            //color tracker

            function gif() {

                push();

                blendMode(ADD);

                for (var i = 0; i < No; i++) {
                    for (var n = 0; n < tr; n++) {
                        fill(i / tr, 1, 20 / tr);
                        stroke(i / No, 1, n / tr);

                        push();

                        roun = TWO_PI * i / No;
                        rotate(-roun);
                        r = faceX / 2 * sin(faceY / 2 * roun + TWO_PI * t + .1 * n);

                        beginShape();
                        vertex(r, 100);
                        vertex((windowWidth / 2), (windowHeight / 2));
                        endShape(CLOSE);

                        pop();
                    }
                }
                pop();
            }

            function draw() {
                t = counter * speed * 0.000005;
                counter += 1000;
                translate(width / 2, height / 2);
                background(0);
                gif();

            }

            var viewport = document.getElementById('viewport');
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            var faceX = 0;
            var faceY = 0;

            ;
            var tracker = new tracking.ObjectTracker('face');

            tracker.setInitialScale(4);
            tracker.setStepSize(2);
            tracking.track('#video', tracker, {
                camera: true
            });
            tracker.on('track', function(event) {
                var maxRectArea = 0;
                var maxRect;
                event.data.forEach(function(rect) {
                    if (rect.width * rect.height > maxRectArea) {
                        maxRectArea = rect.width * rect.height;
                        maxRect = rect;
                    }
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.strokeStyle = 'magenta';
                    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                    context.font = '11px Helvetica';
                    context.fillStyle = "#fff";
                    context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                    context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
                });
                if (maxRectArea > 0) {
                    var rectCenterX = maxRect.x + (maxRect.width / 2);
                    var rectCenterY = maxRect.y + (maxRect.height / 2);
                    faceX = (rectCenterX - 160) * (window.innerWidth / 320) * 50;
                    faceY = (rectCenterY - 120) * (window.innerHeight / 240) * 50;
                }
            });