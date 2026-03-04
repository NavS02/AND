//https://timeline.knightlab.com/docs/json-format.html#json-slide
//'https://docs.google.com/spreadsheets/d/1cWqQBZCkX9GpzFtxCWHoqFXCHg-ylTVUWlnrdYMzKUI/pubhtml',additionalOptions

//SECURITY:
var CanClick = false;
var MaxLanguagesInTimeLine = 5;
var MinLanguagesInTimeLine = 1;
var MaxRowsFilter = 8;
var MaxColumnsFilter = 4;

let actualColumnsUsed = 0;
let actualRowsUsed = 0;
let rowsColumn1 = 0;
let rowsColumn2 = 0;
let rowsColumn3 = 0;
let rowsColumn4 = 0;
let currentCat = "";
//StarterLanguages for timeline Setup
let StarterLanguages = ["italiano", "inglese"];
var CurrentLanguagesInTimeLine = StarterLanguages.length;
//GLOABAL AND STATIC REFERENCE
var Milestones;
var MilestonesOriginal;
let starterData = null;
var lingue;
var categorie;
var Colors;
const apiUrl = "https://www.directuseurotales.ambientinarratividigitali.it";
let MilestonesString;
var activeElements = [];
var firstFilter = true;
window.LastIndex = null;
let currentLanguages;

//I colori (lingue) da mostrare nei filtri:
var FiltersDict_Lan_Colors = {};

//STARTER SETUP OF DATA FOR TIMELINE
var StarterTimeLineData = {};
//GLOBAL REFERENCE TO TIMELINE
var timeLine;

//famiglie linguistiche:
let languageSelected = [];
var CeppiLinguistici = {};
CeppiLinguistici["latina"] = [
  "francese",
  "italiano",
  "portoghese",
  "romeno",
  "spagnolo",
];
CeppiLinguistici["anglosassone"] = ["inglese", "tedesco"];
CeppiLinguistici["slava"] = [
  "ceco",
  "croato",
  "polacco",
  "russo",
  "serbo",
  "sloveno",
  "ucraino",
];
CeppiLinguistici["greca"] = ["greco"];
CeppiLinguistici["ebraica"] = ["ebraico", "yiddish"];
CeppiLinguistici["ugrofinnico"] = ["ungherese"];

/*
Properties:
id
nome
categoria
luogo
dataOriginale
descrizione
lingua
data
*/

/*CREDITI*/
function GetPopUpCredits() {
  document.getElementById("PopupCreditsFull").style.display = "block";
  document.getElementById("BackBtn_FromCreditsFull").style.display = "block";
}
function BackFromCreditsFullScreen() {
  document.getElementById("PopupCreditsFull").style.display = "none";
  document.getElementById("BackBtn_FromCreditsFull").style.display = "none";
}

var additionalOptions = {
  //font: 'timeline3/css/fonts/font.bitter-raleway.css'
  duration: "1",
  default_bg_color: "#47474724",
  font: "https://eurotales.eu/wp-content/themes/emaurri/timeline/TimeLine/MyCustomFont.css",
  // debug: true,
  //  hash_bookmark: false,
  // is_embed:false,
  // timenav_height:1000,
  // marker_height_min:100,
  timenav_height_percentage: 90, //70
  //   timenav_mobile_height_percentage:40, //50
  //   marker_width_min: 100,
  //  marker_padding: 5,
  // language: JSON.parse(MyItaString),
  //    start_date: '2800',
  //zoom_sequence:[0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
  //initial_zoom:0,
  dragging: false,
};

