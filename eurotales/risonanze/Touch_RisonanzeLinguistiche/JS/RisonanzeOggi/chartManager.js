
var myChart;
var myChart2=null;
var myParentChart;
var myInitialChart;



const fontSize = 15;
//CUSTOMIZATIONS:

const CustomRender = (x)=>
{

  var content = '';
  //if(x.dataset.label=='DataCenter')
  //{
    const otherLangSameIndex = myChart
    //content = x.label + " " + x.value + "%";
    // content = x.label ;
     
 // }
  return content;
  //return '';
}

const CustomColor = (x)=>
{
  return 'black'
//  return x.dataset.backgroundColor[x.index];
}

const title = (tooltipItem, data) => {
    return  tooltipItem[0].label + ":  " + tooltipItem[0].parsed;
     // return 'Mio titolo'
  };
  
    const label = (tooltipItem, data) => {
     // return 'Mio label'
  };
  
    const afterLabel = (tooltipItem, data) => {
     // return 'Mio afterLabel'
  };







  function CreateChart(dataChart) {
    window.MadriIsLoaded = false;

    const Config = {
        type: 'doughnut',
        plugins: [
            {
                afterRender: function (chart, args, options) {
                    window.MadriIsLoaded = true;
                }
            }
        ],
        data: {
            datasets: [
                {
                    data: dataChart.datasets[0].data,
                    backgroundColor: dataChart.datasets[0].backgroundColor
                }
            ],
            labels: dataChart.labels
        },
        responsive: true,
        options: {
            borderWidth: 0.5,
            layout: {
                padding: {
                    left: 200,
                    right: 200,
                    top: 200,
                    bottom: 200
                }
            },
            onClick: (evt, el, chart) => {
                ManageClickFromChart(evt, el, chart);
            },
            plugins: {
                labels: {
                    render: CustomRender,
                    position: 'inside',
                    textMargin: 10,
                    fontColor: 'black',
                    fontSize: fontSize,
                    arc: false,
                    overlap: true,
                    outsidePadding: 1
                },
                legend: { display: false },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        title: title,
                        label: label,
                        afterLabel: afterLabel
                    }
                }
            }
        }
    };

    myChart = new Chart(document.getElementById('myChart'), Config);
}


function createChartLingue(dataChart){
  const Config = {
      type: 'doughnut',
      plugins: [
          {
              afterRender: function (chart, args, options) {
                  window.MadriIsLoaded = true;
              }
          }
      ],
      data: {
          datasets: [
              {
                  data: dataChart.datasets[0].data,
                  backgroundColor: dataChart.datasets[0].backgroundColor
              }
          ],
          labels: dataChart.labels
      },
      responsive: true,
      options: {
          borderWidth: 0.5,
          layout: {
              padding: {
                  left: 200,
                  right: 200,
                  top: 200,
                  bottom: 200
              }
          },
          onClick: (evt, el, chart) => {
              ManageClickFromChart(evt, el, chart);
          },
          plugins: {
              labels: {
                  render: CustomRender,
                  position: 'inside',
                  textMargin: 10,
                  fontColor: 'black',
                  fontSize: fontSize,
                  arc: false,
                  overlap: true,
                  outsidePadding: 1
              },
              legend: { display: false },
              tooltip: {
                  enabled: true,
                  callbacks: {
                      title: title,
                      label: label,
                      afterLabel: afterLabel
                  }
              }
          }
      }
  };
  myChart2 = new Chart(document.getElementById('myChart2'), Config);

}



function CreateParentChart(dataChart)
{



const Config = {
        
  type: 'doughnut',
  data: dataChart, //From logic.js
  responsive:true,
  plugins:[
    { afterRender:
      function (chart, args, options)
      {
        window.ParentIsLoaded=true;
      }
      }
     ],
  options: {
  layout: {
      padding: {
          left: 200,
          right: 200,
          top: 200,
          bottom: 200
      }},

  onClick:(evt,el,chart)=>
  {
    ManageClickFromChart(evt,el,chart);
  },

    borderWidth:0,

  plugins:
  {
  
   labels:
   {
    render: CustomRender,
    position: 'outside',
    textMargin:10, 
    fontColor:'black',
    fontSize:fontSize,
    arc: false,
    overlap: true,
    outsidePadding: 1
   },
   legend:{display:false},

    tooltip:{
      enabled: true,
      callbacks:
      {
        title: title,
        label: label,
        afterLabel: afterLabel
      }
    }
  }
},// plugins:[multiply]
afterRender: function (chart, args, options){console.log("IS LOADED")}
};


myParentChart = new Chart(
  document.getElementById('myChartParent'),
  Config);
}



function CreateInitialChart(dataChart)
{
const Config = {
        
  type: 'pie',
  data: dataChart, //From logic.js
  responsive:false,
  plugins:[
 { afterRender: function (chart, args, options){console.log("isLoadedByChart");window.InitialIsLoaded=true;}}
  ],
  options: {
  layout: {
      padding: {
          left: 70,
          right: 40,
          top: 40,
          bottom: 40
      }},

  onClick:(evt,el,chart)=>
  {
    ManageClickFromChart(evt,el,chart);
  },

    borderWidth:0,

  plugins:
  {
   labels:
   {
    render: CustomRender,
    position: 'outside',
    textMargin:10, 
    fontColor:'black',
    fontSize:30,
    arc: false,
    overlap: true,
    outsidePadding: 1
   },
   legend:{display:false},

    tooltip:{
      enabled: true,
      callbacks:
      {
        title: title,
        label: label,
        afterLabel: afterLabel
      }
    },
   }
},// plugins:[multiply]
};


myInitialChart = new Chart(
  document.getElementById('myInitialChart'),
  Config);
}