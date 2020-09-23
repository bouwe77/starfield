var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 700;

/*
For fullscreen:
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
*/

var numStars = 50;
var stars = [];
var size = 0.2;
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

var speed = 20; // speeds between 1 and 20 look good, faster than that doesn't.

const randomPlanetIndex = 123123; // disabled for now
for (var i = 0; i < numStars; i++) {
  stars[i] = new Star(i === randomPlanetIndex ? 20 : size);
}

function Star(size) {
  this.x = Math.random() * canvas.width; // x location
  this.y = Math.random() * canvas.height; // y location
  this.z = Math.random() * canvas.width; // z location (depth of star)

  this.move = function () {
    this.z = this.z - speed;
    if (this.z <= 0) {
      this.z = canvas.width;
    }
  };

  this.show = function () {
    var x, y, s;
    x = (this.x - centerX) * (canvas.width / this.z);
    x = x + centerX;

    y = (this.y - centerY) * (canvas.width / this.z);
    y = y + centerY;

    s = size * (canvas.width / this.z);

    c.beginPath();
    c.fillStyle = "white";
    c.arc(x, y, s, 0, Math.PI * 2);
    c.fill();
  };
}

function draw() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < numStars; i++) {
    stars[i].show();
    stars[i].move();
  }
}

function update() {
  draw();
  window.requestAnimationFrame(update);
}

update();
