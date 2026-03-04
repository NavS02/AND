const SingleSetRisonanzeOggi = JSON.parse(SingleSetRisonanzeOggi_String);
const DictNations_Set = JSON.parse(Dict_Nations_Set_String);
//const colors = SingleSetRisonanzeOggi.colors;
const colors = JSON.parse(ColorsString);
window.colors = colors;

//CLickChart:
var evttest;
var eltest;
var chartest;
var dataFormattedTest = null;

let dataIeri = JSON.parse(localStorage.getItem("DataIeristring"));
let lingueFinale = JSON.parse(localStorage.getItem("languagesAPI"));

//Risonanze Oggi A: Fascia di età, mappa e setHeader
function GetOggi_A() {
  window.domain = "OGGI";
  document.getElementById("backgroundStatic").src =
    "Images/pngs/RisonanzeOGGI1_backstatic.png";
  HideAllHelperBtns();
  GetInitialChart();
  GetMap();
  var content = `<p><b>Set Totale di dati: 1900</b><br>
    </p>`;
  SetUISideHeader(content);
  SetDescChartA("Fascie di età");
  SetDescChartB("Nazioni d'Europa");
  HideParentChart();
  HideMadriChart();
  document.getElementById("BottomBtn_SX_IERI").style.display = "none";
  document.getElementById("BottomBtn_DX_IERI").style.display = "none";
}

function GetIeri_A() {
  CanStartRing = false;
  window.domain = "IERI";
  window.IERI_Stack = null;
  document.getElementById("backgroundStatic").src =
    "Images/pngs/RisonanzeIERI1_backstatic.png";
  HideAllHelperBtns();
  GetMap();
  var content = `<p><b>Mother tongues of ${dataIeri.length} collected historical characters</b> </p>`;

  SetUISideHeader(content);
  SetDescChartA("Mother tongues of historical characters");
  SetDescChartB("Nations of Europe");
  HideParentChart();
  CreateGraphic(dataIeri);
  HideInitialChart();

  document.getElementById("BottomBtn_SX_IERI").style.display = "block";
  document.getElementById("BottomBtn_DX_IERI").style.display = "block";
}

function SetUISideHeader(info) {
  var HeaderSide = document.getElementById("HeaderSide");
  HeaderSide.style.display = "block";
  HeaderSide.innerHTML = info;
}
function SetDescChartA(info) {
  var descChartA = document.getElementById("descChartA");
  descChartA.innerHTML = info;
  if (info != null) {
    descChartA.style.display = "block";
  } else {
    descChartA.style.display = "none";
  }
}

function SetDescChartB(info) {
  var descChartB = document.getElementById("descChartB");
  descChartB.innerHTML = info;
  if (info != null) {
    descChartB.style.display = "block";
  } else {
    descChartB.style.display = "none";
  }
}

function ManageBackBtn()
{
    if(window.domain=="OGGI")
    {
        if(myChart!=null)
        {
            GetOggi_A();
        }
        else
        {
            window.parent.BackToHome();
        }
    }
    if(window.domain=="IERI")
    {
      
        var ListNameContainer = document.getElementById("ListOfNamesContainer");
        console.log(ListOfNamesContainer)
        var MapBox =  document.getElementById("MapBox");
        var ContainerInfoIeri = document.getElementById("ContainerInfoIeri");
        var iFrameRing = window.parent.document.getElementById("FrameRisonanzeIeriRings");
        console.log("Back from " + window.domain);
        console.log("LIST NAME: " + ListNameContainer.style.display);
      
        //Se ho la lista di nomi attiva:
        if(ListNameContainer.style.display=="block")
        {
            HideWithoutDestroyListNames();
           // document.getElementById("ChartContainerB").style.display="block";
            HideMadriChart();
            MapBox.classList.remove("MapMoved");
            LastindexPathClicked = null;
            
            GetIeri_A();
        }    
        //Se ho un ring attivo torna indietro
        else if(ContainerInfoIeri.style.display=="block")
        {
        //HideStuff
        document.getElementById("TitlePersonaggioIERI").style.display ="none";
        ContainerInfoIeri.innerHTML=null;
        ContainerInfoIeri.style.display="none";
        //Hide Frame
        CanStartRing=false;
        iFrameRing.style.display="none";

            if(window.IERI_Stack=="chart")
            {
                document.getElementById("ChartContainerB").style.display="block";
                SetInfoBottomBtns("ListFromChart");
            }
            if(window.IERI_Stack=="map")
            {
                MapBox.style.display="block";
                SetInfoBottomBtns("ListFromMap");
            }
            document.getElementById("descChartB").style.display="block";
            document.getElementById("descChartA").style.display="block";
            // document.getElementById("CentralImgRing").src = null;
            // document.getElementById("CentralImgRing").style.display="none";
            console.log(window.PrevSideContent);
            console.log("DAJE")
            if(window.PrevSideContent!=null)
            {
                SetUISideHeader(window.PrevSideContent);
            }
            ListNameContainer.style.display="block";

        }
   
       else 
       {
            CanStartRing=false;
            MapBox.classList.remove("MapMoved");
            HideMadriChart();
            MapBox.style.display="none";
            window.parent.BackToHome();
        }
    }

}

