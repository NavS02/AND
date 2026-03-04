const SingleSetRisonanzeOggi = JSON.parse(SingleSetRisonanzeOggi_String);
var SingleSetRisonanzeOggi2 = {};
var SingleSetRisonanzeOggi3 = {};
const DictNations_Set = JSON.parse(Dict_Nations_Set_String);
const colors = JSON.parse(ColorsString);
window.colors = colors;
let apiUrl2 = "https://www.directuseurotales.ambientinarratividigitali.it";
var dataEtaCount;
//ClickChart:
var evttest;
var eltest;
var chartest;
var dataFormattedTest = null;

let dataIeri = JSON.parse(localStorage.getItem("DataIeristring"));
let dataOggi = [];
let lingueFinale = JSON.parse(localStorage.getItem("languagesAPI"));
let area_geografico_linguistica = JSON.parse(localStorage.getItem("area_geo"));

fetchQueries();

async function fetchQueries() {
  const response = await fetch(
    `${apiUrl2}/items/ris_oggi/?limit=-1&fields=id,genere,eta,bazuibe_nascita,lingua_madre.*,lingua_madre_madre.*,lingua_madre_padre.*,nazione_nascita.nazioni`
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  const data = await response.json();
  dataOggi = data.data;
}

//Risonanze Oggi A: Fascia di età, mappa e setHeader
function GetOggi_A() {
  window.domain = "OGGI";
  document.getElementById("backgroundStatic").src =
    "Images/pngs/RisonanzeOGGI1_backstatic.png";
  HideAllHelperBtns();
  GetInitialChart();
  GetMap();
  var content = `<p><b>Set Totale di dati: ${dataOggi.length}</b><br>
    </p>`;
  SetUISideHeader(content);
  SetDescChartA("Fascie di età");
  SetDescChartB("");
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

  var content = `<p>Ogni colore corrisponde all’area in cui sono collocate le <span  style="z-index:99999 !important;font-weight:bold">${dataIeri.length}</span> biografie.<br> Clicca per scoprire le lingue che risuonano in ciascuna. </p><p style="font-decoration:underline;color:blue;" onclick="showPopUpLingue()">tabella delle LINGUE  --></p> `;
  // var content2 = `<p></p>`;
  var content2 = `<p></p>`;

  SetUISideHeader(content);
  SetUISideHeader2(content2);
  SetDescChartA("Lingue Madri dei personaggi storici");
  SetDescChartB("");
  HideParentChart();
  CreateGraphic(dataIeri);
  console.log('hgere');
  console.log(dataIeri);
  HideInitialChart();

  document.getElementById("BottomBtn_SX_IERI").style.display = "block";
  document.getElementById("BottomBtn_DX_IERI").style.display = "block";
}

function buildPopupHTML(objects) {
  let column1 = "";
  let column2 = "";
  let column3 = "";

  for (let i = 0; i < objects.length; i++) {
    let object = objects[i];
    let itemHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <div style="width: 30px; height: 30px; background-color: ${object.colors}; border-radius: 50%;"></div>
        <div style="padding-left: 10px;">
          <p>${object.lingua}</p>
        </div>
      </div>
    `;

    if (i % 3 === 0) {
      column1 += itemHTML;
    } else if (i % 3 === 1) {
      column2 += itemHTML;
    } else {
      column3 += itemHTML;
    }
  }

  return `
    <div style="display: flex; justify-content: center; max-height: 450px; overflow-y: auto;">
      <div style="width: 30%; margin-right: 5px;" id="col1">
        ${column1}
      </div>
      <div style="width: 30%; margin-right: 5px;" id="col2">
        ${column2}
      </div>
      <div style="width: 30%;" id="col3">
        ${column3}
      </div>
    </div>
  `;
}

function showPopUpLingue() {
  var popup = document.getElementById("popup");
  popup.style.display = "block";

  let myText = buildPopupHTML(lingueFinale);

  document.getElementById("contentPopup").innerHTML = myText;
}
function showPopUpLingueSearch() {
  var popup = document.getElementById("popupSearch");
  popup.style.display = "block";

  document.getElementById("contentPopup-search").innerHTML =
    '<input type="text" id="searchInput" placeholder="Cerca una persona..." onkeyup="filterPersone()" ' +
    'style="width: 50%; padding: 8px 12px; font-size: 14px; border: 2px solid #ccc; border-radius: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: border-color 0.3s ease, box-shadow 0.3s ease; outline: none;" ' +
    "onfocus=\"this.style.borderColor='#dbb971'; this.style.boxShadow='0 0 8px rgba(219, 185, 113, 0.7)';\" " +
    "onblur=\"this.style.borderColor='#ccc'; this.style.boxShadow='0 2px 5px rgba(0,0,0,0.1)';\" />" +
    '<div id="searchResults" style="margin-top:10px; max-height: 30vh; overflow-y: auto; border-radius: 8px; padding: 8px; box-sizing: border-box;"></div>';

  filterPersone();
}

function filterPersone() {
  var input = document.getElementById("searchInput");
  var filter = input ? input.value.toLowerCase() : "";
  var resultsContainer = document.getElementById("searchResults");

  var filtered = RisonanzeIeri.filter(function (persona) {
    return persona.titolo && persona.titolo.toLowerCase().includes(filter);
  });

  if (filtered.length === 0) {
    resultsContainer.innerHTML = "<p>Nessun risultato trovato.</p>";
    return;
  }

  var html = "<ul style='list-style:none; padding-left:0; margin:0;'>";
  filtered.forEach(function (p) {
    html +=
      "<li style='margin-bottom:6px; padding:4px 8px; border-bottom:1px solid #ddd; font-size:18px;'>" +
      "<strong class='clickable-name' onclick='OnClickFromName(\"" +
      p.id +
      "\", true)' " +
      "style='cursor:pointer; transition: color 0.3s ease;'>" +
      (p.titolo || "Senza titolo") +
      "</strong>" +
      "</li>";
  });
  html += "</ul>";

  resultsContainer.innerHTML = html;

  if (!document.getElementById("clickableNameStyle")) {
    var style = document.createElement("style");
    style.id = "clickableNameStyle";
    style.innerHTML = `
      .clickable-name:hover {
        color: #dbb971;
        text-decoration: underline;
      }
    `;
    document.head.appendChild(style);
  }
}

function closePopUp() {
  var popup = document.getElementById("popup");
  popup.style.display = "none";

  var popup2 = document.getElementById("popupSearch");
  popup2.style.display = "none";
}
function SetUISideHeader(info) {
  var HeaderSide = document.getElementById("HeaderSide");
  HeaderSide.style.display = "block";
  HeaderSide.style.zIndex = 9998;
  HeaderSide.innerHTML = info;
}
function SetUISideHeader2(info) {
  var HeaderSide = document.getElementById("HeaderSide2");
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

function ManageBackBtn() {
  if (window.domain == "OGGI") {
    if (myChart != null) {
      GetOggi_A();
    } else {
      window.parent.BackToHome();
    }
  }
  if (window.domain == "IERI") {
    var ListNameContainer = document.getElementById("ListOfNamesContainer");
    var MapBox = document.getElementById("MapBox");
    var ContainerInfoIeri = document.getElementById("ContainerInfoIeri");
    var iFrameRing = window.parent.document.getElementById(
      "FrameRisonanzeIeriRings"
    );

    //Se ho la lista di nomi attiva:
    if (ListNameContainer.style.display == "block") {
      HideWithoutDestroyListNames();
      HideMadriChart2();
      MapBox.classList.remove("MapMoved");
      LastindexPathClicked = null;
      GetIeri_A();
    }

    //Se ho un ring attivo torna indietro
    else if (ContainerInfoIeri.style.display == "block") {
      //HideStuff
      document.getElementById("TitlePersonaggioIERI").style.display = "none";
      ContainerInfoIeri.innerHTML = null;
      ContainerInfoIeri.style.display = "none";
      //Hide Frame
      CanStartRing = false;
      iFrameRing.style.display = "none";

      if (window.IERI_Stack == "chart") {
        document.getElementById("ChartContainerB2").style.display = "block";
        SetInfoBottomBtns("ListFromChart");
      }
      if (window.IERI_Stack == "map") {
        MapBox.style.display = "block";
        SetInfoBottomBtns("ListFromMap");
      }
      document.getElementById("descChartB").style.display = "block";
      document.getElementById("descChartA").style.display = "block";
      if (window.PrevSideContent != null) {
        SetUISideHeader(window.PrevSideContent);
      }
      ListNameContainer.style.display = "block";
    } else if (
      document.getElementById("ChartContainerB2").style.display == "block"
    ) {
      HideMadriChart2();
      GetIeri_A();
    } 
     else {
      CanStartRing = false;
      MapBox.classList.remove("MapMoved");
      HideMadriChart2();
      MapBox.style.display = "none";
      document.getElementById("myChart").style.display = "none";
      HideInitialChart();
      window.parent.BackToHome();
    }
  }
  if(clickedFromPopup){
      console.log(clickedFromPopup)
            CanStartRing = false;
      MapBox.classList.remove("MapMoved");
      HideMadriChart2();
      MapBox.style.display = "none";
      document.getElementById("myChart").style.display = "none";
      HideInitialChart();
      window.parent.BackToHome();
    }
}

function GetInitialChart() {
  var labels = ["11-18", "19-30", "31-50", "51-70", "over 70"];
  var ageGroups = {
    "11-18": 0,
    "19-30": 0,
    "31-50": 0,
    "51-70": 0,
    "over 70": 0,
  };

  dataOggi.forEach((person) => {
    const eta = person.eta;
    if (ageGroups.hasOwnProperty(eta)) {
      ageGroups[eta]++;
    }
  });
  dataEtaCount = ageGroups;
  var data = labels.map((label) => ageGroups[label]);
  var colors = [
    "#2b917fc7",
    "#217a7abf",
    "#385e5dd4",
    "#2f3c3cd4",
    "#75f2dab8",
  ];

  var InfoChartInitial = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors,
      },
    ],
  };

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
function dividerePerLinguaMadre(dati, percentualeMax, percentualeMin) {
  const conteggio = {};

  dati.forEach((item) => {
    const lingua = item.lingua_madre?.lingua;
    if (!lingua) return;
    conteggio[lingua] = (conteggio[lingua] || 0) + 1;
  });

  const gruppiPerConteggio = {};
  Object.entries(conteggio).forEach(([lingua, count]) => {
    if (!gruppiPerConteggio[count]) gruppiPerConteggio[count] = [];
    gruppiPerConteggio[count].push(lingua);
  });

  const conteggiOrdinati = Object.keys(gruppiPerConteggio)
    .map(Number)
    .sort((a, b) => b - a);

  const totale = dati.length;
  const sogliaMax = totale * percentualeMax;
  const sogliaMin = totale * percentualeMin;

  const categorie = { max: [], min: [], minB: [] };
  let accumulato = 0;

  for (const count of conteggiOrdinati) {
    const lingue = gruppiPerConteggio[count];

    const elementi = dati.filter((d) =>
      lingue.includes(d.lingua_madre?.lingua)
    );

    const elementiMappati = elementi.map((d) => ({
      eta: d.eta,
      nazione: d.nazione_nascita?.nazioni || "ND",
      lingua_madre: d.lingua_madre?.lingua || "ND",
      linguadellaMadre: d.lingua_madre_madre?.lingua || "ND",
      linguadelPadre: d.lingua_madre_padre?.lingua || "ND",
      color: d.lingua_madre?.colore ?? null,
    }));

    if (accumulato < sogliaMax) {
      categorie.max.push(...elementiMappati);
    } else if (accumulato < sogliaMax + sogliaMin) {
      categorie.min.push(...elementiMappati);
    } else {
      categorie.minB.push(...elementiMappati);
    }

    accumulato += elementi.length;
  }

  return categorie;
}

function ManageClickFromChart(evt, el, chart) {
  console.log(evt, el, chart);
  evttest = evt;
  eltest = el;
  chartest = chart;

  var id = chart.canvas.id;
  window.IndexClicked = el[0].index;
  console.log(window.IndexClicked);
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
        "<p style='margin-left:50%;z-index:9999'>Lingue Madri dei genitori di chi a come lingua madre: <b>" +
        lan +
        "</b><p>";
      SetDescChartB(contentDescChartB);
    } else if (id == "mapChart") {
      window.Filter = "age";
      window.Range = el[0].index;
      var set;
      var divBtn;
      //For desc and UI:
      var descChartAge = "";
      var countTotal;
      var indexHelperPie;
      var filteredData;
      HideAllHelperBtns();
      let dataOggiMap = dataOggi
        .filter(
          (item) =>
            item.nazione_nascita?.nazioni.toUpperCase() ===
            el[0].index.toUpperCase()
        )
        .map((item) => ({ ...item, eta: "all" }));

      const fasceEta = [{ key: "all", id: 6, max: 0.89, min: 0.06 }];

      fasceEta.forEach(({ key, id, max, min }) => {
        const filteredData = dataOggiMap.filter((item) => item.eta === key);

        SingleSetRisonanzeOggi3[`Risonanze${id}`] = filteredData;

        const {
          max: maxGroup,
          min: minGroup,
          minB: minBGroup,
        } = dividerePerLinguaMadre(filteredData, max, min);

        SingleSetRisonanzeOggi3[`Risonanze${id}_max`] = maxGroup;
        SingleSetRisonanzeOggi3[`Risonanze${id}_min`] = minGroup;
        SingleSetRisonanzeOggi3[`Risonanze${id}_minB`] = minBGroup;
      });
      console.log(SingleSetRisonanzeOggi3);
      console.log(dataOggi);
      set = SingleSetRisonanzeOggi3.Risonanze6_max;
      indexHelperPie = "6Max";
      divBtn = document.getElementById("btnsRiso6");
      window.Subset = 2;
      descChartAge = "";
      countTotal = SingleSetRisonanzeOggi3.Risonanze6.length;

      divBtn.style.display = "flex";

      //HelpersPieStartup
      SetHelperPieImageSource(indexHelperPie);

      SetHelperPiesInfo(set.length, countTotal);
      const currentId = el[0].index + 1;
      const tot = countTotal;

      const maxSet = SingleSetRisonanzeOggi3[`Risonanze${currentId}_max`] || [];
      const minSet = SingleSetRisonanzeOggi3[`Risonanze${currentId}_min`] || [];
      const minBSet =
        SingleSetRisonanzeOggi3[`Risonanze${currentId}_minB`] || [];

      const percMax = ((maxSet.length / tot) * 100).toFixed(1);
      const percMin = ((minSet.length / tot) * 100).toFixed(1);
      const percMinB = ((minBSet.length / tot) * 100).toFixed(1);

      const idBase = `btnsRiso${currentId}`;
      const container = document.getElementById(idBase);
      if (container) {
        const percentText = {
          max: `${percMax}%`,
          min: `${percMin}%`,
          minB: `${percMinB}%`,
        };

        ["max", "min", "minB"].forEach((cat) => {
          const imgId = `${currentId}${
            cat.charAt(0).toUpperCase() + cat.slice(1)
          }_img`;
          const textDiv = document.getElementById(imgId);
          if (
            textDiv &&
            textDiv.nextSibling &&
            textDiv.nextSibling.nodeType === 3
          ) {
            textDiv.nextSibling.nodeValue = " " + percentText[cat];
          }
        });
      }

      document.getElementById("BoxHelper").style.display = "none";

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
      var filteredData;
      HideAllHelperBtns();
      const fasceEta = [
        { key: "11-18", id: 1, max: 0.58, min: 0.42 },
        { key: "19-30", id: 2, max: 0.89, min: 0.06 },
        { key: "31-50", id: 3, max: 0.83, min: 0.17 },
        { key: "51-70", id: 4, max: 0.79, min: 0.21 },
        { key: "over 70", id: 5, max: 0.61, min: 0.39 },
      ];
      console.log(dataOggi);
      fasceEta.forEach(({ key, id, max, min }) => {
        const filteredData = dataOggi.filter((item) => item.eta === key);

        SingleSetRisonanzeOggi2[`Risonanze${id}`] = filteredData;

        const {
          max: maxGroup,
          min: minGroup,
          minB: minBGroup,
        } = dividerePerLinguaMadre(filteredData, max, min);

        SingleSetRisonanzeOggi2[`Risonanze${id}_max`] = maxGroup;
        SingleSetRisonanzeOggi2[`Risonanze${id}_min`] = minGroup;
        SingleSetRisonanzeOggi2[`Risonanze${id}_minB`] = minBGroup;
        console.log(filteredData);
      });
      if (el[0].index == 0) {
        set = SingleSetRisonanzeOggi2.Risonanze1_max;
        indexHelperPie = "1Max";
        divBtn = document.getElementById("btnsRiso1");
        window.Subset = 1;
        descChartAge = "tra 11 e 18 anni";
        countTotal = dataEtaCount["11-18"];
        filteredData = dataOggi.filter(function (item) {
          return item.eta === "11-18";
        });
      }
      if (el[0].index == 1) {
        set = SingleSetRisonanzeOggi2.Risonanze2_max;
        indexHelperPie = "2Max";
        divBtn = document.getElementById("btnsRiso2");
        window.Subset = 2;
        descChartAge = "tra 19 e 30 anni";
        countTotal = dataEtaCount["19-30"];
        filteredData = dataOggi.filter(function (item) {
          return item.eta === "19-30";
        });
      }
      if (el[0].index == 2) {
        set = SingleSetRisonanzeOggi2.Risonanze3_max;
        indexHelperPie = "3Max";
        divBtn = document.getElementById("btnsRiso3");
        window.Subset = 1;
        descChartAge = "tra 31 e 50 anni";
        countTotal = dataEtaCount["31-50"];
        filteredData = dataOggi.filter(function (item) {
          return item.eta === "31-50";
        });
      }
      if (el[0].index == 3) {
        set = SingleSetRisonanzeOggi2.Risonanze4_max;
        indexHelperPie = "4Max";
        divBtn = document.getElementById("btnsRiso4");
        window.Subset = 1;
        descChartAge = "tra 51 e 70 anni";
        countTotal = dataEtaCount["51-70"];
        filteredData = dataOggi.filter(function (item) {
          return item.eta === "51-70";
        });
      }
      if (el[0].index == 4) {
        set = SingleSetRisonanzeOggi2.Risonanze5_max;
        indexHelperPie = "5Max";
        divBtn = document.getElementById("btnsRiso5");
        window.Subset = 1;
        descChartAge = "oltre i 70 anni";
        countTotal = dataEtaCount["over 70"];
        filteredData = dataOggi.filter(function (item) {
          return item.eta === "over 70";
        });
      }
      divBtn.style.display = "flex";

      const result = filteredData.map((item) => ({
        eta: item.eta,
        nazione: item.nazione_nascita?.nazioni ?? null,
        lingua_madre: item.lingua_madre?.lingua ?? null,
        linguadellaMadre: item.lingua_madre_madre?.lingua ?? null,
        linguadelPadre: item.lingua_madre_padre?.lingua ?? null,
        color: item.lingua_madre?.colore ?? null,
      }));

      //HelpersPieStartup
      SetHelperPieImageSource(indexHelperPie);

      SetHelperPiesInfo(set.length, countTotal);
      const currentId = el[0].index + 1;
      const tot = countTotal;

      const maxSet = SingleSetRisonanzeOggi2[`Risonanze${currentId}_max`] || [];
      const minSet = SingleSetRisonanzeOggi2[`Risonanze${currentId}_min`] || [];
      const minBSet =
        SingleSetRisonanzeOggi2[`Risonanze${currentId}_minB`] || [];

      const percMax = ((maxSet.length / tot) * 100).toFixed(1);
      const percMin = ((minSet.length / tot) * 100).toFixed(1);
      const percMinB = ((minBSet.length / tot) * 100).toFixed(1);

      console.log(SingleSetRisonanzeOggi2);
      console.log();
      const idBase = `btnsRiso${currentId}`;
      const container = document.getElementById(idBase);
      if (container) {
        const percentText = {
          max: `${percMax}%`,
          min: `${percMin}%`,
          minB: `${percMinB}%`,
        };

        ["max", "min", "minB"].forEach((cat) => {
          const imgId = `${currentId}${
            cat.charAt(0).toUpperCase() + cat.slice(1)
          }_img`;
          const textDiv = document.getElementById(imgId);
          if (
            textDiv &&
            textDiv.nextSibling &&
            textDiv.nextSibling.nodeType === 3
          ) {
            textDiv.nextSibling.nodeValue = " " + percentText[cat];
          }
        });
      }

      document.getElementById("BoxHelper").style.display = "none";

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
    OnClickFromChartIERI(el, chart);
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
  document.getElementById("btnsRiso6").style.display = "none";

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
    "6MinB",
    "6Min",
    "6Max",
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
    }
  });
}
function SetHelperPiesInfo(current, tot) {
  var perc = ((current / tot) * 100).toFixed(0);
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
    set = SingleSetRisonanzeOggi2.Risonanze1_min;
    tot =
      SingleSetRisonanzeOggi2.Risonanze1_min.length +
      SingleSetRisonanzeOggi2.Risonanze1_max.length;
    window.Subset = 1;
  }
  if (indexBtn == "1max") {
    set = SingleSetRisonanzeOggi2.Risonanze1_max;
    tot =
      SingleSetRisonanzeOggi2.Risonanze1_min.length +
      SingleSetRisonanzeOggi2.Risonanze1_max.length;
    window.Subset = 2;
  }

  if (indexBtn == "2minB") {
    set = SingleSetRisonanzeOggi2.Risonanze2_minB;
    tot =
      SingleSetRisonanzeOggi2.Risonanze2_min.length +
      SingleSetRisonanzeOggi2.Risonanze2_max.length +
      SingleSetRisonanzeOggi2.Risonanze2_minB.length;
    window.Subset = 0;
  }

  if (indexBtn == "2min") {
    set = SingleSetRisonanzeOggi2.Risonanze2_min;
    tot =
      SingleSetRisonanzeOggi2.Risonanze2_min.length +
      SingleSetRisonanzeOggi2.Risonanze2_max.length +
      SingleSetRisonanzeOggi2.Risonanze2_minB.length;
    window.Subset = 1;
  }
  if (indexBtn == "2max") {
    set = SingleSetRisonanzeOggi2.Risonanze2_max;
    tot =
      SingleSetRisonanzeOggi2.Risonanze2_min.length +
      SingleSetRisonanzeOggi2.Risonanze2_max.length +
      SingleSetRisonanzeOggi2.Risonanze2_minB.length;
    window.Subset = 2;
  }

  if (indexBtn == "3min") {
    set = SingleSetRisonanzeOggi2.Risonanze3_min;
    tot =
      SingleSetRisonanzeOggi2.Risonanze3_min.length +
      SingleSetRisonanzeOggi2.Risonanze3_max.length;
    window.Subset = 0;
  }
  if (indexBtn == "3max") {
    set = SingleSetRisonanzeOggi2.Risonanze3_max;
    tot =
      SingleSetRisonanzeOggi2.Risonanze3_min.length +
      SingleSetRisonanzeOggi2.Risonanze3_max.length;
    window.Subset = 1;
  }

  if (indexBtn == "4min") {
    set = SingleSetRisonanzeOggi2.Risonanze4_min;
    tot =
      SingleSetRisonanzeOggi2.Risonanze4_min.length +
      SingleSetRisonanzeOggi2.Risonanze4_max.length;
    window.Subset = 0;
  }
  if (indexBtn == "4max") {
    set = SingleSetRisonanzeOggi2.Risonanze4_max;
    tot =
      SingleSetRisonanzeOggi2.Risonanze4_min.length +
      SingleSetRisonanzeOggi2.Risonanze4_max.length;
    window.Subset = 1;
  }

  if (indexBtn == "5min") {
    set = SingleSetRisonanzeOggi2.Risonanze5_min;
    tot =
      SingleSetRisonanzeOggi2.Risonanze5_min.length +
      SingleSetRisonanzeOggi2.Risonanze5_max.length;
    window.Subset = 0;
  }
  if (indexBtn == "5max") {
    set = SingleSetRisonanzeOggi2.Risonanze5_max;
    tot =
      SingleSetRisonanzeOggi2.Risonanze5_min.length +
      SingleSetRisonanzeOggi2.Risonanze5_max.length;
    window.Subset = 1;
  }

  if (indexBtn == "6minB") {
    set = SingleSetRisonanzeOggi3.Risonanze6_minB;
    tot =
      SingleSetRisonanzeOggi3.Risonanze6_min.length +
      SingleSetRisonanzeOggi3.Risonanze6_max.length +
      SingleSetRisonanzeOggi3.Risonanze6_minB.length;
    window.Subset = 0;
  }

  if (indexBtn == "6min") {
    set = SingleSetRisonanzeOggi3.Risonanze6_min;
    tot =
      SingleSetRisonanzeOggi3.Risonanze6_min.length +
      SingleSetRisonanzeOggi3.Risonanze6_max.length +
      SingleSetRisonanzeOggi3.Risonanze6_minB.length;
    window.Subset = 1;
  }
  if (indexBtn == "6max") {
    set = SingleSetRisonanzeOggi3.Risonanze6_max;
    tot =
      SingleSetRisonanzeOggi3.Risonanze6_min.length +
      SingleSetRisonanzeOggi3.Risonanze6_max.length +
      SingleSetRisonanzeOggi3.Risonanze6_minB.length;
    window.Subset = 2;
  }
  SetHelperPieImageSource(indexBtn);
  SetHelperPiesInfo(set.length, tot);
  // document.getElementById("BoxHelper").style.display = "block";
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
function HideMadriChart2() {
  if (myChart2 != null) {
    myChart2.destroy();
    document.getElementById("ChartContainerB2").style.display = "none";
    myChart2 = null;
  }
}
function HideWithoutDestroyMadriChart() {
  document.getElementById("ChartContainerB").style.display = "none";
}
function HideWithoutDestroyMadriChart2() {
  document.getElementById("ChartContainerB2").style.display = "none";
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
      family.lingua_madre = listfamilylanguages[0];
    } else {
      family.lingua_madre = listfamilylanguages;
    }
    family.color =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");

    FuseParents.push(family);
  });
  return FuseParents;
}

function GetSetByClickChartItem(el) {
  var index = el[0].index;
  var lan = InfoChart_Global.labels[index];
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

  localStorage.setItem("dataArea", JSON.stringify(resultChart.dataChart));
  try {
    CreateChart(resultChart.dataChart);
  } catch (error) {}
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
  const DictLan_Info = {};

  languages.forEach((lan) => {
    const set = data.filter((el) => el[param] === lan);
    const count = set.length;

    const color = set.length > 0 && set[0].color ? set[0].color : null;

    DictLan_Info[lan] = {
      languages: lan,
      lingua_madre: lan,
      set: set,
      count: count,
      color: color,
    };
  });

  return DictLan_Info;
}

function groupMbyArea(area, data, param) {
  var DictLan_Info = {};
  area.forEach((lan) => {
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
function ReturnListOfArea(data) {
  //Conto tutte le lingue:
  // area_geografico_linguistica
  var area_geografico_linguisticaA = [];
  data.forEach((element) => {
    area_geografico_linguistica.forEach((element2) => {
      if (element.area_geografico_linguistica == element2.id) {
        element.area_geografico_linguistica =
          element2.area_geografico_linguistica;
        area_geografico_linguisticaA.push(element2.area_geografico_linguistica);
      }
    });
  });
  area_geografico_linguisticaA = [...new Set(area_geografico_linguisticaA)];

  return area_geografico_linguisticaA;
}
var DictLan_Info_Global = {};
var InfoChart_Global = {};

var DictLan_Info_GlobalParent = {};
var InfoChart_GlobalParent = {};
async function GetInfoFromData(data) {
  var languages;
  var areaGeo;
  var DictLan_Info;
  //raccolgo tutte le lingue
  if (window.domain.toUpperCase() == "OGGI") {
    languages = ReturnListOfLanguages(data);
    DictLan_Info = groupMby(languages, data, "lingua_madre");
    Object.keys(DictLan_Info).forEach((lan) => {
      const set = DictLan_Info[lan].set;

      if (set.length > 0 && set[0].color) {
        DictLan_Info[lan].color = set[0].color;
      } else {
        DictLan_Info[lan].color = null;
      }
    });
  } else {
    areaGeo = ReturnListOfArea(data);
    DictLan_Info = groupMbyArea(areaGeo, data, "area_geografico_linguistica");
  }

  //Creo il data che serve al Chart:
  var labels = [];
  var dataNumbers = [];
  var colors = [];
  for (const [key, Info] of Object.entries(DictLan_Info)) {
    let myObject;
    if (
      window.domain.toUpperCase() == "OGGI" &&
      DictLan_Info[key].hasOwnProperty("lingua_madre") &&
      DictLan_Info[key].lingua_madre != null
    ) {
      myObject = DictLan_Info[key];
    } else {
      for (let index in area_geografico_linguistica) {
        if (
          area_geografico_linguistica[index].area_geografico_linguistica === key
        ) {
          myObject = area_geografico_linguistica[index];
          break;
        }
      }
    }
    if (window.domain.toUpperCase() == "IERI") {
      if (myObject && myObject.hasOwnProperty("area_geografico_linguistica")) {
        labels.push(myObject.area_geografico_linguistica);
      }
    }
    if (
      window.domain.toUpperCase() == "OGGI" &&
      DictLan_Info[key].hasOwnProperty("lingua_madre") &&
      DictLan_Info[key].lingua_madre != null
    ) {
      labels.push(myObject.lingua_madre);
      colors.push(myObject.color);
    }
    dataNumbers.push(Info.count);
    //Aggiungo info.color:
    if (Array.isArray(Info.languages)) {
      var ListmultiLingue = [];
      Info.languages.forEach((lan) => {
        ListmultiLingue.push(lan);
      });
    } else {
      Info.color = window.colors[key];
    }
    if (
      myObject &&
      myObject.hasOwnProperty("color") &&
      window.domain.toUpperCase() == "IERI"
    ) {
      colors.push(myObject.color);
      // Info.color=myObject.color
    }
  }

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
  }
  var color1 = window.colors[ListmultiLingue[0]].replace("#", "%23");
  var color2 = window.colors[ListmultiLingue[1]].replace("#", "%23");

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
  return newColor;
}