async function SetUpTimeLine(refreshChekbox) {
  const response = await fetch(
    `${apiUrl}/items/timeline/?limit=-1&filter[stato][_eq]=3`
  );
  const response2 = await fetch(`${apiUrl}/items/timeline_lingua/?limit=-1`);
  const response3 = await fetch(`${apiUrl}/items/timeline_categoria/?limit=-1`);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  if (!response2.ok) {
    throw new Error(`Error: ${response2.statusText}`);
  }
  if (!response3.ok) {
    throw new Error(`Error: ${response3.statusText}`);
  }
  const data = await response.json();
  MilestonesOriginal = data.data;

  if (Milestones == null) {
    Milestones = data.data;
  }
  const data2 = await response2.json();
  lingue = data2.data;
  const data3 = await response3.json();
  categorie = data3.data;
  let categorieArray = new Set();
  MilestonesOriginal.forEach((m) => {
    lingue.forEach((l) => {
      if (m.lingua == l.id) {
        let lingua = l.lingua;
        let color = l.colore_TL;
        let textColor = l.Colore_testo;
        m.lingua = lingua;
        if (color !== undefined) {
          m["colore"] = color;
        }
        m["textColor"] = textColor;
      }
    });
    categorie.forEach((c) => {
      if (m.categoria == c.categoria || m.categoria == c.id) {
        let categoria = c.categoria;
        let categoryId = c.id;
        let isIdUnique = true;
        m.categoria = categoria;

        for (let existingCategory of categorieArray) {
          if (existingCategory.id === categoryId) {
            isIdUnique = false;
            break;
          }
        }

        if (isIdUnique) {
          categorieArray.add({ id: categoryId, cat: categoria });
        }
      }
    });
  });
  let sortedCategories = Array.from(categorieArray).sort((a, b) => a.id - b.id);
  categorieArray = sortedCategories;
  if (refreshChekbox !== false) {
    let selectionBoxes = "";
    let selectionBoxesColumn1 = "";
    let selectionBoxesColumn2 = "";

    categorieArray.forEach((c, index) => {
      const checkboxHtml =
        '<div class="checkbox-container">' +
        '<input type="checkbox" class="categoriaCheckboxes" id="categoria-' +
        c.cat +
        '" name="categoria-' +
        c.cat +
        '" value="' +
        c.cat +
        '" checked> <label for="categoria-' +
        c.cat +
        '">' +
        c.cat +
        "</label>" +
        "</div>";

      if (index % 2 === 0) {
        selectionBoxesColumn1 += checkboxHtml;
      } else {
        selectionBoxesColumn2 += checkboxHtml;
      }
    });

    document.getElementById("selectCategoriaColumn1").innerHTML =
      selectionBoxesColumn1;
    document.getElementById("selectCategoriaColumn2").innerHTML =
      selectionBoxesColumn2;
  }

  lingue.forEach((l) => {
    const area = processString(l.Area_linguistica);
    l.Area_linguistica = area;
  });

  Colors = JSON.parse(ColorsString);
  FiltersDict_Lan_Colors = GetFiltersDict_Lan_Colors();
  StarterTimeLineData = GetFilteredFromMilestones();
  SetupPopUpFilters();

  if (starterData !== null) {
    StarterTimeLineData = starterData;
  }

  timeline = new TL.Timeline(
    "timeline-container",
    StarterTimeLineData,
    additionalOptions
  );

  timeline._onTimeNavLoaded = (e) => OnLoadedTimeLine(e);
  timeline._onSlideChange = (e) => OnChangeSlide_MarkerTapped(e);

  CanClick = true;
  findActiveElements(false, null);
  setLegend();
}
function processString(inputString) {
  // Split the string into the number and the word
  const matches = inputString.match(/^(\d+(\.\d+)?)\s*(\S+)/);

  if (!matches || matches.length !== 4) {
    // Handle incorrect input format
    console.error("Incorrect input format");
    return null;
  }

  // Extract the number and the word
  const order = parseFloat(matches[1]);
  const cat = matches[3].toLowerCase();

  // Create the final object
  const resultObject = [{ order: order, cat: cat }];

  return resultObject;
}

