var restify = require('restify');  //express light en gros
var mongojs = require('mongojs');
var fs = require("fs");
Parameters = require("./Config/parametersImporter");
var parameters = Parameters();
var collections = require("./collections");
console.log("first");
console.log(collections);
//création de l'objet mongojs
var db = mongojs(
    parameters.db.connectionString()
);

//création du server avec restify
var server = restify.createServer({
    // certificate:...
    // key:...
    name: parameters.server.name
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
console.log(parameters.server.port);
server.listen(parameters.server.port, function () {     //start the server
    console.log("Server started @ "+parameters.server.port);
});


// //créer les tables si elles n'existents pas encore
   
for (var i = 0; i < collections.length; i++) {
    var collection = collections[i];
    db.createCollection(collection.name, function(err, createdCollection){
        console.log("Created ");
        console.log(createdCollection);
    });
}

//initialize routes
Routes = require("./Routes/Route");
readline = require("readline");
var routes = new Routes(db, collections, fs, readline);
routes = routes.routes;

console.log("routes");

// générateur de routes
for (var i = 0; i<routes.length; i++) {
    route = routes[i];
    console.log(route);
    // déclarer les services ci dessous grace à routes
    switch(route.method) {
        case "get":
            server.get(route.route, route.callback);
        break;
        case "post":
            server.post(route.route, route.callback);
        break;
        case "put":
            server.put(route.route, route.callback);
        break;
    }
}

