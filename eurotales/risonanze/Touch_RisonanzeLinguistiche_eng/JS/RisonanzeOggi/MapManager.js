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
      const NationName = Dict_SiglaNations[path.id];
      var data = DictNations_Set[path.id];
      if (data != null) {
        path.style.fill = SelectedColor;
        CreateGraphic(data);
        document.getElementById("MapBox").style.display = "none";

        //var FuseParents = OrganizeParents(data);
        HideInitialChart();
        //CreateOrUpdateParentsChart(FuseParents);
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
        // document.getElementById("MapBox").className="MapMoved";
        //.classList.remove("MapMoved");
        window.Filter = "map";
        window.Nation = path.id;
        document.getElementById("backgroundStatic").src =
          "Images/pngs/RisonanzeOGGI2_backstatic.png";

        //Reset Prev:
        if (LastindexPathClicked != null) {
          ResetPrevPathColor(LastindexPathClicked);
        }
        LastindexPathClicked = path.id;
      } else {
      }
    }
  }
  if (window.domain == "IERI") {
    if (path.id != null && path.id != LastindexPathClicked) {
      window.IERI_Stack = "map";
      const NationName = Dict_SiglaNations[path.id];
      var ListofRisoIeriByNation = DictNationsIeri_Set[path.id];
      if (typeof ListofRisoIeriByNation != "undefined") {
        if (ListofRisoIeriByNation != null) {
          if (ListofRisoIeriByNation.length > 0) {
            path.style.fill = SelectedColor;
            CreateOrUpdateListNames(ListofRisoIeriByNation);
            document.getElementById("MapBox").className = "MapMoved";
            HideWithoutDestroyMadriChart();
            SetDescChartA("Nazioni d'Europa");
            SetDescChartB(
              "Personaggi storici che hanno vissuto in: " +
                NationName.toUpperCase()
            );
            var SideContent =
              `<p>Stai visualizzando un totale di <b>` +
              ListofRisoIeriByNation.length +
              ` personaggi</b><br> che hanno vissuto in: <b>` +
              NationName.toUpperCase() +
              `</b><p>`;
            SetUISideHeader(SideContent);
            SetInfoBottomBtns("ListFromMap");
            if (LastindexPathClicked != null) {
              ResetPrevPathColor(LastindexPathClicked);
            }
            LastindexPathClicked = path.id;
          }
        }
      }
    } else {
      console.log("EXCEPTIONS!");
    }
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

function SetUpColorMap() {
  //For opacity of nulls
  var ReferenceDictionary;
  if (window.domain == "OGGI") {
    ReferenceDictionary = DictNations_Set;
  }
  if (window.domain == "IERI") {
    ReferenceDictionary = DictNationsIeri_Set;
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
  NL: "olanda",
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
  BA: "ebosnia",
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
};
