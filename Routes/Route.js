module.exports = function Route(db, collections, fs,readline)
{ 
    console.log("collections");
    console.log(collections);
    Repository = require("../Repositories/RepositoryAbstract");

    this.routes = [];

    for (var i = 0; i < collections.length; i++) {
        collection = collections[i].name;
        console.log(collection);
        var repository = new Repository(db, collection);
        routes = [
            {
                route: "/"+collection,
                method: "get",
                callback: function(req, res, next) {
                    repository.findall(req, res, next);
                }
            },
            {
                route: "/"+collection+"/:id",
                method: "get",
                callback: function(req, res, next) {
                    repository.findOne(req, res, next);
                }
            },
            {
                route: "/"+collection,
                method: "post",
                callback: function(req, res, next) {
                    repository.create(req, res, next);
                }
            },
            {
                route: "/"+collection+"/:id",
                method: "put",
                callback: function(req, res, next) {
                    repository.edit(req, res, next);
                }
            }
        ];
        this.routes = this.routes.concat(routes);
    };
    jsClientFile = {
        route: "/classDownloader.js",
        method: "get",
        callback: function(req, res, next) {
            fs.readFile("classDownloader.js", "binary", function(err, file) {
                if(err) {        
                    res.writeHead(500, {"Content-Type": "application/javascript"});
                    res.write(err + "\n");
                    res.end();
                    return;
                }

                res.writeHead(200);
                res.write(file, "binary");
                res.end();
            });
        }
    }
    this.routes = this.routes.concat(jsClientFile);
}