function GetInitialChart() {
  var labels = ["11-18", "19-30", "31-50", "51-70", "over 70"];
  var data = [274, 2348, 550, 488, 142];
  var colors = [
    "#2b917fc7",
    "#217a7abf",
    "#385e5dd4",
    "#2f3c3cd4",
    "#75f2dab8",
  ];

  var InfoChartInitial = {};
  InfoChartInitial.labels = labels;
  var dataset = {};
  var datasets = [];
  dataset.data = data;
  dataset.backgroundColor = colors;
  datasets.push(dataset);
  InfoChartInitial.datasets = datasets;
  document.getElementById("ChartContainerInitial").style.display = "block";
  CreateOrUpdateInitialChart(InfoChartInitial);
}

function CreateOrUpdateInitialChart(data) {
  if (myInitialChart != null) {
    myInitialChart.data = data;
    myInitialChart.update();
  } else {
    CreateInitialChart(data);
  }
}

var SetClickedTest;
var FuseParentTest;
function ManageClickFromChart(evt, el, chart) {
  evttest = evt;
  eltest = el;
  chartest = chart;

  var id = chart.canvas.id;
  window.IndexClicked = el[0].index;
  if (window.domain == "OGGI") {
    //Click di una delle LINGUE MADRI
    if (id == "myChart") {
      var isPrepared = CheckIfisPrepared(el[0].index);
      if (!isPrepared) {
        var SetClicked = GetSetByClickChartItem(el);
        var FuseParents = OrganizeParents(SetClicked);
        SetClickedTest = SetClicked;
        FuseParentTest = FuseParents;
        CreateOrUpdateParentsChart(FuseParents);
      }
      var lan = InfoChart_Global.labels[el[0].index];
      lan = lan.charAt(0).toUpperCase() + lan.slice(1);

      var contentDescChartB =
        "<p style='margin-left:231px;'>Lingue Madri dei genitori di cha come lingua madre: <b>" +
        lan +
        "</b><p>";
      SetDescChartB(contentDescChartB);
    }
    //SELEZIONE DEL SET DALLA FASCIA DI ETA
    else if (id == "myInitialChart") {
      window.Filter = "age";
      window.Range = el[0].index;
      var set;
      var divBtn;

      //For desc and UI:
      var descChartAge = "";
      var countTotal;
      var indexHelperPie;
      HideAllHelperBtns();
      if (el[0].index == 0) {
        set = SingleSetRisonanzeOggi.Risonanze1_max;
        indexHelperPie = "1Max";
        divBtn = document.getElementById("btnsRiso1");
        window.Subset = 1;
        descChartAge = "tra 11 e 18 anni";
        countTotal = 137;
      }
      if (el[0].index == 1) {
        set = SingleSetRisonanzeOggi.Risonanze2_max;
        indexHelperPie = "2Max";
        divBtn = document.getElementById("btnsRiso2");
        window.Subset = 2;
        descChartAge = "tra 19 e 30 anni";
        countTotal = 1160;
      }
      if (el[0].index == 2) {
        set = SingleSetRisonanzeOggi.Risonanze3_max;
        indexHelperPie = "3Max";
        divBtn = document.getElementById("btnsRiso3");
        window.Subset = 1;
        descChartAge = "tra 31 e 50 anni";
        countTotal = 268;
      }
      if (el[0].index == 3) {
        set = SingleSetRisonanzeOggi.Risonanze4_max;
        indexHelperPie = "4Max";
        divBtn = document.getElementById("btnsRiso4");
        window.Subset = 1;
        descChartAge = "tra 51 e 70 anni";
        countTotal = 239;
      }
      if (el[0].index == 4) {
        set = SingleSetRisonanzeOggi.Risonanze5_max;
        indexHelperPie = "5Max";
        divBtn = document.getElementById("btnsRiso5");
        window.Subset = 1;
        descChartAge = "oltre i 70 anni";
        countTotal = 70;
      }
      divBtn.style.display = "flex";

      //HelpersPieStartup
      SetHelperPieImageSource(indexHelperPie);
      SetHelperPiesInfo(set.length, countTotal);
      document.getElementById("BoxHelper").style.display = "block";

      //UI Stuff..
      document.getElementById("backgroundStatic").src =
        "Images/pngs/RisonanzeOGGI2_backstatic.png";

      HideMap();
      HideInitialChart();
      CreateGraphic(set);
      SetUISideHeader(
        "<p><b>LINGUE MADRI della fascia di età " +
          descChartAge +
          "</b><br>Set di dati totale: " +
          countTotal +
          "</p>"
      ); //)

      SetDescChartA("Lingue madri della fascia di età " + descChartAge);
      SetDescChartB(null);
    }
  }
  if (window.domain == "IERI") {
    OnClickFromChartIERI(el, chart); //From RIsonanzeIeriLogic
  }
}

