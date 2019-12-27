import { getData } from './data';

var jsonQ = require('jsonq');

let dataDiv = document.getElementById("data");
dataDiv.textContent = "Loading";
var loader = setInterval(function() { dataDiv.textContent += "." }, 1000);

getData(function(data) {
    document.getElementById("data").textContent = "Loaded " + data.trees.length + " trees";
    clearInterval(loader);
    console.log(data);
})