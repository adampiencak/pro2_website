let digitalFont;
let video;
let detection = false;
let poseNet;
let numPeople = 0;
let batteryPercentage = 0;



function preload() {
  digitalFont = loadFont("SFPRODISPLAYBOLD.OTF");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video);
  poseNet.on("pose", function (poses) {
    if (poses.length > 0) {
      detection = true;
      numPeople = poses.length;
    } else {
        detection = false;
        numPeople = 0;
    }
    energyBar();
  });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight); // Resize canvas when window is resized
  }

function energyBar() {
  if (numPeople == 1) {
    batteryPercentage = 20;
  } else if (numPeople == 2) {
      batteryPercentage = 40;
  } else if (numPeople == 3) {
      batteryPercentage = 60;
  } else if (numPeople == 4) {
      batteryPercentage = 80;
  } else {
      batteryPercentage = 100;
  }
}

function lightning() {
    fill(0);
    triangle((width/2)-520, (height/2)+130, (width/2)-520, (height/2)+150, (width/2)-530, (height/2)+150);
    triangle((width/2)-520, (height/2)+140, (width/2)-510, (height/2)+140, (width/2)-520, (height/2)+160);
}

function draw() {
  background("#306DB5");

  if (!detection) {
    textFont(digitalFont);
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Battery low", width / 2, height / 2);
  } else {
      let h = hour();
      let m = minute();
      let s = second();
      let d = day();
      let monthIndex = month();
      let currentYear = year();
      let time = nf(h, 2) + ":" + nf(m, 2)
      let date = nf(d, 2) + "/" + nf(monthIndex, 2);

      textFont(digitalFont);
      fill(255);
      textSize(250);
      text(time, (width/2)-200, (height/2)-250);

      textSize(80);
      text(date, (width/2)+320, (height/2)-290);

      text(currentYear, (width/2)+335, (height/2)-170);
    
      textSize(40);
      text("Energy level: " + batteryPercentage + "%", (width/2)-310, (height/2)+350);

    if (batteryPercentage == 20) {
      lightning();
      rect((width/2)+465, (height/2)+98, 45, 120, 9);
      noFill();
      strokeWeight(18);
      rect((width/2)-475, (height/2), 900, 300, 30)
      fill(255, 0, 0);
      rect((width/2)-475, (height/2), 180, 300, 30);
    } else if (batteryPercentage == 40) {
        lightning();
        rect((width/2)+465, (height/2)+98, 45, 120, 9);
        noFill();
        strokeWeight(18);
        rect((width/2)-475, (height/2), 900, 300, 30)
        fill("#FF7A00");
        rect((width/2)-475, (height/2), 180, 300, 30);
        rect((width/2)-295, (height/2), 180, 300, 30);
    } else if (batteryPercentage == 60) {
        lightning();
        rect((width/2)+465, (height/2)+98, 45, 120, 9);
        noFill();
        strokeWeight(18);
        rect((width/2)-475, (height/2), 900, 300, 30)
        fill("#FFE500");
        rect((width/2)-475, (height/2), 180, 300, 30);
        rect((width/2)-295, (height/2), 180, 300, 30);
        rect((width/2)-115, (height/2), 180, 300, 30);
    } else if (batteryPercentage == 80) {
        lightning();
        rect((width/2)+465, (height/2)+98, 45, 120, 9);
        noFill();
        strokeWeight(18);
        rect((width/2)-475, (height/2), 900, 300, 30)
        fill("#ADFF00");
        rect((width/2)-475, (height/2), 180, 300, 30);
        rect((width/2)-295, (height/2), 180, 300, 30);
        rect((width/2)-115, (height/2), 180, 300, 30);
        rect((width/2)+65, (height/2), 180, 300, 30);
    } else {
        lightning();
        rect((width/2)+465, (height/2)+98, 45, 120, 9);
        noFill();
        strokeWeight(18);
        rect((width/2)-475, (height/2), 900, 300, 30)
        fill("#00FF0A");
        rect((width/2)-475, (height/2), 180, 300, 30);
        rect((width/2)-295, (height/2), 180, 300, 30);
        rect((width/2)-115, (height/2), 180, 300, 30);
        rect((width/2)+65, (height/2), 180, 300, 30);
        rect((width/2)+245, (height/2), 180, 300, 30);
    }
  }
}
