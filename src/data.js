
const requestURL = "https://api.um.warszawa.pl/api/action/datastore_search?resource_id=ed6217dd-c8d0-4f7b-8bed-3b7eb81a95ba";
const maxPageSize = 32000;

let offset = 0;
let data = {
    definition: [],
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

        data.definition = this.response.result.fields;
        data.total = this.response.result.total;
        data.trees = data.trees.concat(this.response.result.records);

        getData(response);
    });
}