function CheckIfisPrepared(index) {
  var boolIsPrepared = false;
  var Filter = window.Filter;
  if (Filter == "age") {
    var Range = window.Range;
    var Subset = window.Subset;
    var InfoChartPrepared =
      DictDataChartsPrepared[Filter][Range][Subset][index];
  }
  if (Filter == "map") {
    var Nation = window.Nation;
    if (typeof DictDataChartsPrepared[Filter][Nation] != "undefined") {
      var InfoChartPrepared = DictDataChartsPrepared[Filter][Nation][index];
    }
  }
  if (InfoChartPrepared != null) {
    boolIsPrepared = true;
  }
  if (boolIsPrepared) {
    ByPassElaborationForParentChart(InfoChartPrepared);
  }
  return boolIsPrepared;
}

function ByPassElaborationForParentChart(preparedChart) {
  document.getElementById("ChartContainer_Parent").style.display = "block";
  InfoChart_GlobalParent = preparedChart.dataChart;
  DictLan_Info_GlobalParent = preparedChart.DictLan_Info;
  //Create or Update logic to do
  if (myParentChart != null) {
    myParentChart.data = preparedChart.dataChart;
    myParentChart.update();
  } else {
    CreateParentChart(preparedChart.dataChart);
  }
}

function HideAllHelperBtns() {
  document.getElementById("btnsRiso1").style.display = "none";
  document.getElementById("btnsRiso2").style.display = "none";
  document.getElementById("btnsRiso3").style.display = "none";
  document.getElementById("btnsRiso4").style.display = "none";
  document.getElementById("btnsRiso5").style.display = "none";

  document.getElementById("InfoPies").style.display = "none";
  document.getElementById("BoxHelper").style.display = "none";
}
function SetHelperPieImageSource(targetIndex) {
  targetIndex = targetIndex.toLowerCase();
  const indexes = [
    "1Min",
    "1Max",
    "2MinB",
    "2Min",
    "2Max",
    "3Min",
    "3Max",
    "4Min",
    "4Max",
    "5Min",
    "5Max",
  ];
  indexes.forEach((index) => {
    const name = index + "_img";
    var img = document.getElementById(name);
    var src = "Images/pngs/HelpersPie/" + index.toLowerCase() + ".png";
    if (targetIndex == index.toLowerCase()) {
      src = "Images/pngs/HelpersPie/" + index.toLowerCase() + "_sel.png";
    }
    if (img != null) {
      img.src = src;
    } else {
      console.log("image not found");
    }
  });
}
function SetHelperPiesInfo(current, tot) {
  var perc = ((current / tot) * 100).toFixed(0);
  //CHIODI:
  if (perc == 90) {
    perc = 89;
  }
  var InfoPies = document.getElementById("InfoPies");
  var content = "<p>Stai visualizzando </br>il <b>" + perc + "%</b> del totale";
  InfoPies.style.display = "block";
  InfoPies.innerHTML = content;
}