function GetFiltersDict_Lan_Colors() {
  var _Dict = {};
  var Milestones_languages = [];
  var uniqueCombinations = new Set();
  MilestonesOriginal.forEach((m) => {
    lingue.forEach((l) => {
      if (m.lingua == l.lingua) {
        let lingua = l.lingua;
        let lanKey = lingua.toLowerCase().replace(/\s/g, "");
        let colorValue = l.colore_TL;
        let category = l.Area_linguistica;
        let combination = lanKey + "_" + colorValue;

        if (!uniqueCombinations.has(combination)) {
          uniqueCombinations.add(combination);
          Milestones_languages.push({
            lan: lanKey,
            color: colorValue,
            cat: category,
          });
        }
      }
    });
  });
  return Milestones_languages;
}

function GetFilteredFromMilestones(filter = null) {
  var TimeLineData = {};
  var events = [];
  var Languages = [];
  if (filter != null) {
    Languages = filter.Languages;
  } else {
    Languages = StarterLanguages;
  }
  Milestones.forEach((m) => {
console.log(m)
    if (Languages.includes(m.lingua.toLowerCase()) && m.Anno !== undefined) {
      var event = {};
      event.unique_id = m.id.toString();
      var event_text = {};
      event_text.headline = m.nome;
      event_text.text = m.nome;
      start_date = {};
      var safeDate = m.Anno;
      start_date.year = safeDate;
      event.text = event_text;
      event.start_date = start_date;
      events.push(event);
    }
  });
  console.log(events)
  TimeLineData.events = events;
  return TimeLineData;
}

//Invocato quando cambia la slider della timeline (cambia anche se è invisibile)
function OnChangeSlide_MarkerTapped(e) {
  //        console.log(e);
  //      console.log(CanClick)
  if (CanClick) {
    var Milestone;
    Milestones.forEach((m) => {
      if (m.id.toString() == e.unique_id.toString()) {
        Milestone = m;
      }
    });
    GetInfoPopUp(Milestone);
  }
}

function GetInfoPopUp(Milestone) {
  var srcIcon = ReturnIconCategoria(Milestone.categoria);
  // if(srcIcon==null){srcIcon=}
  let headline = "";
  if (Milestone.validita !== null) {
    headline = Milestone.Anno + " " + Milestone.validita;
  } else {
    headline = Milestone.Anno;
  }
  document.getElementById("Headline").innerHTML = headline;
  document.getElementById("Subtitle").innerHTML = Milestone.nome.toUpperCase();
  document.getElementById("ColorLanguage").style.backgroundColor =
    Milestone.colore;
  document.getElementById("LinguaLabelCurrent").innerHTML =
    Milestone.lingua.toUpperCase();
  document.getElementById("CategoriaIcon").src =
    "https://eurotales.eu/wp-content/uploads/timeline/iconsCategorie/" + srcIcon;
  document.getElementById("CategoriaLabelCurrent").innerHTML =
    Milestone.categoria.toUpperCase();
  document.getElementById("LuogoLabelCurrent").innerHTML =
    Milestone.luogo.toUpperCase();

  if (Milestone.descrizione != "") {
    if (Milestone.descrizione.length > 1) {
      document.getElementById("DescriptionContainer").style.display = "block";
      document.getElementById("DescriptionContainer").innerHTML =
        Milestone.descrizione;
    } else {
      document.getElementById("DescriptionContainer").style.display = "none";
    }
  } else {
    document.getElementById("DescriptionContainer").style.display = "none";
  }
  if (Milestone.immagine != null) {
    var img = document.getElementById("CurrentImage");

    img.style.display = "block";
    img.src = apiUrl + "/assets/" + Milestone.immagine;
    document.getElementById("InfoTextContainer").style.width = "57%";
    if (Milestone.dida != "" && typeof Milestone.dida != "undefined") {
      document.getElementById("didascaliaImmagine").style.display = "block";
      document.getElementById("didascaliaImmagine").innerHTML = Milestone.dida;
      img.classList.add("WhitDida");
    } else {
      img.classList.remove("WhitDida");
    }
  } else {
    document.getElementById("CurrentImage").src = null;
    document.getElementById("CurrentImage").style.display = "none";
    document.getElementById("InfoTextContainer").style.width = "100%";
    document.getElementById("didascaliaImmagine").style.display = "none";
  }

  //DEBUG DIDASCALIA:
  // document.getElementById("didascaliaImmagine").style.display="block";
  // document.getElementById("didascaliaImmagine").innerHTML = Milestone.didascalia;

  document.getElementById("InfoContainerPopUp").style.display = "flex";
  document.getElementById("InfoPopUpBackground").style.display = "block";
  document.getElementById("BackBtnFromInfoPopUp").style.display = "block";
  //Back btn active
}

