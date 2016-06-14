var restify = require('restify');
var server = require('./server');
Parameters = require("./Config/parametersImporter");
var parameters = Parameters();
var client = restify.createJsonClient({
    url: 'http://localhost:'+parameters.server.port
});

// a static plants to CREATE READ UPDATE DELETE

var testPlant = {
    id: "1",
    name: "Ma plante"
};

client.post('/classes', testPlant, function (err, req, res, plants) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('Plant saved >>>>>>>');
        console.log(classes);
    }
});

client.get('/classes', function (err, req, res, products) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log("Total products " + products.length);
        console.log('All products >>>>>>>');
        console.log(products);
    }
});

testPlant.name = "New Name 6";
client.put('/classes/' + testPlant.id, testPlant, function (err, req, res, status) {
    if (err) {
        console.log("An error ocurred  on edition >>>>>>");
        console.log(err);
    } else {
        console.log('Product saved >>>>>>>');
        console.log(status);
    }
});