function UpdateByBtns(indexBtn) {
  var set;
  var tot;
  if (indexBtn == "1min") {
    set = SingleSetRisonanzeOggi.Risonanze1_min;
    tot =
      SingleSetRisonanzeOggi.Risonanze1_min.length +
      SingleSetRisonanzeOggi.Risonanze1_max.length;
    window.Subset = 1;
  }
  if (indexBtn == "1max") {
    set = SingleSetRisonanzeOggi.Risonanze1_max;
    tot =
      SingleSetRisonanzeOggi.Risonanze1_min.length +
      SingleSetRisonanzeOggi.Risonanze1_max.length;
    window.Subset = 2;
  }

  if (indexBtn == "2minB") {
    set = SingleSetRisonanzeOggi.Risonanze2_minB;
    tot = tot =
      SingleSetRisonanzeOggi.Risonanze2_min.length +
      SingleSetRisonanzeOggi.Risonanze2_max.length +
      SingleSetRisonanzeOggi.Risonanze2_minB.length;
    window.Subset = 0;
  }

  if (indexBtn == "2min") {
    set = SingleSetRisonanzeOggi.Risonanze2_min;
    tot = tot =
      SingleSetRisonanzeOggi.Risonanze2_min.length +
      SingleSetRisonanzeOggi.Risonanze2_max.length +
      SingleSetRisonanzeOggi.Risonanze2_minB.length;
    window.Subset = 1;
  }
  if (indexBtn == "2max") {
    set = SingleSetRisonanzeOggi.Risonanze2_max;
    tot = tot =
      SingleSetRisonanzeOggi.Risonanze2_min.length +
      SingleSetRisonanzeOggi.Risonanze2_max.length +
      SingleSetRisonanzeOggi.Risonanze2_minB.length;
    window.Subset = 2;
  }

  if (indexBtn == "3min") {
    set = SingleSetRisonanzeOggi.Risonanze3_min;
    tot =
      SingleSetRisonanzeOggi.Risonanze3_min.length +
      SingleSetRisonanzeOggi.Risonanze3_max.length;
    window.Subset = 0;
  }
  if (indexBtn == "3max") {
    set = SingleSetRisonanzeOggi.Risonanze3_max;
    tot =
      SingleSetRisonanzeOggi.Risonanze3_min.length +
      SingleSetRisonanzeOggi.Risonanze3_max.length;
    window.Subset = 1;
  }

  if (indexBtn == "4min") {
    set = SingleSetRisonanzeOggi.Risonanze4_min;
    tot =
      SingleSetRisonanzeOggi.Risonanze4_min.length +
      SingleSetRisonanzeOggi.Risonanze4_max.length;
    window.Subset = 0;
  }
  if (indexBtn == "4max") {
    set = SingleSetRisonanzeOggi.Risonanze4_max;
    tot =
      SingleSetRisonanzeOggi.Risonanze4_min.length +
      SingleSetRisonanzeOggi.Risonanze4_max.length;
    window.Subset = 1;
  }

  if (indexBtn == "5min") {
    set = SingleSetRisonanzeOggi.Risonanze5_min;
    tot =
      SingleSetRisonanzeOggi.Risonanze5_min.length +
      SingleSetRisonanzeOggi.Risonanze5_max.length;
    window.Subset = 0;
  }
  if (indexBtn == "5max") {
    set = SingleSetRisonanzeOggi.Risonanze5_max;
    tot =
      SingleSetRisonanzeOggi.Risonanze5_min.length +
      SingleSetRisonanzeOggi.Risonanze5_max.length;
    window.Subset = 1;
  }
  SetHelperPieImageSource(indexBtn);
  SetHelperPiesInfo(set.length, tot);
  document.getElementById("BoxHelper").style.display = "block";
  UpdateGraphic(set);
  HideParentChart();
  SetDescChartB(null);
}

function HideInitialChart() {
  if (myInitialChart != null) {
    myInitialChart.destroy();
    document.getElementById("ChartContainerInitial").style.display = "none";
    myInitialChart = null;
  } else {
    document.getElementById("ChartContainerInitial").style.display = "none";
  }
}
function HideMadriChart() {
  if (myChart != null) {
    myChart.destroy();
    document.getElementById("ChartContainerB").style.display = "none";
    myChart = null;
  }
}
function HideWithoutDestroyMadriChart() {
  document.getElementById("ChartContainerB").style.display = "none";
}

function HideParentChart() {
  if (myParentChart != null) {
    myParentChart.destroy();
    document.getElementById("ChartContainer_Parent").style.display = "none";
    myParentChart = null;
  }
}

function CreateOrUpdateParentsChart(data) {
  if (myParentChart != null) {
    document.getElementById("ChartContainer_Parent").style.display = "block";
    UpdateParentGraphic(data);
  } else {
    document.getElementById("ChartContainer_Parent").style.display = "block";
    CreateParentGraphic(data);
  }
}

