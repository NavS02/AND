function loadOggiMap() {
  const countries = {
    IT: null,
    GR: null,
    GB: null,
    PT: null,
    DE: null,
    NL: null,
    ES: null,
    FR: null,
    SE: null,
    HR: null,
    DK: null,
    IE: null,
    BE: null,
    CZ: null,
    AT: null,
    PL: null,
    CH: null,
    RO: null,
    BA: null,
    UA: null,
    TR: null,
    LT: null,
    BG: null,
    EE: null,
    FI: null,
    MD: null,
    NO: null,
    GB: null,
    XK: null,
    SK: null,
    SI: null,
    SE: null,
    HU: null,
    RS: null,
    GE: null,
    AL: null,
    AD: null,
    AM: null,
    BY: null,
    IS: null,
    LI: null,
    LU: null,
    TR: null,
    CY: null,
    RU: null,
    MK: null,
    ME: null,
    XK: null,
    KAZA: null,
    GE: null,
    AZER: null,
    AD: null,
  };

  const nationNameToSigla = {};
  for (const [sigla, nome] of Object.entries(Dict_SiglaNations)) {
    nationNameToSigla[nome.toLowerCase()] = sigla;
    countries[sigla] = [];
  }

  countries["ALTRE"] = [];

  dataOggi.forEach((d) => {
    const nationName = d.nazione_nascita?.nazioni?.toLowerCase();
    const sigla = nationNameToSigla[nationName];

    const formatted = {
      eta: d.eta,
      nazione: d.nazione_nascita?.nazioni || "ND",
      lingua_madre: d.lingua_madre?.lingua || "ND",
      linguadellaMadre: d.lingua_madre_madre?.lingua || "ND",
      linguadelPadre: d.lingua_madre_padre?.lingua || "ND",
      color: d.lingua_madre?.colore ?? null,
    };

    if (sigla && sigla in countries) {
      countries[sigla].push(formatted);
    } else {
      countries["ALTRE"].push(formatted);
    }
  });

  return countries;
}

function GetMap() {
  SetUpColorMap();
  document.getElementById("MapBox").style.display = "block";
}
function HideMap() {
  document.getElementById("MapBox").style.display = "none";
}

const SelectedColor = "#912B3D";
var GlobalClicableColor;

var LastindexPathClicked = null;
function OnClickMap(path) {
  if (window.domain == "OGGI") {
    if (path.id != null) {
      let allData = loadOggiMap();
      const NationName = Dict_SiglaNations[path.id];
      var data = allData[path.id];
      if (data != null) {
        path.style.fill = SelectedColor;
        if (NationName == "italia") {
          let chart = {};
          chart.canvas = {};
          chart.canvas.id = "mapChart";
          let evt = {};
          let el = [{ index: NationName }];

          ManageClickFromChart(evt, el, chart);
        } else {
          CreateGraphic(data);
        }
        document.getElementById("MapBox").style.display = "none";

        HideInitialChart();
        SetUISideHeader(
          "<p><b>Lingue madri dei residenti in: " +
            NationName.toUpperCase() +
            "</b></br>Set di dati totale: " +
            data.length +
            "</p>"
        );
        SetDescChartA(
          "Lingue madri dei residenti in " + NationName.toUpperCase()
        );
        SetDescChartB(null);
        window.Filter = "map";
        window.Nation = path.id;
        document.getElementById("backgroundStatic").src =
          "Images/pngs/RisonanzeOGGI2_backstatic.png";

        if (LastindexPathClicked != null) {
          ResetPrevPathColor(LastindexPathClicked);
        }
        LastindexPathClicked = path.id;
        areaSelectedFinal = null;
      }
    }
  }
  if (window.domain == "IERI") {
    areaSelectedFinal = null;

    if (path.id != null && path.id != LastindexPathClicked) {
      window.IERI_Stack = "map";
      const NationName = Dict_SiglaNations[path.id];
      var ListofRisoIeriByNation = DictNationsIeri_Set[path.id];
      if (typeof ListofRisoIeriByNation != "undefined") {
        if (ListofRisoIeriByNation != null) {
          if (ListofRisoIeriByNation.length > 0) {
            path.style.fill = colorNation[path.id] || SelectedColor;
            CreateOrUpdateListNames(ListofRisoIeriByNation);
            document.getElementById("MapBox").className = "MapMoved";
            HideWithoutDestroyMadriChart();
            HideWithoutDestroyMadriChart2();
            SetDescChartA("Nazioni d'Europa");
            SetDescChartB(
              "Personaggi storici nati in: " + NationName.toUpperCase()
            );
            var SideContent =
              `<p>Stai visualizzando un totale di <b>` +
              ListofRisoIeriByNation.length +
              ` personaggi</b><br> nati in: <b>` +
              NationName.toUpperCase() +
              `</b><p>`;
            SetUISideHeader(SideContent);
            SetInfoBottomBtns("ListFromMap");
            if (LastindexPathClicked != null) {
              ResetPrevPathColor(LastindexPathClicked);
            }
            LastindexPathClicked = path.id;
          }
          SetUISideHeader2("");
        }
      }
    } else {
    }
    areaSelectedFinal = null;
  }
}

