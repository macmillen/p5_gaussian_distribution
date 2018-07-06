/*jshint esversion: 6 */

var N = 2;
const H = 200;
var K;
var G;
var arr = [];

var arrMax = 0;
var loop = 0;

var arith = 0;
var E;
var stanAb = 0;

var area;
var B_W;

var btnPlus, btnMinus;

function setup() {
  createCanvas(1000, 500);
  frameRate(200);

  area = width - 50 * 2;

  init();

  btnPlus = new Button(70, 70, 60, 60, "+", 0, 20);
  btnMinus = new Button(70 + 60 + 35, 70, 60, 60, "–", 0, 15);
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

  let x1 = floor(random(0, N));
  let x2 = floor(random(0, N));
  arr[x1 + x2]++;
  loop++;

  arith = 0;
  arrMax = 0;
  for(let i = 0; i < arr.length; i++) {
    if(arrMax < arr[i])
      arrMax = arr[i];
    arith += arr[i] * i;
  }
  arith /= loop;
  stanAb += sq(x1 + x2 -arith);

  for(let i = 0; i < arr.length; i++) {
    noFill();
    if(arr[i] == arrMax) {
      stroke(255, 0, 0);
    }
    strokeWeight(0.4);
    rect(50 + i * B_W + i * G, height, B_W, -map(arr[i], 0, arrMax, 0, H));
    strokeWeight(1);
    stroke(255);

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
        curvePoints.push(y+500);
      }
      curve(curvePoints[0], curvePoints[1], curvePoints[2], curvePoints[3],
        curvePoints[4], curvePoints[5], curvePoints[6], curvePoints[7]);
    }
  }
  stroke(255);
  
  textSize(20);
  textAlign(LEFT);
  text("n = " + N, 400, 70);
  text("l = " + loop, 400, 100);
  text("s = " + round(sqrt(stanAb / loop) * 100) / 100, 400, 130);
  text("E = " + round(E * 100) / 100, 400, 160);
  for(let i = 0; i < arr.length; i++) {
    //text(round(arr[i] / loop * 100) / 100, 75 * i + 40, 400);
  }

  btnPlus.draw();
  btnMinus.draw();

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
