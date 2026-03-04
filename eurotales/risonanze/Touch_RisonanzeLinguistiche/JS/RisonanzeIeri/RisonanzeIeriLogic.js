//Globals data:
var DictNationsIeri_Set = {};

//Risonanze IERI
const apiUrl = "https://www.directuseurotales.ambientinarratividigitali.it";
let DataIeristring = [];
let languagesAPI = [];
let secoloNas = [];
let luoghiData = [];

let ris_ieri_lingueData = [];
let ris_ieri_lingue_1Data = [];
let ris_ieri_lingue_2Data = [];
let ris_ieri_lingue_3Data = [];


var clickedFromPopup = false;
const cachedData = localStorage.getItem("DataIeristring");
const cachedData2 = localStorage.getItem("languagesAPI");
const cachedData3 = localStorage.getItem("secoloNas");
const cachedData4 = localStorage.getItem("luoghiData");
const cachedData5 = localStorage.getItem("ris_ieri_lingue");
const cachedData6 = localStorage.getItem("ris_ieri_lingue_1");
const cachedData7 = localStorage.getItem("ris_ieri_lingue_2");
const cachedData8 = localStorage.getItem("ris_ieri_lingue_3");

fetchData();
// ris_ieri_lingue_3
async function fetchData() {
  try {
    const response = await fetch(
      `${apiUrl}/items/ris_ieri/?limit=-1&filter[stato][_eq]=4`
    );
    const response2 = await fetch(`${apiUrl}/items/lingue/?limit=-1&sort[]=lingua`);
    const response3 = await fetch(`${apiUrl}/items/secolo/?limit=-1`);
    const response4 = await fetch(`${apiUrl}/items/luoghi/?limit=-1`);
    const response5 = await fetch(`${apiUrl}/items/ris_ieri_lingue/?limit=-1`);
    const response6 = await fetch(
      `${apiUrl}/items/ris_ieri_lingue_1/?limit=-1`
    );
    const response7 = await fetch(
      `${apiUrl}/items/ris_ieri_lingue_2/?limit=-1`
    );
    const response8 = await fetch(
      `${apiUrl}/items/ris_ieri_lingue_3/?limit=-1`
    );
    const response9 = await fetch(
      `${apiUrl}/items/area_geografico_linguistica/?limit=-1`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    if (!response2.ok) {
      throw new Error(`Error: ${response2.statusText}`);
    }
    if (!response3.ok) {
      throw new Error(`Error: ${response3.statusText}`);
    }
    if (!response4.ok) {
      throw new Error(`Error: ${response4.statusText}`);
    }
    if (!response5.ok) {
      throw new Error(`Error: ${response5.statusText}`);
    }
    if (!response6.ok) {
      throw new Error(`Error: ${response6.statusText}`);
    }
    if (!response7.ok) {
      throw new Error(`Error: ${response7.statusText}`);
    }
    if (!response8.ok) {
      throw new Error(`Error: ${response8.statusText}`);
    }
    if (!response9.ok) {
      throw new Error(`Error: ${response8.statusText}`);
    }

    const data = await response.json();
    DataIeristring = data.data;

    localStorage.setItem("DataIeristring", JSON.stringify(DataIeristring));

    const data2 = await response2.json();
    languagesAPI = data2.data;
    localStorage.setItem("languagesAPI", JSON.stringify(languagesAPI));

    const data3 = await response3.json();
    secoloNas = data3.data;
    localStorage.setItem("secoloNas", JSON.stringify(secoloNas));

    const data4 = await response4.json();
    luoghiData = data4.data;
    localStorage.setItem("luoghiData", JSON.stringify(luoghiData));

    const data5 = await response5.json();
    ris_ieri_lingueData = data5.data;
    localStorage.setItem(
      "ris_ieri_lingue",
      JSON.stringify(ris_ieri_lingueData)
    );

    const data6 = await response6.json();
    ris_ieri_lingue_1Data = data6.data;
    localStorage.setItem(
      "ris_ieri_lingue_1",
      JSON.stringify(ris_ieri_lingue_1Data)
    );

    const data7 = await response7.json();
    ris_ieri_lingue_2Data = data7.data;

    localStorage.setItem(
      "ris_ieri_lingue_2",
      JSON.stringify(ris_ieri_lingue_2Data)
    );

    const data8 = await response8.json();
    ris_ieri_lingue_3Data = data8.data;
    localStorage.setItem(
      "ris_ieri_lingue_3",
      JSON.stringify(ris_ieri_lingue_3Data)
    );
    const data9 = await response9.json();
    area_geo = data9.data;
    localStorage.setItem("area_geo", JSON.stringify(area_geo));

    orderData();
  } catch (error) {
    console.error("Error:", error);
  }
}

const RisonanzeIeriSet = JSON.parse(cachedData);
const RisonanzeIeri = RisonanzeIeriSet;
var areaSelectedFinal=null

const secoloIeriSet = JSON.parse(cachedData3);
const RisonanzeSecolo = secoloIeriSet;

const luoghiDataSet = JSON.parse(cachedData4);
const luoghi = luoghiDataSet;

const ris_ieri_lingueDataSet = JSON.parse(cachedData5);
const ris_ieri_lingue = ris_ieri_lingueDataSet;
const ris_ieri_lingue_1DataSet = JSON.parse(cachedData6);
const ris_ieri_lingue_1 = ris_ieri_lingue_1DataSet;

const ris_ieri_lingue_2DataSet = JSON.parse(cachedData7);
const ris_ieri_lingue_2 = ris_ieri_lingue_2DataSet;

const ris_ieri_lingue_3DataSet = JSON.parse(cachedData8);
const ris_ieri_lingue_3 = ris_ieri_lingue_3DataSet;

SetInfoBottomBtns("initialGraph");
// LANGUAGES
if (languagesAPI.length < 1) {
  languagesAPI = localStorage.getItem("languagesAPI");
}
languagesAPI = JSON.parse(languagesAPI);
const luanguagesSet = languagesAPI;
const languages = luanguagesSet;

//Global Reference for Back:
window.IERI_Stack = null;
window.PrevSideContent = null;
window.PrevSideContent2 = null;

function orderData() {
  RisonanzeIeri.forEach((r) => {
    RisonanzeSecolo.forEach((s) => {
      if (r.secolo_nascita == s.id) {
        r.secolo_nascita = s.secolo;
      }
    });
  });

  RisonanzeIeri.sort((a, b) => {
    if (a.secolo_nascita !== null && b.secolo_nascita !== null) {
      const [aDay, aMonth] = a.secolo_nascita.split("_").map(Number);
      const [bDay, bMonth] = b.secolo_nascita.split("_").map(Number);

      if (aDay !== bDay) {
        return aDay - bDay;
      } else if (aMonth !== bMonth) {
        return aMonth - bMonth;
      } else {
        return a.titolo.localeCompare(b.titolo);
      }
    } else {
      return a.secolo_nascita !== null ? -1 : 1;
    }
  });
}

//Checksssss
function CheckLanColors() {
  var Exceptions = [];

  RisonanzeIeri.forEach((r) => {
    if (typeof colors[r.linguamadre.toLowerCase()] == "undefined") {
      Exceptions.push(r.linguamadre.toLowerCase());
    }

    var _languages = [...new Set(r.languages)];
    _languages.forEach((l) => {
      if (typeof colors[l.toLowerCase()] == "undefined") {
        Exceptions.push(l.toLowerCase());
      }
    });
  });
  Exceptions = [...new Set(Exceptions)];
}

function CheckEmtpyColors() {
  RisonanzeIeri.forEach((r) => {
    r.languages.forEach((l) => {
      if (l == "") {
      } else {
      }
    });
  });
}

//const delay = ms => new Promise(res => setTimeout(res, ms));

var imgCentral = document.getElementById("CentralImgRing");
if(imgCentral==null){
imgCentral.style.display = "block";
}
async function CheckImages() {
  for (const r of RisonanzeIeri) {
    await delay(100);
    imgCentral.src = "Images/RisonanzeIeri/" + r.image + ".jpg";
  }
}

//END CHECKS

//SETUP Called From SetUpData.js
function SetUpDataMapIeri() {
  var SetuppedDictNationsIeri = {};
  for (const [nationSigla, nationName] of Object.entries(Dict_SiglaNations)) {
    var ListOfRisonanzeIeriForThisNation =
      ReturnForSetUpDataForNation(nationName);
    SetuppedDictNationsIeri[nationSigla] = ListOfRisonanzeIeriForThisNation;
  }
  DictNationsIeri_Set = SetuppedDictNationsIeri;
}

function ReturnForSetUpDataForNation(nationName) {
  var ListOfThisNation = [];
  let luoghiCache = localStorage.getItem("luoghiData");
  let luoghi = JSON.parse(luoghiCache);
  // for (let key in ReferenceDictionary) {
  //   if (ReferenceDictionary.hasOwnProperty(key)) {
  //     ReferenceDictionary[key].forEach(element => {
  //       luoghi.forEach(element2 => {
  //         if(element2.id==element.luogo_nascita){
  //           element.nazione=element2.stato
  //         }

  //       });
  //       });
  //   }
  // }
  RisonanzeIeri.forEach((r) => {
    luoghi.forEach((element2) => {
      if (element2.id == r.luogo_nascita) {
        r.nazione = element2.stato;
        if (r.color == undefined || r.color == null)
          r.color = element2.colore_stato;
      }
    });
    try {
      if (r.nazione.toLowerCase() == nationName) {
        ListOfThisNation.push(r);
      }
    } catch (error) {}
  });
  return ListOfThisNation;
}
//END SETUP
function OnClickFromChartIERI(el, chart) {
  if (chart.canvas.id == "myChart") {
    const cachedData = localStorage.getItem("dataArea");
    let areaData = JSON.parse(cachedData);
    window.IERI_Stack = "chart";
    var areaSelected = chart.config.data.labels[el[0].index];
areaSelectedFinal=areaSelected

    ElIeriTest = el;
    ChartIeriTest = chart;
    var ListRisonanzeIeriSelectedByLanguage =
      // ReturnRisonanzeIeriFromLanguageSelected(areaSelected);
      // CreateOrUpdateListNames(ListRisonanzeIeriSelectedByLanguage);
      SetInfoBottomBtns("ListFromChart");
    SetDescChartA("Lingue Madri dei personaggi storici");
    SetDescChartB(
      "Personaggi che hanno come area linguistiche: " +
        areaSelected.toUpperCase()
    );

    if (window.myChart2 !== null) {
      window.myChart2.destroy();
    }
    let risonanzeWithArea = RisonanzeIeri;
    risonanzeinThatArea = [];
    risonanzeWithArea.forEach((element) => {
      area_geo.forEach((element2) => {
        if (
          element.area_geografico_linguistica == element2.id &&
          element2.area_geografico_linguistica == areaSelected
        ) {
          risonanzeinThatArea.push(element);
        }
      });
    });

    var languages = ReturnListOfLanguages2(risonanzeinThatArea);

    var content =
      `<p>Stai visualizzando un totale di <b>` +
      languages.length +
      ` lingue madre</b><br>
   che appartengono all'area della: <b>` +
      areaSelected.toUpperCase() +
      `</b></p>`;
    SetUISideHeader(content);

    callCreateGraphic(risonanzeinThatArea);
  } else {
    window.IERI_Stack = "chart";

    var languageSelected = chart.config.data.labels[el[0].index];
    ElIeriTest = el;
    ChartIeriTest = chart;
    var ListRisonanzeIeriSelectedByLanguage =
      ReturnRisonanzeIeriFromLanguageSelected(languageSelected);
    CreateOrUpdateListNames(ListRisonanzeIeriSelectedByLanguage);
    HideMap();
    SetInfoBottomBtns("ListFromChart");
    SetDescChartA("Lingue Madri dei personaggi storici");
    SetDescChartB(
      "Personaggi che hanno come lingua madre: " +
        languageSelected.toUpperCase()
    );

    var content =
      `<p>Stai visualizzando un totale di <b>` +
      ListRisonanzeIeriSelectedByLanguage.length +
      ` personaggi </b><br>
   che hanno come lingua madre: <b>` +
      languageSelected.toUpperCase() +
      `</b></p>`;
    SetUISideHeader(content);
    SetUISideHeader2('');

  }
  //BottomBtn_SX_IERI
  //ChangeBtns.. and desc.. and sideInfo...
}

function SetInfoBottomBtns(mode) {
  var BtnDx = document.getElementById("BottomBtn_DX_IERI");
  var BtnSx = document.getElementById("BottomBtn_SX_IERI");
  if (mode == "ListFromChart") {
    BtnDx.src = "Images/pngs/Btns/SelPersonaggio_IERI.png";
    BtnSx.src = "Images/pngs/Btns/SelMadri_IERI.png";
  }
  if (mode == "ListFromMap") {
    BtnDx.src = "Images/pngs/Btns/SelPersonaggio_IERI.png";
    BtnSx.src = "Images/pngs/Btns/SelNazione_Ieri.png";
  }
  if (mode == "initialGraph") {
    BtnSx.src = "Images/pngs/Btns/SelMadri_IERI.png";
    BtnDx.src = "Images/pngs/Btns/SelNazione_Ieri.png";
  }
  if (mode == "Ring") {
    BtnDx.src = null;
    BtnSx.src = "Images/pngs/Btns/TapRing_IERI.png";
  }
}
async function callCreateGraphic(data) {
  let resultChart;
  //debug Purpose:
  // if(data==null){data=SingleSetRisonanzeOggi.Risonanze1;}
  resultChart = await GetInfoFromData2(data);

  resultChart = dataFormattedTest;

  if (window.domain == "OGGI") {
    InfoChart_Global = resultChart.dataChart;
    DictLan_Info_Global = resultChart.DictLan_Info;
  }
  document.getElementById("ChartContainerB2").style.display = "block";
  document.getElementById("ChartContainerB").style.display = "none";
  if (window.myChart2) {
    window.myChart2.destroy();
  }
  try {
    createChartLingue(resultChart.dataChart);
  } catch (error) {}
}
function groupMby2(languages, data, param) {
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
function ReturnListOfLanguages2(data) {
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
async function GetInfoFromData2(data) {
  //var data = SingleSetRisonanzeOggi.Risonanze3_max;

  //raccolgo tutte le lingue
  var languages = ReturnListOfLanguages2(data);
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
    if (myObject && myObject.hasOwnProperty("lingua")) {
      labels.push(myObject.lingua);
    }
    dataNumbers.push(Info.count);

    //Aggiungo info.color:
    if (Array.isArray(Info.languages)) {
      var ListmultiLingue = [];
      Info.languages.forEach((lan) => {
        ListmultiLingue.push(lan);
      });
      const Pattern = await CreatePattern(ListmultiLingue);
      Info.color = Pattern;
    } else {
      Info.color = window.colors[key];
    }
    if (myObject && myObject.hasOwnProperty("colors")) {
      colors.push(myObject.colors);
    }
  }
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
function CreateOrUpdateListNames(ListOfRisoIeri) {
  const cachedData = localStorage.getItem("area_geo");
  let areaData = JSON.parse(cachedData) || [];

  var container = document.getElementById("ListOfNamesContainer");
  container.innerHTML = '';

  ListOfRisoIeri.sort((a, b) => {
    let cognomeA = (a.cognome || "").toLowerCase();
    let cognomeB = (b.cognome || "").toLowerCase();
    return cognomeA.localeCompare(cognomeB);
  });

  ListOfRisoIeri.forEach((elem) => {
    var elementHTML = '';
    var foundMatchingArea = false;

    areaData.forEach((area) => {
      console.log(area)
      if (
        // areaSelectedFinal == area.area_geografico_linguistica &&
        elem.area_geografico_linguistica == area.id
      ) {
        elementHTML += `
          <div style="border-color:${area.color};border-width:5px;border-style: solid;" 
               onclick="OnClickFromName(${elem.id})" 
               class="NameIeriItem" id="${elem.id}">
            ${elem.titolo}
          </div>`;
        foundMatchingArea = true;
      }
    });



    container.innerHTML += elementHTML;
  });

  container.style.display = "block";
  container.scrollTop = 0;
}


function ReturnRisonanzeIeriFromLanguageSelected(lan) {
  var ListResult = [];

  var languageObject = languages.find((language) => language.lingua == lan);

  if (languageObject) {
    RisonanzeIeri.forEach((r) => {
      if (r.lingua_madre === languageObject.id) {
        ListResult.push(r);
      }
    });
  } else {
  }

  return ListResult;
}
hideLingueGraph();
function OnClickFromName(id,popup) {
  if(popup){
    clickedFromPopup = true;
  }else{
    clickedFromPopup = false;
  }
  CanStartRing = true;
  //Hide Stuff
  closePopUp()
  HideWithoutDestroyMadriChart2();
  HideWithoutDestroyMadriChart();
  HideWithoutDestroyListNames();
  HideMap();
  var el = ReturnRisonanzaIeriById(id);
  //Get RINGS:
  var InfoForRings = {};
  GetInfoContainerIeri(el);
  document.getElementById("descChartB").style.display = "none";
  document.getElementById("descChartA").style.display = "none";
  window.PrevSideContent = document.getElementById("HeaderSide").innerHTML;
  window.PrevSideContent = document.getElementById("HeaderSide2").innerHTML;
  SetUISideHeader(ReturnSideContentForRings(el));

  let lingue = getLangs(el);
  var CurrentRingColors = ReturnListOfColorsFromLanguages2(lingue);
  InfoForRings.colors = CurrentRingColors;
  window.parent.GetRingsIFrame(InfoForRings); //From home.js
  //Get Info:

  SetInfoBottomBtns("Ring");
  if (el.img !== null) {
    var imgCentral = document.getElementById("CentralImgRing");
    imgCentral.src = apiUrl + "/assets/" + el.img;
    imgCentral.style.display = "block";
  }
}

function ReturnListOfColorsFromLanguages(languagesA) {
  var CurrentRingcolors = new Set();

  languages.forEach((element) => {
    languagesA.forEach((element2) => {
      if (
        element.lingua.toLowerCase() == element2.toLowerCase() &&
        element.colors !== null
      ) {
        CurrentRingcolors.add(element.colors);
      }
    });
  });
  var uniqueColorsArray = Array.from(CurrentRingcolors);

  return uniqueColorsArray;
}
function ReturnListOfColorsFromLanguages2(languagesA) {
  var CurrentRingcolors = [];
  languages.forEach((element) => {
    languagesA.forEach((element2) => {
      console.log(element)
      console.log(element2)
      if (
        element.lingua.toLowerCase() == element2.toLowerCase() &&
        element.colors !== null
      ) {
        CurrentRingcolors.push(element.colors);
      }
    });
  });

  return CurrentRingcolors;
}
function ReturnSideContentForRings(el) {
  let lingue = getLangs(el);

  var ItemsColorLegends = ReturnListOfItemsColorLegend(lingue);
  var content = `<p>Stai visualizzando una <b>Infografica generativa</b><br></p>`;
  content +=
    `<p>Questi anelli si creano in maniera casuale,<br> assumendo i colori delle lingue parlate da:<br><b>` +
    el.titolo +
    `</b>.</br>`;
  content += ItemsColorLegends;
  return content;
}

function getLangs(el) {
  function convertToNonArray(value) {
    if (Array.isArray(value)) {
      return value.filter((item) => item !== null && item !== undefined);
    }
    return [value];
  }

  let lingueArrays = [
    convertToNonArray(el.lingua_arte),
    convertToNonArray(el.lingua_scuola),
    convertToNonArray(el.lingua_madre),
    convertToNonArray(el.lingua_quotidiana),
    convertToNonArray(el.lingue_apprese),
  ];

  function convertToNonArray(str) {
    if (Array.isArray(str)) {
      return str.map((item) => item.trim());
    } else if (typeof str === "string") {
      return str.trim();
    } else {
      return str;
    }
  }

  let lingue = []
    .concat(...lingueArrays)
    .filter((item) => item !== null && item !== undefined);

  return lingue;
}

function ReturnListOfItemsColorLegend(languagesA) {
  var orderL = ReturnOrdinate(languagesA);
  var _languages = [...new Set(orderL)];

  var CurrentRingcolors = [];
  languages.forEach((element) => {
    _languages.forEach((element2) => {
      if (
        element.lingua.toLowerCase() == element2.toLowerCase() &&
        element.colors !== null
      ) {
        let data = { lan: element2, color: element.colors };
        CurrentRingcolors.push(data);
      }
    });
  });
  var CollectionHTML = ``;
  CurrentRingcolors.forEach((lingua) => {
    var htmlEl =
      `<div class="ItemColorLegend">` +
      `<div class="ColorDot" style='background:` +
      lingua.color +
      `'></div>` +
      `<p>` +
      lingua.lan.toUpperCase() +
      `</p></div>`;
    CollectionHTML = CollectionHTML.concat(htmlEl);
  });
  return CollectionHTML;
}

function ReturnOrdinate(languages) {
  orderLan = [];
  languages.forEach((l) => {
    var _l = { lan: l.toLowerCase() };
    _l.count = getOccurrence(languages, l);
    orderLan.push(_l);
  });
  orderLan.sort(function (a, b) {
    return parseInt(b.count) - parseInt(a.count);
  });
  var _orderLan = [];
  orderLan.forEach((element) => {
    _orderLan.push(element.lan);
  });
  return _orderLan;
}

function getOccurrence(array, value) {
  var count = 0;
  array.forEach((v) => v === value && count++);
  return count;
}
async function fetchRelationDataCharacter(el) {
  const response1 = await fetch(`${apiUrl}/items/ris_ieri_luoghi_1/?limit=-1`);
  const response2 = await fetch(`${apiUrl}/items/attivita/?limit=-1`);
  const response3 = await fetch(
    `${apiUrl}/items/area_geografico_linguistica/?limit=1&filter[id][_eq]=${el.area_geografico_linguistica}`
  );
  const response4 = await fetch(
    `${apiUrl}/items/ris_ieri_attivita/?limit=-1&filter[ris_ieri_id][_eq]=${el.id}`
  );

  const data = await response1.json();
  let relationalLuoghi = data.data;
  const data2 = await response2.json();
  let attivita = data2.data;

  const data3 = await response3.json();
  let area_geografico_linguistica = data3.data[0];

  const data4 = await response4.json();
  let ris_ieri_attivita = data4.data;
  // ATTIVITA
  let filteredElements = ris_ieri_attivita.filter(function (item) {
    return item.ris_ieri_id === el.id;
  });

  let attivitaIds = filteredElements.map(function (item) {
    return item.attivita_id;
  });

  let matchedAttivita = attivita.filter(function (item) {
    return attivitaIds.includes(item.id);
  });

  let attivitaNames = matchedAttivita.map(function (item) {
    return ` ${item.attivita}`;
  });
  // LUOGO RESIDENZA
  let filteredLuoghi = relationalLuoghi.filter(function (item) {
    return item.ris_ieri_id === el.id;
  });
  let luoghiIds = filteredLuoghi.map(function (item) {
    return item.luoghi_id;
  });
  let matchedLuoghi = luoghi.filter(function (item) {
    return luoghiIds.includes(item.id);
  });
  let luoghiNames = matchedLuoghi.map(function (item) {
    return " " + item.nome + " (" + item.stato + ")";
  });

  document.getElementById("area_geografico_linguistica").innerText =
    area_geografico_linguistica.area_geografico_linguistica;
  document.getElementById("attivita").innerText = attivitaNames;
  document.getElementById("luogo_residenza").innerText = luoghiNames;
  document.getElementById("CentralImgRing").src =
    "https://www.directuseurotales.ambientinarratividigitali.it/assets/" +
    el.img;
}
function GetInfoContainerIeri(el) {
  fetchRelationDataCharacter(el);
  SetInfoBottomBtns("Ring");
  //Titolo
  var Title = document.getElementById("TitlePersonaggioIERI");
  Title.innerHTML = el.titolo.toUpperCase();
  Title.style.display = "block";
  //Descizione:
  var InfoContainer = document.getElementById("ContainerInfoIeri");
  // QUO ris_ieri_lingue
  let el_quotidiane_relations = [];
  let el_quotidiane = [];

  ris_ieri_lingue.forEach((element) => {
    if (el.id == element.ris_ieri_id) {
      el_quotidiane_relations.push(element);
    }
  });
  el_quotidiane_relations.forEach((element) => {
    languages.forEach((element2) => {
      if (element2.id == element.lingue_id) {
        el_quotidiane.push(element2.lingua);
      }
    });
  });

  let el_scuola_relations = [];
  let el_scuola = [];

  ris_ieri_lingue_1.forEach((element) => {
    if (el.id == element.ris_ieri_id) {
      el_scuola_relations.push(element);
    }
  });
  el_scuola_relations.forEach((element) => {
    languages.forEach((element2) => {
      if (element2.id == element.lingue_id) {
        el_scuola.push(element2.lingua);
      }
    });
  });

  let el_arte_relations = [];
  let el_arte = [];

  ris_ieri_lingue_2.forEach((element) => {
    if (el.id == element.ris_ieri_id) {
      el_arte_relations.push(element);
    }
  });
  el_arte_relations.forEach((element) => {
    languages.forEach((element2) => {
      if (element2.id == element.lingue_id) {
        el_arte.push(element2.lingua);
      }
    });
  });
  let el_apre_relations = [];
  let el_apre = [];

  ris_ieri_lingue_3.forEach((element) => {
    if (el.id == element.ris_ieri_id) {
      el_apre_relations.push(element);
    }
  });
  el_apre_relations.forEach((element) => {
    languages.forEach((element2) => {
      if (element2.id == element.lingue_id) {
        el_apre.push(element2.lingua);
      }
    });
  });
  let luogo_morte = luoghi.find((element) => element.id === el.luogo_morte);
  console.log(el)
  var content =
    "<div class='contentWrapper'><img id='CentralImgRing'><div class='textContainer'><br>";
  // if (el.nome !== null) {
  //   content += `Nome: <b>${el.nome}</b><br>`;
  // }
  // if (el.cognome !== null) {
  //   content += `Cognome: <b>${el.cognome}</b><br><br>`;
  // }
  // if (el.genere !== null) {
  //   content += `
  //   Genere: <b>${el.genere}</b><br>`;
  // }
  if (el.date_nascita !== null) {
    content += `
    Data di nascita: <b>${el.date_nascita}</b><br>`;
  }
  if (el.luogo_nascita !== null) {
  let luogo_nascita = luoghi.find(
    (element) => element.id === el.luogo_nascita
  );
  if (luogo_nascita) {
    let statoNascita = luogo_nascita.stato ? ` (${luogo_nascita.stato})` : "";
    content += `
    Luogo di nascita: <b>${luogo_nascita.nome}${statoNascita}</b><br>`;
  }
}

if (el.data_morte !== null && el.data_morte !== undefined) {
  content += ` Data di morte: <b>${el.data_morte}</b><br>`;
}

if (luogo_morte !== null && luogo_morte !== undefined) {
  let statoMorte = luogo_morte.stato ? ` (${luogo_morte.stato})` : "";
  content += `Luogo della morte: <b>${luogo_morte.nome}${statoMorte}</b><br> </div></div>`;
} else {
  content += "</div></div>";
}


  if (el.attivita !== null) {
    content += `<br>Attività

: <b><span id="attivita">${el.attivita}</span></b><br>`;
  }

  if (el.luogo_residenza !== null) {
    content += `
  Luogo di residenza principale: <b><span id="luogo_residenza">${el.luogo_residenza}</span></b><br>`;
  }

  if (el.lingua_madre !== null) {
    if (typeof el.lingua_madre === "number") {
      let lingua_madre = languages.find(
        (element) => element.id === el.lingua_madre
      );

      el.lingua_madre = lingua_madre.lingua;
    }

    content += `Lingua madre: <b>${el.lingua_madre}</b><br>`;
  }

  if (el_quotidiane !== null) {
    el.lingua_quotidiana = el_quotidiane.map((item) => ` ${item}`);

    const formattedQuotidiane = el.lingua_quotidiana.join(", ");

    content += `Lingua/e quotidiana/e: <b>${formattedQuotidiane}</b><br>`;
  }

  if (el_scuola !== null) {
    // Map through el_scuola array and add a space before each element
    el.lingua_scuola = el_scuola.map((item) => ` ${item}`);

    // Join the array into a string with commas and spaces
    const formattedScuola = el.lingua_scuola.join(", ");

    content += `Lingua istruzione: <b>${formattedScuola}</b><br>`;
  }

  if (el_arte !== null) {
    // Map through el_arte array and add a space before each element
    el.lingua_arte = el_arte.map((item) => ` ${item}`);

    // Join the array into a string with commas and spaces
    const formattedArte = el.lingua_arte.join(", ");

    content += `Lingua arte: <b>${formattedArte}</b><br>`;
  }

  if (el_apre !== null) {
    el.lingue_apprese = el_apre;
    let lingSq = el_apre.map((item) => ` ${item}`);

    // Join the array into a string with commas and spaces
    const formattedApre = lingSq.join(", ");
    content += `Altre lingue utilizzate o apprese: <b>${formattedApre}</b> <br>`;
  }

  if (el.area_geografico_linguistica !== null) {
    content += `Area linguistica

: <b><span id="area_geografico_linguistica">${el.area_geografico_linguistica}</span></b> </div></div>`;
  }

  if (el.testo !== null) {
    content += `
    <br><br>
    <p>${el.testo}<br><br></p> `;
  }
  if (el.bibliografia !== null) {
    content += `
      <b>Bibliografia:</b><br>
      <p>${el.bibliografia}</p><br><br>`;
  }
  if (el.bibliografia !== null) {
    content += `
        Autore della scheda: <b>${el.autore}</b>
         `;
  }

  content += "<br>";
  InfoContainer.innerHTML = content;
  InfoContainer.style.display = "block";
  InfoContainer.scrollTop = 0;
}

function isOk(input) {
  isok = false;

  if (typeof input != "undefined") {
    if (input != null && input != "" && input != "") {
      isok = true;
    }
  }
  return isok;
}

function ReturnRisonanzaIeriById(id) {
  var result = null;
  RisonanzeIeri.forEach((element) => {
    if (element.id == id) {
      result = element;
    }
  });
  return result;
}

function HideWithoutDestroyListNames() {
  document.getElementById("ListOfNamesContainer").style.display = "none";
}

function ReturnElementFromId(id) {
  return;
}
/*
function OnClickFromMap(index)
{
   //HideChart();
   //MoveMap();
  
}
*/

/*
//From IFrameRing call parent function:
function OnBackFromRingIFrame(){}
function BackToIeriHome()
{
   //HideChart();
   //HideMap();
   //HideList();
}

function ManageBackBtn()
{

}
*/
