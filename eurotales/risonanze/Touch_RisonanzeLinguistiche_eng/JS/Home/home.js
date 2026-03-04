
const RisonanzeOggiHomeLink = "/index_RisonzeOggi_Home.html";
const RisonanzeIeriHomeLink = "todo";

var TopReferenceColors =null;

//TIMER LOAD TIME:
const timeForReboot = 10 * 60 * 1000; //10 minuti

var ListWrongColors = [];
function TestDebugColors()
{
  for (const [key, value] of Object.entries(TopReferenceColors))
  {
    if(value.length!=7)
    {
      ListWrongColors.push({key:key,value:value});
    }
  }
}

/*UTILITY:*/
const home_waitUntil = (condition) => {
  return new Promise((resolve) => {
      let interval = setInterval(() => {
          if (!condition()) {
              return
          }
          clearInterval(interval)
          resolve()
      }, 100)
  })
}

async function SetOffLoadingStage()
{
  try {
    var LoadingScreen2 = document.getElementById("LoadingScreen2");
  
    LoadingScreen2.style.display="none";
  } catch (error) {
    
  }
  //Set UI loading...
  var LoadingScreen = document.getElementById("LoadingScreen");
  LoadingScreen.style.display="none";

  TopReferenceColors= document.getElementById("FrameRisonanzeOggi").contentWindow.window.colors;
}
function BackToHome()
{
  var iFrameRisonanzeOggi = document.getElementById("FrameRisonanzeOggi");
  iFrameRisonanzeOggi.style.display="none";
  let contentTitle=''
    document.getElementById("pageTitle").innerHTML=contentTitle
}


function GetRisonanzeOggi()
{
  var iFrameRisonanzeOggi = document.getElementById("FrameRisonanzeOggi");
  iFrameRisonanzeOggi.style.display="block";
  iFrameRisonanzeOggi.contentWindow.GetOggi_A();
}

function GetRisonanzeIeri()
{
    var iFrameRisonanzeOggi = document.getElementById("FrameRisonanzeOggi");
    iFrameRisonanzeOggi.style.display="block";
    iFrameRisonanzeOggi.contentWindow.GetIeri_A();
    let contentTitle='<span style="color:black !important;font-size:40px">RISONANZE</span> DI IERI'
    document.getElementById("pageTitle").innerHTML=contentTitle
}

//const delay = ms => new Promise(res => setTimeout(res, ms));
function GetRingsIFrame(infoRing)
{
  var iFrameRings = document.getElementById("FrameRisonanzeIeriRings");
   window.GlobalInfoForRing = infoRing;
   iFrameRings.contentWindow.location.reload();
   iFrameRings.style.display="block";  
}
/*
function OnLoadIFramRing()
{
  var iFrameRisonanzeOggi = document.getElementById("FrameRisonanzeOggi");
  if(iFrameRisonanzeOggi.contentWindow.CanStartRing==true)
  {
    var iFrameRings = document.getElementById("FrameRisonanzeIeriRings");
    iFrameRings.style.display="block";  
  }
}
*/

function GetInfoFullScreen()
{
  document.getElementById("PopupinfoD").style.display="block";
}

function BackFromInfoFullScreen()
{
  document.getElementById("PopupinfoD").style.display="none";
}

function GetPopUpCredits()
{
   

  document.getElementById("PopupCreditsFull").style.display="block";
  document.getElementById("BackBtn_FromCreditsFull").style.display="block";
}
function BackFromCreditsFullScreen()
{
  document.getElementById("PopupCreditsFull").style.display="none";
  document.getElementById("BackBtn_FromCreditsFull").style.display="none";
}



/*TIMEOUT*/
function Reboot()
{
  location.reload();
}

var SetTimedReboot;

function CallNextReboot()
{
  SetTimedReboot = setTimeout(Reboot, timeForReboot);
}
function PreventReset()
{
  clearTimeout(SetTimedReboot);
  CallNextReboot();
}