function ResetPrevPathColor(index) {
  var allPath = document.querySelectorAll("path");
  allPath.forEach((p) => {
    if (p.id == index) {
      p.style.fill = GlobalClicableColor;
    }
  });
}

// IF SET COLORS BEFORE CLICK
// function SetUpColorMap() {
//   //For opacity of nulls
//   var ReferenceDictionary;
//   if (window.domain == "OGGI") {
//     ReferenceDictionary = DictNations_Set;
//   }
//   if (window.domain == "IERI") {
//     ReferenceDictionary = DictNationsIeri_Set;
//   }

//   let luoghiCache = localStorage.getItem("luoghiData");
//   let luoghi = JSON.parse(luoghiCache);
//   console.log(ReferenceDictionary);
//   for (let key in ReferenceDictionary) {
//     if (ReferenceDictionary.hasOwnProperty(key)) {
//       ReferenceDictionary[key].forEach((element) => {
//         luoghi.forEach((element2) => {
//           if (element2.id == element.luogo_nascita) {
//             element.nazione = element2.stato;
//           }
//         });
//       });
//     }
//   }
//   console.log(ReferenceDictionary);

//   var emptyColor = "#2b917f69";
//   var clicableColor = "#2b917fc2";

//   if (window.domain == "IERI") {
//     emptyColor = "#00000030";
//     clicableColor = "#000000bd";
//   }
//   GlobalClicableColor = clicableColor;

//   var ListPath = document.querySelectorAll("path");
//   ListPath.forEach((path) => {
//     var empty = false;
//     if (path.id != null) {
//       if (typeof ReferenceDictionary[path.id] == "undefined") {
//         empty = true;
//       } else {
//         if (ReferenceDictionary[path.id].length == 0) {
//           empty = true;
//         }
//       }
//       if (empty) {
//         path.style.fill = emptyColor;
//       } else {
//         // Apply the specific color from colorNation or fallback to the default clicable color
//         path.style.fill = colorNation[path.id] || clicableColor;
//       }
//     }
//   });
// }

