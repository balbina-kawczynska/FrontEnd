let uluru, map, marker
let ws
let players = {}
let nick = '1'

function initMap() {
  uluru = {lat: -25.344, lng: 131.036};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4, 
    center: uluru,
    keyboardShortcuts: false
  });

  marker = new google.maps.Marker({
    position: uluru, 
    map: map,
    animation: google.maps.Animation.DROP
  });
}

function onWSMessage(e){
    let data=JSON.parse(e.data)

    if(!players['user' + data.id]){
        players['user' + data.id] = new google.maps.Marker({
            position: {lat: data.latitude, lng: dat.longitude}
        })
    }
    else 
    
    let wsData = {
        lat: lat,
        lng: lng,
        id: nick
    }
    marker.setPosition(position)
    ws.send(JSON.stringify(wsData))
}
function startWebSocket() {
    let url = 'ws://91.121.6.192:8010'
    ws = new WebSocket(url)
    ws.addEventListener('open', onWSOpen)
    ws.addEventListener('message', onWSMessage)
}
function onWSOpen(data) {
    console.log(data)
}

function onWSMessage(e) {
    let data=JSON.parse(e.data)
}

function getLocalization() {
    navigator.geolocation.getCurrentPosition(geoOk, geoFail)
}

function geoOk(data) {
    let coords = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
    }
    map.setCenter(coords),
    Marker.setPosition(coords)
}

function geoFail(err) {
    errconsole.log(err)
}