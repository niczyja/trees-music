import { getData } from './data';

var map, infoWindow;
var dataDiv = document.getElementById("data");
dataDiv.textContent = "Loading";
var loader = setInterval(function() { dataDiv.textContent += "." }, 1000);

getData(function(data) {
    dataDiv.textContent = "Loaded " + data.trees.length + " trees. Rendering map...";
    clearInterval(loader);

    var markers = data.trees.map(function(tree) {
        let marker = new google.maps.Marker({
            position: { lat: tree.lat, lng: tree.lng },
            title: tree.id
        });
        marker.addListener('click', function() {
            infoWindow.setContent(infoWindowContent(tree));
            infoWindow.open(map, marker);
        });
        return marker;
    });

    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
    });
});

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: { lat: 52.22986, lng: 21.01175 }
    });
    infoWindow = new google.maps.InfoWindow();
}
window.initMap = initMap;

var body = document.getElementsByTagName('body')[0];
var gmaps = document.createElement('script');
gmaps.async = true;
gmaps.defer = true;
gmaps.src = 'https://maps.googleapis.com/maps/api/js?key=' + process.env.GOOGLE_MAPS_API_KEY + '&callback=initMap';
body.appendChild(gmaps);

function infoWindowContent(tree) {
    return '<div id="infoContent">' +
        '<h3>Drzewo numer ' + tree.id + '</h3>' +
        '<b>Lokalizacja:</b> ' + tree.lat + ' ' + tree.lng + '</br>' +
        '<b>Adres:</b> ' + tree.addr + '</br>' +
        '<b>Gatunek:</b> ' + tree.spc + '</br>' +
        '<b>Wysokość:</b> ' + tree.hght + '</br>' +
        '<b>Obwód:</b> ' + tree.circ + '</br>' +
        '<b>Średnica:</b> ' + tree.diam + '</br>' +
        '<b>Stan zdrowia:</b> ' + tree.hlth + '</br>' +
        '</div>';
}