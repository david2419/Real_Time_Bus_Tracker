//add the token from https://account.mapbox.com, so the map can load 
mapboxgl.accessToken='pk.eyJ1IjoiZGNhbGRlcm9uMTQ2IiwiYSI6ImNrdjN6eTg1ajB2dG4ydW5ubG5menQ5NTAifQ.HIhf5yn19AnN8_8ymjAYFg';
		
// create the map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://style/mapbox/streets-v11',
    center: [-71.101,42.358],
    zoom: 15
})

//create the markers in the map, add the popup setting copied from https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/
var marker1= new mapboxgl.Marker()
.setLngLat([-71.091542,42.358862])
.setPopup(
new mapboxgl.Popup({ offset: 25 }) 
  .setHTML(
    `<h3>BUS id:1889</h3>`
  )
)
.addTo(map);

var marker2= new mapboxgl.Marker()
.setLngLat([-71.101,42.358])
.setPopup(
new mapboxgl.Popup({ offset: 25 }) 
  .setHTML(
    `<h3>BUS id:1876</h3>`
  )
)
.addTo(map);

//Choose to just track the first two buses from getBusLocations. In total they were 12 buses
//create containers to hold each location after run() is called every time
var busLive1 = [];
var busLive2 = [];

var counter = 0;

//gets location every 15 sec and save it in the containers for each bus
async function run(){
  var locations = await getBusLocations();
  //console.log(locations);
  busLive1.push([locations[0].attributes.longitude, locations[0].attributes.latitude]);
  busLive2.push([locations[1].attributes.longitude, locations[1].attributes.latitude]);
  marker1.setLngLat(busLive1[counter]);
  marker2.setLngLat(busLive2[counter]);
  counter++;
  setTimeout(run, 15000);	
}

// Request bus data from MBTA
async function getBusLocations(){
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
  const response = await fetch(url);
  const json     = await response.json();
  return json.data;	
}

  run();