let vid;
let size = 45;
let step = 40;
let noiseScale = 0.004;
let speed = 0.01;

let dots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  vid = createVideo("abstract.mp4");
  vid.size(width, height);
  vid.speed(0.1);
  vid.volume(0);
  vid.loop();
  vid.hide(); // hides the html video loader
  colorMode(HSB, 255);

  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      //let c = img.get(x, y);
      dots.push(new dot(x, y, size));
    }
  }
}

function draw() {
  noiseDetail(8, 0.35);
  background(255);
  //let img = vid.get();

  //image(img, 0, 0, 1920, 1080);
  for (let i = 0; i < dots.length; i++) {
    let x = (i % width) * step;
    let y = (i / width) * step;
    
    let amp = map(
      noise(x * noiseScale, y * noiseScale, frameCount * speed),
      0,
      1,
      0,
      size * 1.6
    );
    dots[i].draw(amp)
  }
}

class dot {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw(value) {
    noFill();
    stroke(23, 255, 255);
    strokeWeight(5)
    circle(this.x, this.y, this.size-5);
    fill(23, 255, 255);

    noStroke();
    circle(this.x, this.y, this.size - value);
  }
}
