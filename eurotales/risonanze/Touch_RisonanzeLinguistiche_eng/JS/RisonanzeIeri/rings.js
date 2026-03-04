let hue;
const rings = [];

var colors = ["#00000000"];

if(window.parent.window.GlobalInfoForRing!=null)
{

  if(window.parent.window.GlobalInfoForRing.colors!=null)
  {
    colors =  shuffle(window.parent.window.GlobalInfoForRing.colors);
    console.log(colors)
  }
}


function generateRandom(min = 0, max = 100) {

  // find diff
  let difference = max - min;

  // generate random number 
  let rand = Math.random();

  // multiply with difference 
  rand = Math.floor( rand * difference);

  // add with min value 
  rand = rand + min;

  return rand;
}






function StopRing()
{
    ClearCanvas('myCanvas');
    document.Candraw = false;
}

var cnv;
// var count = generateRandom(10,18);
var count = 15;

function setup () {
  function itsMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  let width=window.innerHeight;
  let height=window.innerHeight;


    if (itsMobile()) {
      cnv = createCanvas(150, 150);

      cnv.id("myCanvas");
      cnvElement = document.getElementById("myCanvas");
      cnvElement.style.position = "absolute";
      cnvElement.style.marginLeft = "0";
      cnvElement.style.marginTop = "0px";
      cnvElement.style.padding = "0px";
      cnvElement.style.top = "0";
      cnvElement.style.left = "0";
      cnvElement.style.overflow = "hidden";

    }else{

    cnv = createCanvas(400, 400);

    cnv.id("myCanvas");
    cnvElement = document.getElementById("myCanvas");
    cnvElement.style.overflow = "hidden";
    cnvElement.style.position = "absolute";
    cnvElement.style.marginLeft = "4%";
    cnvElement.style.marginTop = "0px";
    cnvElement.style.padding = "0px";
    cnvElement.style.top = "0";
    cnvElement.style.left = "0";
    }
    
  hue = random(0, 360);
 // var count = floor(random(14, 18));

//  DIAMETER CENTRAL RING
  const diameterbase = 0.1;
  for (let i = 0; i < count; i++) {
     const diameter = diameterbase+(0.85*i)/count; 
   // const diameter = (((i+4) / count));
    const arcLength = random(PI * (0.01*count) , PI * 2);
    const arcAngle = random(-PI * 2, PI * 2);
    const spinSpeed = random(-1, 1);
    rings.push({
      spinSpeed,
      diameter,
      arcLength,
      arcAngle
    });
  }

}

function windowResized () {
//  resizeCanvas(windowWidth, windowHeight);
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}



function draw () {
   
        clear();
        //background("#00000000");

        const minDim = Math.min(width, height);
        
        noFill();
        strokeWeight(minDim * 0.017);
        strokeCap(ROUND);
        //stroke("255");
      
        let d = minDim;
        d -= d * 0.25;
        
        for (let i = 0; i < rings.length; i++) {
          const {
            diameter,
            arcLength,
            arcAngle,
            spinSpeed
          } = rings[i];
          const spin = millis() / 1000 * spinSpeed;
          arc(
            width / 2,
            height / 2,
            diameter * d,
            diameter * d,
            spin + arcAngle,
            spin + arcAngle + Math.PI * arcLength,
            stroke(ReturnColor(i))
          // stroke("hotpink")
          );
        }
      
    }
 

function ReturnColor(i)
{
    if(i < colors.length){return colors[i]}
    else
    {
        var index =  + i%colors.length;
        return colors[index];
    }
}







function ClearCanvas(canvasID){

    canvas = document.getElementById(canvasID);
ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);
}


 function ResetCanvas(canvasID)
{
    canvas = document.getElementById(canvasID);
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/*
function GetParams()
{
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id"); // is the string "Jonathan"
    console.log(id);
}
*/





/*
function startSketch(){
  var sketch = function( p ) {

    var x = 100; 
    var y = 100;

    p.setup = function() {
      p.createCanvas(700, 410);
    };

    p.draw = function() {
      p.background(0);
      p.fill(255);
      p.rect(x,y,50,50);
    };
  };

  var myp5 = new p5(sketch);
}
*/