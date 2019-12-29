import { getData } from './data';

var jsonQ = require('jsonq');

let dataDiv = document.getElementById("data");
dataDiv.textContent = "Loading";
var loader = setInterval(function() { dataDiv.textContent += "." }, 1000);

// getData(function(data) {
//     document.getElementById("data").textContent = "Loaded " + data.trees.length + " trees";
//     clearInterval(loader);
//     console.log(data);
// });


var trees = [
  {
    "_id": 10001,
    "x_wgs84": 21.007494,
    "y_wgs84": 52.154923,
    "x_pl2000": 7500512.85006993,
    "y_pl2000": 5780136.52881119,
    "numer_inw": "D214348",
    "dzielnica": "Ursynów",
    "jednostka": "Dzielnica Ursynów",
    "miasto": "Warszawa",
    "adres": "ul. WYCZÓŁKI",
    "numer_adres": "",
    "lokalizacja": "Ulica WYCZÓŁKI",
    "gatunek": "głóg sp.",
    "gatunek_1": "Crataegus sp.",
    "data_wyk_pom": 20110715,
    "wiek_w_dni": 0,
    "wysokosc": "2",
    "pnie_obwod": "11, 5",
    "srednica_k": "2",
    "stan_zdrowia": "średni"
  },
  {
    "_id": 10002,
    "x_wgs84": 21.007413,
    "y_wgs84": 52.154942,
    "x_pl2000": 7500507.29678322,
    "y_pl2000": 5780138.6793007,
    "numer_inw": "D214349",
    "dzielnica": "Ursynów",
    "jednostka": "Dzielnica Ursynów",
    "miasto": "Warszawa",
    "adres": "ul. WYCZÓŁKI",
    "numer_adres": "",
    "lokalizacja": "Ulica WYCZÓŁKI",
    "gatunek": "głóg sp.",
    "gatunek_1": "Crataegus sp.",
    "data_wyk_pom": 20110715,
    "wiek_w_dni": 0,
    "wysokosc": "2,5",
    "pnie_obwod": "10, 9",
    "srednica_k": "1,5",
    "stan_zdrowia": "średni"
  },
  {
    "_id": 10003,
    "x_wgs84": 21.0094,
    "y_wgs84": 52.154593,
    "x_pl2000": 7500643.3186014,
    "y_pl2000": 5780099.92531469,
    "numer_inw": "D214350",
    "dzielnica": "Ursynów",
    "jednostka": "Dzielnica Ursynów",
    "miasto": "Warszawa",
    "adres": "ul. POLECZKI",
    "numer_adres": "",
    "lokalizacja": "Ulica POLECZKI",
    "gatunek": "klon pospolity",
    "gatunek_1": "Acer platanoides",
    "data_wyk_pom": 20110715,
    "wiek_w_dni": 0,
    "wysokosc": "5",
    "pnie_obwod": "13",
    "srednica_k": "1,5",
    "stan_zdrowia": "średni"
  },
  {
    "_id": 10004,
    "x_wgs84": 21.009456,
    "y_wgs84": 52.154586,
    "x_pl2000": 7500647.12727273,
    "y_pl2000": 5780099.05566434,
    "numer_inw": "D214351",
    "dzielnica": "Ursynów",
    "jednostka": "Dzielnica Ursynów",
    "miasto": "Warszawa",
    "adres": "ul. POLECZKI",
    "numer_adres": "",
    "lokalizacja": "Ulica POLECZKI",
    "gatunek": "klon pospolity",
    "gatunek_1": "Acer platanoides",
    "data_wyk_pom": 20110715,
    "wiek_w_dni": 0,
    "wysokosc": "5",
    "pnie_obwod": "12",
    "srednica_k": "2",
    "stan_zdrowia": "średni"
  },
  {
    "_id": 10005,
    "x_wgs84": 21.009658,
    "y_wgs84": 52.154554,
    "x_pl2000": 7500660.98643357,
    "y_pl2000": 5780095.57874126,
    "numer_inw": "D214352",
    "dzielnica": "Ursynów",
    "jednostka": "Dzielnica Ursynów",
    "miasto": "Warszawa",
    "adres": "ul. POLECZKI",
    "numer_adres": "",
    "lokalizacja": "Ulica POLECZKI",
    "gatunek": "klon pospolity",
    "gatunek_1": "Acer platanoides",
    "data_wyk_pom": 20110715,
    "wiek_w_dni": 0,
    "wysokosc": "5",
    "pnie_obwod": "13",
    "srednica_k": "2",
    "stan_zdrowia": "średni"
  }
];

function infoWindowContent(tree) {
    return '<div id="infoContent">' +
        '<h3>Drzewo numer ' + tree.numer_inw + '</h3>' +
        '<b>Lokalizacja:</b> ' + tree.y_wgs84 + ' ' + tree.x_wgs84 + '</br>' +
        '<b>Adres:</b> ' + tree.adres + ', ' + tree.dzielnica + '</br>' +
        '<b>Gatunek:</b> ' + tree.gatunek + ' (' + tree.gatunek_1 + ')' + '</br>' +
        '<b>Wysokość:</b> ' + tree.wysokosc + '</br>' +
        '<b>Obwód:</b> ' + tree.pnie_obwod + '</br>' +
        '<b>Średnica:</b> ' + tree.srednica_k + '</br>' +
        '<b>Stan zdrowia:</b> ' + tree.stan_zdrowia + '</br>' +
        '</div>';
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: { lat: 52.22986, lng: 21.01175 }
    });

    var infoWindow = new google.maps.InfoWindow();

    var markers = trees.map(function(tree, i) {
        let marker = new google.maps.Marker({
            position: { lat: tree.y_wgs84, lng: tree.x_wgs84 },
            title: tree.gatunek
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
}
window.initMap = initMap;

var body = document.getElementsByTagName('body')[0];
var gmaps = document.createElement('script');
gmaps.async = true;
gmaps.defer = true;
gmaps.src = 'https://maps.googleapis.com/maps/api/js?key=' + process.env.GOOGLE_MAPS_API_KEY + '&callback=initMap';
body.appendChild(gmaps);
