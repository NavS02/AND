//https://timeline.knightlab.com/docs/json-format.html#json-slide


var data =
`
{
    "eras":[
        {
            "start_date":
            {
                "year": 1980
            },
            "end_date":
            {
                "year": 2080
            },
            "text": 
            {
                "headline": "LA MIA ERA",
                "text": "<p>Descrizione dell'evento1</p>"
            }
        }
        
    ],
   
    "events":[
        {
            "unique_id":"00_1",
            "text": 
            {
                "headline": "LA CORAZZATA POTEMNKY",
                "text": "<p>Descrizione dell'evento1</p>"
            },
            "start_date":
            {
                "year": 1980
            },
            "background": {"color":"red"},
            "media":{"thumbnail":"logo.png"}
           
            
        },
        {
            "unique_id":"01_1",
            "text": 
            {
                "headline": "Evento2",
                "text": "<p> <img src='logo.png'/>Descrizione dell'evento2</p>"
            },
            "start_date":
            {
                "year": 2000
            }         
          
        },
        {
            "unique_id":"02_1",
            "text": 
            {
                "headline": "Evento3",
                "text": "Descrizione dell'evento3"
            },
            "start_date":
            {
                "year": 2000
            }
           
        },
        {
            "unique_id":"03_1",
            "text": 
            {
                "headline": "Evento4",
                "text": "Descrizione dell'evento4"
            },
            "start_date":
            {
                "year": 2000
            }
            
        },
        {
            "unique_id":"04_1",
            "text": 
            {
                "headline": "Evento5",
                "text": "Descrizione dell'evento5"
            },
            "start_date":
            {
                "year": 2000
            }
        }
    ]
}
`

const colors = {
        "00":"blue",
        "01":"red",
        "02":"yellow",
        "03":"hotpink",
    }    

var additionalOptions = {
    //font: 'timeline3/css/fonts/font.bitter-raleway.css'
    font:'MyCustomFont.css',
    debug: true,
    hash_bookmark: false,
    is_embed:false,
//    timenav_height:1000,
    timenav_height_percentage: 60, //70
    timenav_mobile_height_percentage:40, //50
    marker_width_min: 100,
    marker_padding: 5,  
    language:'it'
            }

    timeline = new TL.Timeline('timeline-embed',
    JSON.parse(data), 
    //'https://docs.google.com/spreadsheets/d/1cWqQBZCkX9GpzFtxCWHoqFXCHg-ylTVUWlnrdYMzKUI/pubhtml',additionalOptions
    additionalOptions);

   // timeline._onTimeNavLoaded = SetColors();
         //   SetColors();




      
    function SetColors()
    {
        var parsedData = JSON.parse(data);
        parsedData.events.forEach(event => {
            if(event.unique_id)
            {
                const id = event.unique_id+"-marker";
                const color = colors[id.substring(0, 2)];
                var el = document.getElementById(id);
                el.children[1].style["backgroundColor"]=color;
            }
        });

        const arraytest = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
        arraytest.forEach(element => {
            console.log(element)
            var event = parsedData.events[0];
            event.group = "gruppo: " + element.toString();
            event.text.headline = element.toString() + " t";
            timeline.add(event);
        });
        /*
        timeline.add(parsedData.events[0]);
        timeline.add(parsedData.events[0]);
        timeline.add(parsedData.events[0]);
        timeline.add(parsedData.events[0]);
        timeline.add(parsedData.events[0]);
        timeline.add(parsedData.events[0]);
        */
        //Fuck credits:
        document.getElementsByClassName("tl-attribution")[0].style.display="none";
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