function SetUpColorMap() {
  //For opacity of nulls
  var ReferenceDictionary;
  if (window.domain == "OGGI") {
    ReferenceDictionary = loadOggiMap();
  }
  if (window.domain == "IERI") {
    ReferenceDictionary = DictNationsIeri_Set;
  }

  let luoghiCache = localStorage.getItem("luoghiData");
  let luoghi = JSON.parse(luoghiCache);
  for (let key in ReferenceDictionary) {
    if (ReferenceDictionary.hasOwnProperty(key)) {
      ReferenceDictionary[key].forEach((element) => {
        luoghi.forEach((element2) => {
          if (element2.id == element.luogo_nascita) {
            element.nazione = element2.stato;
          }
        });
      });
    }
  }

  var emptyColor = "#2b917f69";
  var clicableColor = "#2b917fc2";

  if (window.domain == "IERI") {
    emptyColor = "#00000030";
    clicableColor = "#000000bd";
  }
  GlobalClicableColor = clicableColor;

  var ListPath = document.querySelectorAll("path");
  ListPath.forEach((path) => {
    var empty = false;
    if (path.id != null) {
      if (typeof ReferenceDictionary[path.id] == "undefined") {
        empty = true;
      } else {
        if (ReferenceDictionary[path.id].length == 0) {
          empty = true;
        }
      }
      if (empty) {
        path.style.fill = emptyColor;
      } else {
        path.style.fill = clicableColor;
      }
    }
  });
}

const Dict_SiglaNations = {
  IT: "italia",
  GR: "grecia",
  GB: "gran bretagna",
  PT: "portogallo",
  DE: "germania",
  NL: "paesi bassi",
  ES: "spagna",
  FR: "francia",
  SE: "svezia",
  HR: "croazia",
  DK: "danimarca",
  IE: "irlanda",
  BE: "belgio",
  CZ: "repubblica ceca",
  AT: "austria",
  PL: "polonia",
  CH: "svizzera",
  RO: "romania",
  BA: "bosnia erzegovina",
  UA: "ucraina",
  TR: "turchia",
  LT: "lituania",
  BG: "bulgaria",
  EE: "estonia",
  FI: "finlandia",
  MD: "moldavia",
  NO: "norvegia",
  GB: "regno unito",
  XK: "kosovo",
  SK: "slovacchia",
  SI: "slovenia",
  SE: "svezia",
  HU: "ungheria",
  RS: "serbia",
  GE: "georgia",
  AL: "albania",
  AD: "andorra",
  AM: "armenia",
  BY: "bielorussia",
  IS: "islanda",
  LI: "liechtenstein",
  LU: "Lussembourgo",
  TR: "turchia",
  CY: "cipro",
  RU: "russia",
  MK: "macedonia del nord",
  ME: "montenegro",
  XK: "kosovo",
  KAZA: "kazakistan",
  GE: "georgia",
  AZER: "azerbaigian",
  AD: "andorra",
};

const colorNation = {
  IT: "#912B3D",
  GR: "#912B3D",
  GB: "#912B3D",
  PT: "#912B3D",
  DE: "#912B3D",
  NL: "#912B3D",
  ES: "#912B3D",
  FR: "#912B3D",
  SE: "#912B3D",
  HR: "#912B3D",
  DK: "#912B3D",
  IE: "#912B3D",
  BE: "#912B3D",
  CZ: "#912B3D",
  AT: "#912B3D",
  PL: "#912B3D",
  CH: "#912B3D",
  RO: "#912B3D",
  BA: "#912B3D",
  UA: "#912B3D",
  TR: "#912B3D",
  LT: "#912B3D",
  BG: "#912B3D",
  EE: "#912B3D",
  FI: "#912B3D",
  MD: "#912B3D",
  NO: "#912B3D",
  GB: "#912B3D",
  XK: "#912B3D",
  SK: "#912B3D",
  SI: "#912B3D",
  SE: "#912B3D",
  HU: "#912B3D",
  RS: "#912B3D",
  GE: "#912B3D",
  AL: "#912B3D",
  AD: "#912B3D",
  AM: "#912B3D",
  BY: "#912B3D",
  IS: "#912B3D",
  LI: "#912B3D",
  LU: "#912B3D",
  TR: "#912B3D",
  CY: "#912B3D",
  RU: "#912B3D",
  MK: "#912B3D",
  ME: "#912B3D",
  XK: "#912B3D",
  KAZA: "#912B3D",
  GE: "#912B3D",
  AZER: "#912B3D",
  AD: "#912B3D",
};