//organizzo i parenti come se fosse singole unità che parlano più lingue:
function OrganizeParents(SetParents) {
  var FuseParents = [];
  SetParents.forEach((element) => {
    var listfamilylanguages = [];
    if (Array.isArray(element.linguadellaMadre)) {
      listfamilylanguages = listfamilylanguages.concat(
        element.linguadellaMadre
      );
    } else {
      listfamilylanguages.push(element.linguadellaMadre);
    }
    if (Array.isArray(element.linguadelPadre)) {
      listfamilylanguages = listfamilylanguages.concat(element.linguadelPadre);
    } else {
      listfamilylanguages.push(element.linguadelPadre);
    }
    var family = {};

    listfamilylanguages = [...new Set(listfamilylanguages)];
    if (listfamilylanguages.length == 1) {
      family.linguamadre = listfamilylanguages[0];
      // console.log(family.linguamadre);
    } else {
      family.linguamadre = listfamilylanguages;
    }
    //  console.log("family: ");
    //  console.log(family.linguamadre);
    FuseParents.push(family);
  });
  return FuseParents;
}

function GetSetByClickChartItem(el) {
  var index = el[0].index;
  var lan = InfoChart_Global.labels[index];
  //  console.log("Index is: " + index + " for lan: " + lan);
  //  console.log(lan);
  var Set = DictLan_Info_Global[lan].set;

  return Set;
}

async function CreateGraphic(data) {

  let resultChart;
  //debug Purpose:
  // if(data==null){data=SingleSetRisonanzeOggi.Risonanze1;}
  resultChart = await GetInfoFromData(data);

  resultChart = dataFormattedTest;

  if (window.domain == "OGGI") {
    InfoChart_Global = resultChart.dataChart;
    DictLan_Info_Global = resultChart.DictLan_Info;
  }
  document.getElementById("ChartContainerB").style.display = "block";
  if (window.myChart) {
    window.myChart.destroy();
}
  try{
  CreateChart(resultChart.dataChart);
  }catch(error){

  }
}

async function UpdateGraphic(data = null) {
  const resultChart = await GetInfoFromData(data);

  InfoChart_Global = resultChart.dataChart;
  DictLan_Info_Global = resultChart.DictLan_Info;

  document.getElementById("ChartContainerB").style.display = "block";
  myChart.data = resultChart.dataChart;
  myChart.update();
}

async function CreateParentGraphic(data) {
  document.getElementById("ChartContainer_Parent").style.display = "block";
  const resultChart = await GetInfoFromData(data);
  TryToSaveData(resultChart);
  InfoChart_GlobalParent = resultChart.dataChart;
  DictLan_Info_GlobalParent = resultChart.DictLan_Info;

  CreateParentChart(resultChart.dataChart);
}

async function UpdateParentGraphic(data) {
  const resultChart = await GetInfoFromData(data);
  TryToSaveData(resultChart);
  InfoChart_GlobalParent = resultChart.dataChart;
  DictLan_Info_GlobalParent = resultChart.DictLan_Info;

  myParentChart.data = resultChart.dataChart;
  myParentChart.update();
}

function TryToSaveData(resultChart) {
  if (window.domain == "OGGI") {
    var Filter = window.Filter;
    var Range = window.Range;
    var Subset = window.Subset;
    var Index = window.IndexClicked;
    var Nation = window.Nation;

    if (Filter == "age") {
      if (
        typeof DictDataChartsPrepared[Filter][Range][Subset][Index] ==
        "undefined"
      ) {
        DictDataChartsPrepared[Filter][Range][Subset][Index] = resultChart;
        SaveInLocalUpdatedDict();
      }
    }
    if (Filter == "map") {
      if (typeof DictDataChartsPrepared[Filter][Nation] == "undefined") {
        DictDataChartsPrepared[Filter][Nation] = {};
        DictDataChartsPrepared[Filter][Nation][Index] = resultChart;
        SaveInLocalUpdatedDict();
      } else {
        if (
          typeof DictDataChartsPrepared[Filter][Nation][Index] == "undefined"
        ) {
          DictDataChartsPrepared[Filter][Nation][Index] = resultChart;
          SaveInLocalUpdatedDict();
        }
      }
    }
  }
}

function groupMby(languages, data, param) {
  var DictLan_Info = {};
  languages.forEach((lan) => {
    var set = data.filter((el) => el[param] == lan);
    var count = set.length;
    var Info = {};
    Info.languages = lan;
    Info.set = set;
    Info.count = count;
    DictLan_Info[lan] = Info;
  });
  return DictLan_Info;
}

