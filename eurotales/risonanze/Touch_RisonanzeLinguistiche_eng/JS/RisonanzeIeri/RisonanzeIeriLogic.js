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
    const response = await fetch(`${apiUrl}/items/ris_ieri/?limit=-1&filter[stato][_eq]=4`);
    const response2 = await fetch(`${apiUrl}/items/lingue/?limit=-1`);
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

    orderData();
  } catch (error) {
    console.error("Error:", error);
  }
}

const RisonanzeIeriSet = JSON.parse(cachedData);
const RisonanzeIeri = RisonanzeIeriSet;

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
      //  console.log("DA AGGIUNGERE: " + r.linguamadre)
      Exceptions.push(r.linguamadre.toLowerCase());
    }

    var _languages = [...new Set(r.languages)];
    _languages.forEach((l) => {
      if (typeof colors[l.toLowerCase()] == "undefined") {
        //  console.log("In "+ r.titolo +": DA AGGIUNGERE: " + l)
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
imgCentral.style.display = "block";

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
    // console.log(ListOfRisonanzeIeriForThisNation);
    SetuppedDictNationsIeri[nationSigla] = ListOfRisonanzeIeriForThisNation;
  }
  DictNationsIeri_Set = SetuppedDictNationsIeri;
}

function ReturnForSetUpDataForNation(nationName) {
  var ListOfThisNation = [];

  RisonanzeIeri.forEach((r) => {
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
  window.IERI_Stack = "chart";

  var languageSelected = chart.config.data.labels[el[0].index];
  ElIeriTest = el;
  ChartIeriTest = chart;
  var ListRisonanzeIeriSelectedByLanguage =
    ReturnRisonanzeIeriFromLanguageSelected(languageSelected);
  CreateOrUpdateListNames(ListRisonanzeIeriSelectedByLanguage);
  HideMap();
  SetInfoBottomBtns("ListFromChart");
  SetDescChartA("Mother tongues of historical characters");
  SetDescChartB(
    "Characters whose mother tongue is: " + languageSelected.toUpperCase()
  );

  var content =
    `<p>You are viewing a total of <b>` +
    ListRisonanzeIeriSelectedByLanguage.length +
    ` characters </b><br>
    whose mother tongue is: <b>` +
    languageSelected.toUpperCase() +
    `</b></p>`;
  SetUISideHeader(content);
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

function CreateOrUpdateListNames(ListOfRisoIeri) {
  var container = document.getElementById("ListOfNamesContainer");
  container.innerHTML = null;
  ListOfRisoIeri.forEach((elem) => {
    var elementHTML =
      `<div onclick="OnClickFromName(` +
      elem.id +
      `)" class="NameIeriItem" id="` +
      elem.id +
      `">
    ` +
      elem.titolo +
      `
    </div>`;
    container.innerHTML += elementHTML;
  });

  container.style.display = "block";
  container.scrollTop = 0;
}

function ReturnRisonanzeIeriFromLanguageSelected(lan) {
  var ListResult = [];

  var languageObject = languages.find((language) => language.language == lan);

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

function OnClickFromName(id) {
  CanStartRing = true;
  //Hide Stuff
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
  SetUISideHeader(ReturnSideContentForRings(el));



  let lingue=getLangs(el)
  console.log(lingue)
  var CurrentRingColors = ReturnListOfColorsFromLanguages2(lingue);
  console.log(CurrentRingColors)
  InfoForRings.colors = CurrentRingColors;
  window.parent.GetRingsIFrame(InfoForRings); //From home.js
  //Get Info:

  
  SetInfoBottomBtns("Ring");
  if (el.img !== null) {
    var imgCentral = document.getElementById("CentralImgRing");
    imgCentral.src = apiUrl+'/assets/'+el.img;
    imgCentral.style.display = "block";
  }
}

function ReturnListOfColorsFromLanguages(languagesA) {
  var CurrentRingcolors = new Set();

  languages.forEach(element => {
    languagesA.forEach(element2 => {
      if((element.language.toLowerCase() == element2.toLowerCase()) &&(element.colors !== null)){
        CurrentRingcolors.add(element.colors)
      }
    });
  });
  var uniqueColorsArray = Array.from(CurrentRingcolors);

  return uniqueColorsArray;
}
function ReturnListOfColorsFromLanguages2(languagesA)
{
   var CurrentRingcolors =[];
   try {
    
   
   languages.forEach(element => {
    languagesA.forEach(element2 => {
      console.log(element)
      if((element.language.toLowerCase() == element2.toLowerCase()) && (element.colors !== null)){
        CurrentRingcolors.push(element.colors)
      }
    });
  });
} catch (error) {
    
}
console.log(CurrentRingcolors)
  return CurrentRingcolors;
}
function ReturnSideContentForRings(el) {

  let lingue = getLangs(el)

  var ItemsColorLegends = ReturnListOfItemsColorLegend(lingue);
  var content = `<p>You are viewing a <b>generative Infographic</b><br></p>`;
  content +=
    `<p>These rings are created randomly,<br> taking on the colours of the languages spoken by:<br><b>` +
    el.title +
    `</b>.</br>`;
  content += ItemsColorLegends;
  return content;
}

function getLangs(el){
  function convertToNonArray(value) {
    if (Array.isArray(value)) {
      return value.filter(item => item !== null && item !== undefined);
    }
    return [value];
  }

  let lingueArrays = [
    convertToNonArray(el.lingua_arte),
    convertToNonArray(el.lingua_madre),
    convertToNonArray(el.lingua_quotidiana),
    convertToNonArray(el.lingue_apprese)
  ];

  let lingue = [].concat(...lingueArrays).filter(item => item !== null && item !== undefined);

  
  return lingue
}


function ReturnListOfItemsColorLegend(languagesA) {
  console.log(languagesA)

  var orderL = ReturnOrdinate(languagesA);
  var _languages = [...new Set(orderL)];
  console.log(_languages)

  var CurrentRingcolors = []

  languages.forEach(element => {

    _languages.forEach(element2 => {
      try {
        if((element.language.toLowerCase() == element2.toLowerCase()) && (element.colors !== null)){
          let data={lan:element2,color:element.colors}
          CurrentRingcolors.push(data)
        }
      } catch (error) {
        
      }
     
    });
  });

 
  


  var CollectionHTML = ``;
  CurrentRingcolors.forEach((language) => {
      var htmlEl =
        `<div class="ItemColorLegend">` +
        `<div class="ColorDot" style='background:` +
        language.color +
        `'></div>` +
        `<p>` +
        language.lan.toUpperCase() +
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

function GetInfoContainerIeri(el) {
  console.log(el)
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
        el_quotidiane.push(element2.language);
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
        el_scuola.push(element2.language);
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
        el_arte.push(element2.language);
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
        el_apre.push(element2.language);
      }
    });
  });


  var content = "<div class='contentWrapper'><img id='CentralImgRing'><div class='textContainer'><br>";
  if (el.name !== null) {
    content += `Name: <b>${el.name}</b><br>`;
  }
  if (el.surname !== null) {
    content += `Surname: <b>${el.surname}</b><br><br>`;
  }
  if (el.gender !== null) {
    content += `
    Genre: <b>${el.gender}</b><br>`;
  }
  if (el.date_nascita !== null) {
    content += `
    Date of birth: <b>${el.date_nascita}</b><br>`;
  }
  if (el.luogo_nascita !== null) {
    let luogo_nascita = luoghi.find(
      (element) => element.id === el.luogo_nascita
    );
    content += `
    Place of birth: <b>${luogo_nascita.nome} (${luogo_nascita.stato})</b><br>`;
  }
  if (el.data_morte !== null) {
    let luogo_morte = luoghi.find((element) => element.id === el.luogo_morte);
    content += ` Date of death: <b>${el.data_morte}</b><br>
    Place of death: <b>${luogo_morte.nome} (${luogo_morte.stato})</b><br>
      `;
  }
  if (el.known_residences !== null) {
    content += `<br>
    Main place of residence: <b>${el.known_residences}</b><br>`;
  }

  if (el.lingua_madre !== null) {
    if (typeof el.lingua_madre === 'number') {
    let lingua_madre = languages.find(
      (element) => element.id === el.lingua_madre
    );

    el.lingua_madre=lingua_madre.language
    }
   
    content += `Mother tongue: <b>${el.lingua_madre}</b><br>`;
  }
  if (el_quotidiane !== null) {
    el.lingua_quotidiana=el_quotidiane
    content += `Language(s) of everyday use: <b>${el_quotidiane}</b><br>`;
  }
  if (el_scuola !== null) {
    el.lingua_scuola=el_scuola
    content += `Language used in school learning: <b>${el_scuola}</b><br>`;
  }
  if (el_arte !== null) {
    el.lingua_arte=el_arte
    content += `Language of Art: <b>${el_arte}</b><br>`;
  }
  if (el_apre !== null) {
    el.lingue_apprese=el_apre
    content += `Other languages used or learned: <b>${el_apre}</b> </div></div>`;
  }
  if (el.text !== null) {
    content += `
    <br><br>
    <p>${el.text}<br><br></p> ` }
    if (el.bibliografia !== null) {
      content += `
      <b>Bibliography:</b><br>
      <p>${el.bibliografia}</p><br><br>` }
      if (el.bibliografia !== null) {
        content += `
        Author: <b>${el.autore}</b>
         `; }

         content +='<br>'
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
