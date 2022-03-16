/*jshint esversion: 6 */

var N = 7;
var H = 200;
var K;
var G;
var arr = [];
var O = 150;

var arrMax = 0;
var loop = 0;

var arith = 0;
var E;
var stanAb = 0;

var area;
var B_W;

var btnPlus, btnMinus;

var drag = false;

function setup() {
  createCanvas(1000, 600);
  frameRate(200);

  area = width - 50 * 2;

  init();

  btnPlus = new Button(width / 2 - 70 - 50, height - 100 - 20, 100, 100, "+", 0, 20);
  btnMinus = new Button(width / 2 + 70 - 50, height - 100 - 20, 100, 100, "–", 0, 15);
  btnDrag = new Button(width - 20, height - H - 30 - O, 30, 60, "", 0, 0);
}

function init() {
  K = 2 * N - 1;
  G = area / K / 4;
  B_W = (area - (K - 1) * G) / K;

  E = (N * 2 + 1) / 2;
  stanAb = 0;
  arr = [];
  loop = 0;

  for(let i = 0; i < K; i++) {
    arr.push(0); 
  }
}

function draw() {
  background(0);

  let x1;
  let x2;
  for(let i = 0; i < 100; i++) {
    let x1 = floor(random(0, N));
    let x2 = floor(random(0, N));

    arr[x1 + x2]++;
    loop++;
  }

  arith = 0;
  arrMax = 0;
  for(let i = 0; i < arr.length; i++) {
    if(arrMax < arr[i])
      arrMax = arr[i];
    arith += arr[i] * i;
  }
  arith /= loop;
  stanAb += sq(x1 + x2 -arith);
  
  // DRAW LINES ###################################################################################
  stroke(40);
  for(let i = 0.2; i < 1.2; i += 0.2) {
    let r = height - O - btnDrag.y - btnDrag.h / 2;
    if(i >= 1) {
      stroke(60);
    }
    line(0, height - O - r * i, width, height - O - r * i);
    textSize(10);
    fill(255);
    textStyle(ITALIC);
    text(round(i * 100) / 100, 10, height - O - r * i - 5);
    textStyle(NORMAL);
  }
  
  stroke(255);

  let mouseOver = false;
  let fx = 0;
  let hx = 0;

  for(let i = 0; i < arr.length; i++) {

    let currentBlockX = 50 + i * B_W + i * G;
    let currentBlockY = height - O;
    let currentBlockW = B_W;
    let currentBlockH = -map(arr[i], 0, arrMax, 0, H);

    // CHECK MAX ##################################################################################
    if(arr[i] == arrMax) {
      stroke(255, 0, 0);
      fill(50, 0, 0, 255);
    } else {
      fill(0);
      strokeWeight(1);
      stroke(0, 255, 0, 100);
    }

    // CHECK MOUSE OVER ###########################################################################
    if(mouseX > currentBlockX && mouseX < currentBlockX + currentBlockW && mouseY < currentBlockY && mouseY > currentBlockY - abs(currentBlockH)) {
      mouseOver = true;
      noStroke();
      fill("#00a8ff");
      fx = round(arr[i] / loop * 100) / 100;
      hx = arr[i];
    }

    // BLOCKS #####################################################################################
    rect(currentBlockX, currentBlockY, currentBlockW, currentBlockH);
    
    // CURVES #####################################################################################
    strokeWeight(1);
    stroke(255);
    noFill();
    if(i < arr.length - 1) {
      let curvePoints = [];
      for(let o = i - 1; o < i + 3; o++) {
        let x = 50 + o * B_W + 0.5 * B_W + o * G;
        let y = -map(arr[o], 0, arrMax, 0, H);
        if(o < 0) {
          x = 0;
          y = 0;
        } else if(o > arr.length - 1) {
          y = 0;
        }
        curvePoints.push(x);
        curvePoints.push(y + height - O);
      }
      curve(curvePoints[0], curvePoints[1], curvePoints[2], curvePoints[3],
        curvePoints[4], curvePoints[5], curvePoints[6], curvePoints[7]);
    }
  }

  if(mouseOver) {
    fill(30, 180);
    noStroke();
    rect(mouseX, mouseY - 70, 100, 70, 5);
    textAlign(LEFT);
    textSize(15);
    stroke(255);
    fill(255);
    text("h(x) = " + hx, mouseX + 10, mouseY - 15);
    text("f(x) = " + fx, mouseX + 10, mouseY - 15 - 30);
    noFill();
  }

  stroke(255);
  fill(255);
  textSize(20);
  textAlign(RIGHT);
  text("W(" + N + ")", width / 2 - 150, height - 90);
  text("H(x) = " + loop, width / 2 - 150, height - 60);
  textAlign(LEFT);
  text("s = " + round(sqrt(stanAb / loop) * 100) / 100, width / 2 + 150, height - 90);
  text("E = " + round(E * 100) / 100, width / 2 + 150, height - 60);

  stroke(100);
  line(28, height - O, width - 28, height - O);

  btnPlus.draw();
  btnMinus.draw();
  btnDrag.draw();
}

function mouseClicked() {
  if(btnPlus.clicked()) {
    N++;
    init();
  }
  
  if(btnMinus.clicked()) {
    N = max(2, N - 1);
    init();
  }
}

function mouseReleased() {
  drag = false;
}

function mouseDragged() {
  if(btnDrag.clicked()) {
    drag = true;
  }
  if(drag) {
    btnDrag.y = constrain(mouseY - btnDrag.h / 2, 0, height - btnDrag.h - O);
    H = height - (btnDrag.y + btnDrag.h / 2 + O);
  }
}