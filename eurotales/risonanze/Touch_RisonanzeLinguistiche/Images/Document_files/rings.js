let hue;
const rings = [];

var colors = ["black","hotpink","yellow","black","hotpink","yellow","black","hotpink","yellow","black","hotpink","yellow"];

var colors2 = ["green", "purple", "grey","green", "purple", "grey","green", "purple", "grey","green", "purple", "grey"];



function StartRing()
{
    document.Candraw = true;
}



function StopRing()
{
    ClearCanvas('myCanvas');
    document.Candraw = false;
}

//var cnv;
var CreateLated;
var MyRemove;
function setup () {
 // createCanvas(windowWidth, windowHeight);

  var cnv = createCanvas(600, 600);
     MyRemove = ()=> removeElements();
    cnv.id("myCanvas");
    cnvElement = document.getElementById("myCanvas");
    cnvElement.style.position = "absolute";
    cnvElement.style.marginLeft = "156px";
    cnvElement.style.marginTop = "111px";


 
  hue = random(0, 360);
  const count = floor(random(14, 18));
  const diameterbase = 0.5;
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

document.Candraw = false;


function draw () {
    if(document.Candraw)
    {
        clear();
        background("#00000000");

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


function GetParams()
{
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id"); // is the string "Jonathan"
}
