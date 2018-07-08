var canvas = document.getElementById("canvas");
window.onresize = function() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  context.fillStyle = "#fff"
};

var context = canvas.getContext("2d");
var isStart = false;
var objectCount = 20;
var src = ['res/music-1-1.png', 'res/music-1-2.png', 'res/music-1-3.png', 'res/music-1-4.png', 'res/music-2-1.png', 'res/music-2-2.png', 'res/music-2-3.png', 'res/music-2-4.png', ];
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

function Circle() {
  this.size = Math.random() * 100 % 10 + 10;
  this.yOffset = Math.random() + 0.05;
  this.xOffset = Math.random() % 0.8;
  this.x = -this.size - 1;
  this.y = -this.size - 1;
  this.img = new Image();
  this.reset = function() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.offsetHeight + canvas.offsetHeight / 3 * Math.random();
    this.size = Math.random() * 100 % 10 + 10;
    this.yOffset = Math.random() + 0.1;
    this.img.src = getRandSrc();
    this.xOffset = Math.random() % 0.8
  };

  function getRandSrc() {
    return src[parseInt(Math.random() * 100) % src.length]
  }
  this.paint = function() {
    context.drawImage(this.img, this.x, this.y, this.size, this.size)
  };
  this.step = function() {
    if (this.y < -this.size || this.x < -this.size || this.x > canvas.width) {
        this.reset();
    }
    if (isStart || this.y + this.size < canvas.height) {
      this.y -= this.yOffset;
      this.x += -0.4 + this.xOffset;
    }


  }
}
var circles = [];

function createCircles() {
  for (var i = 0; i < objectCount; i++) {
    var circle = new Circle();
    circles.push(circle)
  }
}

function paintCircles() {
  for (var i = 0; i < circles.length; i++) {
    circles[i].paint()
  }
}

function startUp() {
  isStart = true;
}

function stopUp() {
  isStart = false;
}

function stepCircles() {
  for (var i = 0; i < circles.length; i++) {
    circles[i].step()
  }
}

function initUp() {
  for (var i = 0; i < src.length; i++) {
    new Image().src = src[i];
  }
  context.fillStyle = "#fff";
  createCircles();
  setInterval(function() {
    context.fillRect(0, 0, canvas.width, canvas.height);
    paintCircles();
    stepCircles()
  }, 10)
}
