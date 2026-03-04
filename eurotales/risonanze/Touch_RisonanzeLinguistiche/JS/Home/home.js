
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
function SetHeaderAlignment(position = 'left') {
  const headerPanel = document.querySelector('.headerPanel');

  if (!headerPanel) return;

  [...headerPanel.childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      headerPanel.removeChild(node);
    }
  });

  headerPanel.style.display = 'flex';
  headerPanel.style.alignItems = 'center';

  if (position === 'right') {
    headerPanel.style.justifyContent = 'flex-end';
    headerPanel.style.paddingRight = '20px';
    headerPanel.style.paddingLeft = '0px';
    headerPanel.style.background = 'linear-gradient(-90deg, rgba(255,255,255,0.838) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)';
  } else {
    headerPanel.style.justifyContent = 'flex-start';
    headerPanel.style.paddingLeft = '20px';
    headerPanel.style.paddingRight = '0px';
    headerPanel.style.background = 'linear-gradient(90deg, rgba(255,255,255,0.838) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)';
  }
}
function BackToHome()
{
  var iFrameRisonanzeOggi = document.getElementById("FrameRisonanzeOggi");
  iFrameRisonanzeOggi.style.display="none";
  let contentTitle=''
    document.getElementById("pageTitle").innerHTML=contentTitle
SetHeaderAlignment('left');

}



function GetRisonanzeOggi()
{
  var iFrameRisonanzeOggi = document.getElementById("FrameRisonanzeOggi");
  iFrameRisonanzeOggi.style.display="block";
  iFrameRisonanzeOggi.contentWindow.GetOggi_A();
      let contentTitle=''
      // let contentTitle='<span style="color:black !important;font-size:40px">RISONANZE</span> DI OGGI'
    document.getElementById("pageTitle").innerHTML=contentTitle

SetHeaderAlignment('right');
    
}

function GetRisonanzeIeri()
{
    var iFrameRisonanzeOggi = document.getElementById("FrameRisonanzeOggi");
    iFrameRisonanzeOggi.style.display="block";
    iFrameRisonanzeOggi.contentWindow.GetIeri_A();
    let contentTitle='<span style="color:black !important;font-size:40px">RISONANZE</span> DI IERI'
    document.getElementById("pageTitle").innerHTML=contentTitle
SetHeaderAlignment('left');
 
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