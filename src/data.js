
const requestURL = "https://api.um.warszawa.pl/api/action/datastore_search?resource_id=ed6217dd-c8d0-4f7b-8bed-3b7eb81a95ba";
const maxPageSize = 32000;

let offset = 0;
let data = {
    trees: [],
    total: 0
};

function requestWithUrl(url, callback) {
    let request = new XMLHttpRequest();

    request.open("GET", url);
    request.responseType = "json";
    request.send();
    request.onload = callback;
}

export const getData = (response) => {
    if (data.total < offset) {
        response(data);
        return;
    }

    let url = requestURL + "&include_total=true&distinct=true&limit=" + maxPageSize + "&offset=" + offset;
    requestWithUrl(url, function () {
        offset += maxPageSize;

        data.total = this.response.result.total;
        data.trees = data.trees.concat(this.response.result.records.map(function(record) {
            return {
                id: record.numer_inw,
                lat: record.y_wgs84,
                lng: record.x_wgs84,
                addr: record.adres + ', ' + record.dzielnica,
                spc: record.gatunek + ' (' + record.gatunek_1 + ')',
                hght: record.wysokosc,
                circ: record.pnie_obwod,
                diam: record.srednica_k,
                hlth: record.stan_zdrowia
            };
        }));

        getData(response);
    });
}
