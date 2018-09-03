var cPoints = [];
var nPoints = 10;
var r = 150;
var theta;
var piOffset;
var piSlices;

function makeLine(a, b) {
  line(a.x, a.y, b.x, b.y);
}

function rotatePoints() {
  for(var i = 0; i < cPoints.length; i++) {
    var newX = cPoints[i].x * cos(theta) - cPoints[i].y * sin(theta);
    var newY = cPoints[i].y * cos(theta) + cPoints[i].x * sin(theta);
    cPoints[i].x = newX;
    cPoints[i].y = newY;
  }
  // theta += 0.001;
}

function drawCircleAndPoints() {
  strokeWeight(1);
  ellipse(0, 0, r * 2, r * 2);
  strokeWeight(8);
  // for(var i = 0; i < cPoints.length; i++) {
  //   point(cPoints[i].x, cPoints[i].y);
  // }
}

function drawDividingLines() {
  strokeWeight(1);
  for (var i = 0; i < nPoints / 2; i++) {
    makeLine(cPoints[i], cPoints[i + 5]);
  }
}

function drawFirstStar() {
  strokeWeight(1);
  for (var i = 0; i < nPoints - 1; i += 2) {
    if (i + 4 >= nPoints) {
      makeLine(cPoints[i], cPoints[(i + 4) % nPoints])
    } else {
  		makeLine(cPoints[i], cPoints[i + 4]);
    }
  }
}

function drawSecondStar() {
  strokeWeight(1);
	for (var i = 1; i < nPoints; i += 2) {
    if (i + 4 >= nPoints) {
      makeLine(cPoints[i], cPoints[i + 4 - 10])
    } else {
  		makeLine(cPoints[i], cPoints[i + 4]);
    }
  }
}

function drawTenPointStar() {
  strokeWeight(1);
	for (var i = 0; i < nPoints; i ++) {
    if (i + 3 >= nPoints) {
      makeLine(cPoints[i], cPoints[i + 3 - 10])
    } else {
  		makeLine(cPoints[i], cPoints[i + 3]);
    }
  }
}
  

function drawIt() {
  if (!theStar) {
    return;
  }
  if (theStar.step >= 0) {
    stroke(0);
    drawCircleAndPoints();
  }
  if (theStar.step >= 1) {
    stroke(200);
    drawDividingLines();
  }
  if (theStar.step >= 2) {
    stroke('tomato');
    drawFirstStar();
  }
  if (theStar.step >= 3) {
    stroke('lime');
    drawSecondStar();
  }
  if (theStar.step >= 4) {
    stroke(0);
    drawTenPointStar();
  }
  if (theStar.step >= 5) {
    makeFinalLines();
  }
}

function makeFinalLines() {
  for (let i = 0; i < nPoints; i++) {
  const xy1 = lineIntersect(cPoints[(i + 2 < nPoints) ? i + 2 : (i + 2) % nPoints], cPoints[(i + 8 < nPoints) ? i + 8 : (i + 8) % nPoints], cPoints[(i + 1 < nPoints) ? i + 1 : (i + 1) % nPoints], cPoints[(i + 4 < nPoints) ? i + 4 : (i + 4) % nPoints]);
  const xy2 = lineIntersect(cPoints[(i + 2 < nPoints) ? i + 2 : (i + 2) % nPoints], cPoints[(i + 8 < nPoints) ? i + 8 : (i + 8) % nPoints], cPoints[(i + 3 < nPoints) ? i + 3 : (i + 3) % nPoints], cPoints[(i + 9 < nPoints) ? i + 9 : (i + 9) % nPoints]);
  const xy3 = lineIntersect(cPoints[i], cPoints[(i + 7 < nPoints) ? i + 7 : (i + 7) % nPoints], cPoints[(i + 3 < nPoints) ? i + 3 : (i + 3) % nPoints], cPoints[(i + 9 < nPoints) ? i + 9 : (i + 9) % nPoints]);
  const xy4 = cPoints[i];
  const xy5 = lineIntersect(cPoints[i], cPoints[(i + 3 < nPoints) ? i + 3 : (i + 3) % nPoints], cPoints[(i + 1 < nPoints) ? i + 1 : (i + 1) % nPoints], cPoints[(i + 7 < nPoints) ? i + 7 : (i + 7) % nPoints]);
  // strokeWeight(8);
  // stroke('tomato');
  // point(xy1.x, xy1.y);
  // point(xy2.x, xy2.y);
  // point(xy3.x, xy3.y);
  // point(xy4.x, xy4.y);
  // point(xy5.x, xy5.y);
  strokeWeight(3);
  stroke('blueviolet');
  beginShape();
  vertex(xy1.x, xy1.y);
  vertex(xy2.x, xy2.y);
  vertex(xy3.x, xy3.y);
  vertex(xy4.x, xy4.y);
  vertex(xy5.x, xy5.y);
  endShape();
  }
}

function lineIntersect(p0, p1, p2, p3) {
		var A1 = p1.y - p0.y,
			B1 = p0.x - p1.x,
			C1 = A1 * p0.x + B1 * p0.y,
			A2 = p3.y - p2.y,
			B2 = p2.x - p3.x,
			C2 = A2 * p2.x + B2 * p2.y,
			denominator = A1 * B2 - A2 * B1;

		return {
			x: (B2 * C1 - B1 * C2) / denominator,
			y: (A1 * C2 - A2 * C1) / denominator
		}
	}

function setup() {
  r = (window.innerWidth < window.innerHeight) ? window.innerWidth / 2.3 : window.innerHeight / 2.3;
  theta = 0.5 * PI / 180;
  piOffset = -HALF_PI;
  piSlices = TWO_PI / nPoints;
  createCanvas(window.innerWidth, window.innerHeight);
  // background(0);
  // stroke(255);
  // strokeWeight(1);
  noFill();
  for (var i = piOffset; i < TWO_PI + piOffset; i += piSlices) {
    x = cos(i) * r;
    y = sin(i) * r;
    // point(x, y);
    cPoints.push(createVector(x, y));
  }
  console.log(starOne);
  // translate(width / 2, height / 2);
  // drawIt();
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  drawIt();
  rotatePoints();
}

var starOne = function() {
  this.step = 6;
};

var theStar;

window.onload = function() {
  theStar = new starOne();
  var gui = new dat.GUI({
    closeOnTop: true,
    closed: true,
  });
  gui.add(theStar, 'step', 0, 6);
};