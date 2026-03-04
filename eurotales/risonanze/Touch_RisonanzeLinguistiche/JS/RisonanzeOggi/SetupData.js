
var prepared_Chart_2max_italiano ={};

const delay = ms => new Promise(res => setTimeout(res, ms));

const waitUntil = (condition) => {
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

var ListRequestToPrepare = 
[
    {
        filter:"age",
        range:1, //Età tra i 19-30
        subset:2, // Risonanze2_max
        index:9 //Indice dell set nel dataset del chart: Italiano
    },
    {
        filter:"map",
        nat:"IT", //Italia
        index:31 //Indice dell set nel dataset del chart: Italiano
    },
    {
        filter:"map",
        nat:"IT", //Italia
        index:10 //Dialetto Italia Centrale 
    }
]

var DictDataChartsPrepared={};
function InitDictDatChartsPrepared()
{
    DictDataChartsPrepared=
    {
        //filters
        "age":
        {
            //range
            0:{ //Risonanze 1
                //subset:
                0:{
                    "raw":SingleSetRisonanzeOggi.Risonanze1_min,
                }, 
                1:{
                    "raw":SingleSetRisonanzeOggi.Risonanze1_max,
                }, 
            },
            1:{//Risonanze 2
                //subset:
                0:{
                    "raw":SingleSetRisonanzeOggi.Risonanze2_minB,
                }, 
                1:{
                    "raw":SingleSetRisonanzeOggi.Risonanze2_min,
                }, 
                2:{
                    "raw":SingleSetRisonanzeOggi.Risonanze2_max,
                    //index of Language
                } 
            },
            2:{//Risonanze 3
                0:
                {
                    "raw":SingleSetRisonanzeOggi.Risonanze3_min,
                }, //min
                1:{
                    "raw":SingleSetRisonanzeOggi.Risonanze3_max,
                },
            },
            3:{//Risonanze 4
                0:{
                    "raw":SingleSetRisonanzeOggi.Risonanze4_min,
                }, //min
                1:{
                    "raw":SingleSetRisonanzeOggi.Risonanze4_max,
                }, //max
            },
            4:{//Risonanze 5
                0:{
                    "raw":SingleSetRisonanzeOggi.Risonanze5_min,
                }, //min
                1:{
                    "raw":SingleSetRisonanzeOggi.Risonanze5_max,
                }, //max
            }
        },
        "map":
        {
            //Nation:
            "IT":
            {
                "raw":DictNations_Set["IT"]
            }
        }
    }
}





async function GetPreparedInfos()
{
    window.domain="OGGI";
    //Basic:
    SetUpDataMapIeri() //From RisonanzeIeriLogic
    InitDictDatChartsPrepared();
    for (const req of ListRequestToPrepare) {
        await PrepareThisSet(req)
    }

    //LocalStorage:
    //IF not exist...
    /*
    if(localStorage.getItem("DictDataChartsPrepared")==null)
    {
        InitDictDatChartsPrepared();
        for (const req of ListRequestToPrepare) {
            await PrepareThisSet(req)
        }
        localStorage.setItem("DictDataChartsPrepared",JSON.stringify(DictDataChartsPrepared));
    }
    else
    {
        DictDataChartsPrepared = JSON.parse(localStorage.getItem("DictDataChartsPrepared"));
    }
    */
    //End LocalStorageTest
    
    RemoveAllCharts();
    window.domain=null;
    window.parent.SetOffLoadingStage();
}

function SaveInLocalUpdatedDict()
{
    localStorage.setItem("DictDataChartsPrepared",JSON.stringify(DictDataChartsPrepared));
}


async function PrepareThisSet(req)
{
    if(req.filter=="age")
    {
        var RawData = DictDataChartsPrepared[req.filter][req.range][req.subset]["raw"];
        var resultChart = await ReturnExceptionsDataPrepared(RawData,req.index);
        DictDataChartsPrepared[req.filter][req.range][req.subset][req.index] = resultChart;
    }
    if(req.filter=="map")
    {
        var RawData = DictDataChartsPrepared[req.filter][req.nat]["raw"];
        var resultChart = await ReturnExceptionsDataPrepared(RawData,req.index);
        DictDataChartsPrepared[req.filter][req.nat][req.index] = resultChart;
    }
   
}



async function ReturnExceptionsDataPrepared(RawSet, indexLanguageSelected)
{
    //Set Covering UI with z-index top
    //Da fascia di età: clicco index 1
   
    if(myChart==null)
    {
        CreateGraphic(RawSet);
    }
    else
    {
        UpdateGraphic(RawSet);
    }
    await waitUntil(() =>window.MadriIsLoaded==true);
    //Da MadriChart clicco italiano (9)
    var elsSimulated = [];
    var FirstElSimulated = {};
    FirstElSimulated.index = indexLanguageSelected;
    elsSimulated.push(FirstElSimulated);
    //await delay(1000);
    var SetSimulatedClicked = GetSetByClickChartItem(elsSimulated);
    var FuseSimulatedParents = OrganizeParents(SetSimulatedClicked);
   // CreateOrUpdateParentsChart(FuseSimulatedParents);
    const resultChart = await GetInfoFromData(FuseSimulatedParents);
    return resultChart;
}


function RemoveAllCharts()
{
    if(myChart!=null)
    {
        myChart.destroy();
        document.getElementById("ChartContainerB").style.display="none";
        myChart = null;
    }
    if(myParentChart!=null)
    {
        myParentChart.destroy();
        document.getElementById("ChartContainer_Parent").style.display="none";
        myParentChart = null;
    }
   
    if(myInitialChart!=null)
    {
        myInitialChart.destroy();
        document.getElementById("ChartContainerInitial").style.display="none";
        myInitialChart =null;
    }
   
   // GetInitialChart();
   // GetMap();
   
}




//OLD
const SimulateClick = (x, y) => {
    const ev = document.createEvent("MouseEvent");
    const el = document.elementFromPoint(x, y);
    ev.initMouseEvent(
      "click",
      true /* bubble */,
      true /* cancelable */,
      window,
      null,
      x,
      y,
      0,
      0 /* coordinates */,
      false,
      false,
      false,
      false /* modifier keys */,
      0 /*left*/,
      null
    );
    el.dispatchEvent(ev);
  };

function DetectCoordinates(evt)
  {
    var x = evt.clientX;
    var y = evt.clientY;
  }