function BackFromInfoPopUp() {
  document.getElementById("InfoContainerPopUp").style.display = "none";
  document.getElementById("InfoPopUpBackground").style.display = "none";
  document.getElementById("BackBtnFromInfoPopUp").style.display = "none";
  document.getElementById("CurrentImage").src = null;
  document.getElementById("CurrentImage").style.display = "none";
  document.getElementById("didascaliaImmagine").style.display = "none";
  window.LastIndex = timeline.current_id;
  timeline.current_id = null;
}

function ReturnIconCategoria(cat) {
  if (cat.toLowerCase().includes("attestazion")) {
    return "primeattestazioni.png";
  }
  if (cat.toLowerCase().includes("canonic")) {
    return "testicanonici.png";
  }
  if (cat.toLowerCase().includes("istituzion")) {
    return "istituzioni.png";
  }
  if (cat.toLowerCase().includes("politic")) {
    return "politici.png";
  }
  if (cat.toLowerCase().includes("media")) {
    return "media.png";
  }
  if (cat.toLowerCase().includes("genere")) {
    return "genere.png";
  } else {
    return null;
  }
}

//Invocato nel Loaded della time line e chiamato da me ogni volta che aggiungo un set di dati.

async function OnLoadedTimeLine(e) {
  SetColors();
  await delay(1000);
  timeline.goToId(1656348034036);
  timeline.goToNext();
  window.LastIndex = timeline.current_id;
  timeline.current_id = null;

  timeline.setZoom(14);
}

function SetColors(e = null) {
  timeline.config.events.forEach((event) => {
    var milestone = ReturnMilestone(event.unique_id);
    //console.log(event.unique_id);
    if (milestone != null) {
      const id = event.unique_id + "-marker";
      const color = Colors[milestone.lingua.toLowerCase()];
      //   console.log(id + " ,color: " + color );
      var el = document.getElementById(id);
      el.children[1].style["backgroundColor"] = milestone.colore;
      if (milestone.immagine !== null) {
        el.children[1].style["borderColor"] = "#bababa";
        el.children[1].style["borderWidth"] = "4px";
      }
      if (milestone.textColor == 1) {
        el.children[1].children[0].children[0].children[0].style.cssText =
          "color: white !important;";
      }
    }
  });
  //  timeline.goTo(StarterTimeLineData.events[30].unique_id);
}

var TimeLineData_EventsofThisLanguage;
//Accetta bool e stringa singola di una lingua.
function applyFilters() {
  let eventsArray=[]
  // timeline.config.events=[]
  currentLanguages.forEach((lingua) => {
    var filter = {};
    filter.Languages = [lingua];
    TimeLineData_EventsofThisLanguage = GetFilteredFromMilestones(filter);
    TimeLineData_EventsofThisLanguage.events.forEach(element => {
    eventsArray.push(element)
      
    });
  });
  CurrentLanguagesInTimeLine =currentLanguages.length

}