function ReturnListOfLanguages(data) {
  //Conto tutte le lingue:
  var languages = [];
  data.forEach((element) => {
    languages.push(element.lingua_madre);
  });
  languages = [...new Set(languages)];
  return languages;
}

var DictLan_Info_Global = {};
var InfoChart_Global = {};

var DictLan_Info_GlobalParent = {};
var InfoChart_GlobalParent = {};
async function GetInfoFromData(data) {
  //var data = SingleSetRisonanzeOggi.Risonanze3_max;

  //raccolgo tutte le lingue
  var languages = ReturnListOfLanguages(data);
  //Creo un dict lingua: info.set e info.count
  var DictLan_Info = groupMby(languages, data, "lingua_madre");

  //Creo il data che serve al Chart:
  var labels = [];
  var dataNumbers = [];
  var colors = [];
  for (const [key, Info] of Object.entries(DictLan_Info)) {
    let myObject;
    for (let index in lingueFinale) {
      if (parseInt(lingueFinale[index].id) === parseInt(key)) {
        myObject = lingueFinale[index];
        break;
      }
    }
    if (myObject && myObject.hasOwnProperty("language")) {
      labels.push(myObject.language);
    }
    dataNumbers.push(Info.count);

    //Aggiungo info.color:
    if (Array.isArray(Info.languages)) {
      // console.log("is array: " +key);
      var ListmultiLingue = [];
      Info.languages.forEach((lan) => {
        ListmultiLingue.push(lan);
      });
      const Pattern = await CreatePattern(ListmultiLingue);
      Info.color = Pattern;
      // console.log(Pattern);
    } else {
      Info.color = window.colors[key];
    }
    if (myObject && myObject.hasOwnProperty("colors")) {
      colors.push(myObject.colors);
    }
  }
  // console.log("DONEE")
  //Compongo il dataChart:
  var dataChart = {};
  var dataset = {};
  dataset.data = dataNumbers;
  dataset.backgroundColor = colors;
  dataChart.datasets = [dataset];
  dataChart.labels = labels;

  //Creo il chart:
  var result = {};
  result.DictLan_Info = DictLan_Info;
  result.dataChart = dataChart;
  dataFormattedTest = result;
  return result;
}

const img = new Image();
async function OLD_CreatePattern(ListmultiLingue) {
  if (ListmultiLingue.length > 2) {
    console.log("POLIGLOTTA");
  }
  var color1 = window.colors[ListmultiLingue[0]].replace("#", "%23");
  var color2 = window.colors[ListmultiLingue[1]].replace("#", "%23");

  // console.log("color 1: " + color1);
  // console.log("color2: " + color2);
  // const img = new Image();
  img.src =
    'data:image/svg+xml;charset=utf-8, <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24.03 24"><rect width="24" height="24" fill="' +
    color1 +
    '"/><polygon points="18.52 24 7.2 24 0 16.8 0 5.48 18.52 24" fill="' +
    color2 +
    '"/><polygon points="18.52 24 7.2 24 0 16.8 0 5.48 18.52 24" fill="' +
    color2 +
    '"/><polygon points="18.49 0 24.03 5.54 24.03 16.86 7.17 0 18.49 0" fill="' +
    color2 +
    '"/></svg>';
  await img.decode();
  //console.log("Created New PATTERN!");
  const ctx = document.getElementById("myChart").getContext("2d");
  const fillPattern = ctx.createPattern(img, "repeat");
  return fillPattern;
}

async function CreatePattern(ListmultiLingue) {
  var newColor = null;
  var color1 = null;
  var color2 = null;
  var color3 = null;
  //Get Colors cleaned without #
  if (Array.isArray(ListmultiLingue)) {
    if (ListmultiLingue.length > 0) {
      color1 = window.colors[ListmultiLingue[0]].replace("#", "");
      color2 = window.colors[ListmultiLingue[1]].replace("#", "");
      if (ListmultiLingue.length > 2) {
        color3 = window.colors[ListmultiLingue[2]].replace("#", "");
      }
    }
  }
  if (color1 != null && color2 != null) {
    newColor = mix(color1, color2);

    /*  if(color3!=null)
        {
            newColor = mix(newColor,color3);
        }*/
  }
  //  console.log("new color is:");
  //  console.log(newColor);
  return newColor;
}

//DEBUG

//CreateGraphic();
