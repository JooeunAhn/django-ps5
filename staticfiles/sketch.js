var song, rms;

var x =[];
var y=[];
var x1=[];
var y1=[];
var smoothFactor;
var sum;
var scale_;
var numOfCircles;
var numOfCircles1;
var numOfCircles2;

function preload(){
  song = loadSound("assets/lifeincolor.mp3");
}

function setup(){
  createCanvas(900,900);
  // frameRate(30);
  song.loop();
  rms = new p5.Amplitude();
  rms.setInput(song);
  
  
  numOfCircles =60;
  numOfCircles1 =7;
  numOfCircles2 =30;
  scale_ = 5.0;
  sum=0;
  smoothFactor = 0.25;

  }
  
function draw(){
  background(0);
  fill(255);
  translate(width/2, height/2);
  
  sum += (rms.getLevel()-sum)*smoothFactor;
  var rmsScaled = sum*(height/2)*scale_*0.5;

  
  beginShape();
  for (var i=0; i<numOfCircles;i ++){
   if (i%2===0){
     x[i] = rmsScaled*cos(TWO_PI/numOfCircles*i);
     y[i]=rmsScaled*sin(TWO_PI/numOfCircles*i);
   }

   else{
     x[i] = rmsScaled*cos(TWO_PI/numOfCircles*i)*1.2;
     y[i]=  rmsScaled*sin(TWO_PI/numOfCircles*i)*1.2;
   }
   noFill();
   stroke(255);
   vertex(x[i],y[i]);
  }
  endShape();

  
  beginShape();
    for (var j=0; j<numOfCircles1;j++){
        x1[j] = rmsScaled*cos(TWO_PI/numOfCircles1*j)*0.5;
        y1[j]= rmsScaled*sin(TWO_PI/numOfCircles1*j)*0.5;
      fill(255);
      stroke(255);
      vertex(x1[j],y1[j]);
  
    }
    endShape();
    
    beginShape();
    for (var k=0; k<numOfCircles2;k ++){
       x[k] = rmsScaled*cos(TWO_PI/numOfCircles2*k)*1.5;
       y[k] = rmsScaled*sin(TWO_PI/numOfCircles2*k)*1.5;
       fill(255);
       ellipse(x[k], y[k],5,5);
     
    }
    endShape();
}