function ToogleThisLanguageInTimeLine(el) {
  var bool = el.dataset.isactive == "true" ? false : true;
  var Can = true;
  if (bool) {
    if (CurrentLanguagesInTimeLine == MaxLanguagesInTimeLine) {
      console.lo;
      Can = false;
    }
  }
  if (!bool) {
    if (CurrentLanguagesInTimeLine == MinLanguagesInTimeLine) {
      Can = false;
    }
  }
  console.log("bool is: " + bool);
  console.log("CAn is: " + Can);

  if (Can) {
    el.dataset.isactive = bool;
  }
  var language = el.id.toLowerCase();
  if (bool) {
    if (Can) {
      findActiveElements(true, el);
      el.children[0].className = "color_El-selected";
      el.children[1].className = "color_Label-selected";
    }
  } else {
    if (Can) {
      findActiveElements(false, el);

      el.children[0].className = "color_El";
      el.children[1].className = "color_Label";
    }
  }

  //var TimeLineData_EventsofThisLanguage;
  if (Can) {
    var filter = {};
    filter.Languages = [language];
    TimeLineData_EventsofThisLanguage = GetFilteredFromMilestones(filter);

    window.LoadIsComplete = true;
    AwaitEventsLoaded();

    if (bool) {
      // AddEventsToTimeLine(TimeLineData_EventsofThisLanguage.events);
      CurrentLanguagesInTimeLine += 1;
    } else {
      // RemoveEventsIdsFromTimeLine(TimeLineData_EventsofThisLanguage.events);
      CurrentLanguagesInTimeLine -= 1;
    }
  } else {
    console.log("CANT DO THIS!");
  }
}
function setLegend() {
  var uniqueElements = new Set();

  activeElements.forEach((element) => {
    var clonedElement = element.cloneNode(true);
    clonedElement.removeAttribute("onclick");
    uniqueElements.add(clonedElement.outerHTML);
  });

  var uniqueElementsArray = Array.from(uniqueElements);

  let html = "";
  uniqueElementsArray.forEach((elementHTML) => {
    html += elementHTML;
  });

  document.getElementById("selectedColors").innerHTML = html;
}
async function AwaitEventsLoaded() {
  filterCategoria();
  var loadingscreen = document.getElementById("LoadingScreen");
  loadingscreen.style.display = "block";
  await waitUntilInWindow("LoadIsComplete");
  console.log("DONE!");
  loadingscreen.style.display = "none";
}

const waitUntilInWindow = (condition) => {
  return new Promise((resolve) => {
    let interval = setInterval(() => {
      if (!window[condition]) {
        return;
      }
      clearInterval(interval);
      resolve();
    }, 100);
  });
};

delay = (ms) => new Promise((res) => setTimeout(res, ms));

//Accetta una lista di eventi (timeline formatted)
async function AddEventsToTimeLine(events) {
  window.LoadIsComplete = false;

  CanClick = false;
  for (const e of events) {
    timeline.add(e);
    await delay(10);
  }
  SetColors();
  CanClick = true;
  window.LoadIsComplete = true;
}
//Accetta una lista di eventi (timeline formatted)
function RemoveEventsIdsFromTimeLine(events) {
  window.LoadIsComplete = false;
  CanClick = false;
  events.forEach((e) => {
    timeline.removeId(e.unique_id);
  });
  CanClick = true;
  window.LoadIsComplete = true;
}

function ReturnMilestone(id) {
  var target = null;
  Milestones.forEach((m) => {
    if (m.id == id) {
      target = m;
    }
  });
  return target;
}

//PER FILTRI:
function SetupPopUpFilters() {
  let currentCat = "";

  function compareByOrder(a, b) {
    const catA = a.cat[0].order.toString().split(".").map(Number);
    const catB = b.cat[0].order.toString().split(".").map(Number);

    for (let i = 0; i < Math.max(catA.length, catB.length); i++) {
      const numA = catA[i] || 0;
      const numB = catB[i] || 0;

      if (numA !== numB) {
        return numA - numB;
      }
    }

    return 0;
  }

  const sortedArray = FiltersDict_Lan_Colors.sort(compareByOrder);

  sortedArray.forEach((element) => {
    var isActive = StarterLanguages.includes(element.lan);
    var labelLanguage =
      element.lan.charAt(0).toUpperCase() + element.lan.slice(1);
    var classColorEl = isActive ? "color_El-selected" : "color_El";
    var classColorLabel = isActive ? "color_Label-selected" : "color_Label";

    // Chequear si ya existe un elemento con la misma ID antes de insertar
    if (!document.getElementById(element.lan)) {
      let elementHtml =
        `
          <div onclick="ToogleThisLanguageInTimeLine(this)"  id='` +
        element.lan +
        `' data-isactive=` +
        isActive +
        ` id="` +
        element.lan +
        `" class="FilterElement">
            <div style="background-color: ` +
        element.color +
        `" class="` +
        classColorEl +
        `"></div>
            <p  style="font-size:36px"  class="` +
        classColorLabel +
        `">` +
        labelLanguage +
        `</p>
          </div>
        `;
      var parentId;

      if (currentCat !== element.cat[0].cat) {
        parentId = GetAppropriateColumn(element.cat, true);
        currentCat = element.cat[0].cat;
        document.getElementById(parentId).innerHTML += "<br><br><br>";
      }

      parentId = GetAppropriateColumn(element.cat, false);
      document.getElementById(parentId).innerHTML += elementHtml;
    }
  });
}

function GetAppropriateColumn(cat, newCategory) {
  function fetchColumn1(jumped) {
    if (newCategory) {
      rowsColumn1++;
    }
    if (jumped == true && rowsColumn1 <= 8) {
      idParent = "FirstColumn";
      rowsColumn1++;
    } else if (jumped == true && rowsColumn1 > 9) {
      fetchColumn2(true);
    } else {
      idParent = "FirstColumn";
      rowsColumn1++;
    }
  }
  function fetchColumn2(jumped) {
    if (newCategory) {
      rowsColumn2++;
    }

    if (jumped == true && rowsColumn2 <= 8) {
      idParent = "SecondColumn";
      rowsColumn2++;
    } else if (jumped == true && rowsColumn2 >= 9) {
      fetchColumn3(true);
    } else {
      idParent = "SecondColumn";
      rowsColumn2++;
    }
  }

  function fetchColumn3(jumped) {
    if (newCategory) {
      rowsColumn3++;
    }

    if (jumped == true && rowsColumn3 <= 8) {
      idParent = "ThirdColumn";
      rowsColumn3++;
    } else if (jumped == true && rowsColumn3 >= 9) {
      fetchColumn4(true);
    } else {
      idParent = "ThirdColumn";
      rowsColumn3++;
    }
  }
  function fetchColumn4(jumped) {
    idParent = "FourthColumn";
    rowsColumn4++;
  }
  var idParent;
  let rowToSet = Math.floor(cat[0].order);
  if (rowToSet == 1 && actualRowsUsed <= MaxRowsFilter) {
    fetchColumn1();
  }
  if (rowToSet == 2 && actualRowsUsed <= MaxRowsFilter) {
    fetchColumn2();
  }
  if (rowToSet == 3 && actualRowsUsed <= MaxRowsFilter) {
    fetchColumn3();
  }
  if (rowToSet == 4 && actualRowsUsed <= MaxRowsFilter) {
    fetchColumn4();
  }
  if (rowToSet > 4 && actualRowsUsed <= MaxRowsFilter) {
    fetchColumn1(true);
  }

  return idParent;
}

function GetPopUpFilters() {
  document.getElementById("BackFromFilterBtn").style.display = "block";
  document.getElementById("PopUpFilterContainer").style.display = "block";
  document.getElementById("FilterPopUpBackground").style.display = "block";
}
function BackFromPopUpFilter() {
  setLegend();
  document.getElementById("BackFromFilterBtn").style.display = "none";
  document.getElementById("PopUpFilterContainer").style.display = "none";
  document.getElementById("FilterPopUpBackground").style.display = "none";
  applyFilters();

}

/*
    Fare i filtri con:
    timeline.removeId(id);
    timeline.add(event);

    Navigazione zoom:
    timeline.zoomIn()
    timeline.zoomOut()

    timeline.goToStart();


    TOGLIERE SE LE COSE SI METTONO MALE:
    class="tl-storyslider" display none important!
*/

function ZoomIn() {
  // timeline.zoomIn();
  console.log(timeline)
  timeline.current_id = null;
  if (timeline.current_id == null) {
    timeline.current_id = window.LastIndex;
  }
  timeline.goToNext();
  window.LastIndex = timeline.current_id;
  timeline.current_id = null;
}

function ZoomOut() {
  timeline.current_id = null;
  console.log(timeline);
  if (timeline.current_id == null) {
    timeline.current_id = window.LastIndex;
  }
  timeline.goToPrev();
  window.LastIndex = timeline.current_id;
  timeline.current_id = null;
}

//Debug:
var ListCat = [];
function GetAllCategorie() {
  Milestones.forEach((element) => {
    ListCat.push(element.categoria);
  });
  ListCat = [...new Set(ListCat)];
}

/*TIMEOUT*/
const timeForReboot = 10 * 60 * 1000; //10 minuti
function Reboot() {
  console.log("Rebooted");
  location.reload();
}

var SetTimedReboot;

function CallNextReboot() {
  SetTimedReboot = setTimeout(Reboot, timeForReboot);
}
function PreventReset() {
  clearTimeout(SetTimedReboot);
  CallNextReboot();
}

delay = (ms) => new Promise((res) => setTimeout(res, ms));
async function CheckAllImages() {
  var img = document.getElementById("CurrentImage");
  img.style.display = "block";
  for (const m of Milestones) {
    if (m.image != "") {
      await delay(100);
      img.src = "imgs/MilestonesImages/" + m.image + ".png";
    }
  }
}

function CheckAllDidas() {
  for (const m of Milestones) {
    if (m.dida != "") {
      if (typeof (m.dida != "undefined")) {
      }
    }
  }
}
function filterCategoria() {
  let filteredArray = [];
  var checkboxes = document.querySelectorAll(
    '.selectCategoria1 input[type="checkbox"], .selectCategoria2 input[type="checkbox"]'
  );
  let lingueActive = [];
  activeElements.forEach((element) => {
    lingueActive.push(element.attributes[1].value);
  });

  // Filter only the selected checkboxes
  var checkboxesSelected = Array.from(checkboxes).filter(function (checkbox) {
    return checkbox.checked;
  });

  // Get the values of the selected checkboxes and store them in a Set for unique values
  var categorieSet = new Set(
    checkboxesSelected.map(function (checkbox) {
      return checkbox.value;
    })
  );
  filteredArray.length = 0;

  MilestonesOriginal.forEach((e) => {
    categorieSet.forEach((c) => {
      lingueActive.forEach((l) => {
        // Check if the element with the same ID is already in filteredArray
        const exists = filteredArray.some((item) => item.id === e.id);
        if (e.categoria == c && l == e.lingua.toLowerCase() && !exists) {
          filteredArray.push(e);
        }
      });
    });
  });
  StarterLanguages = [...lingueActive];
  Milestones = filteredArray;

  SetUpTimeLine(false);
  currentLanguages = lingueActive;
}
var checkboxes = document.querySelectorAll(".selectCategoria1");
var checkboxes2 = document.querySelectorAll(".selectCategoria2");

function checkboxHandler(event) {
  var checkbox = event.target;

  if (checkbox.checked) {
    filterCategoria();
  } else {
    filterCategoria();
  }
}

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", checkboxHandler);
});
checkboxes2.forEach(function (checkbox) {
  checkbox.addEventListener("change", checkboxHandler);
});
function findActiveElements(add, el) {
  if (firstFilter == true) {
    StarterLanguages.forEach((element) => {
      let firstLingue = document.getElementById(element);
      activeElements.push(firstLingue);
    });
  }

  if (add) {
    activeElements.push(el);
  } else {
    const index = activeElements.indexOf(el);
    if (index !== -1) {
      activeElements.splice(index, 1);
    }
  }
  firstFilter = false;
}

// var elements = document.getElementsByClassName("FilterElement");

// activeElements = [];

// for (var i = 0; i < elements.length; i++) {
//   var isActive = elements[i].getAttribute("data-isactive");
//   if (isActive === "true") {
//     console.log(elements[i])
//     console.log(isActive)
//     activeElements.push(elements[i]);
//   }
// }
