var http = require('http');
var url = require('url');
var sqlite3 = require('sqlite3').verbose();

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl);
  var db = new sqlite3.Database('../crawler/flickr_api/flickr.db');
  var result = [];

  allProbes = function(callback) {
    db.all("SELECT * FROM search_photos;", function(err, all) {
      callback(err, all);
    });
  };
  allProbes(function(err, all) {
    result = all;
    if (result) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      // res.end(result);
      res.end(JSON.stringify(result));
    } else {
      res.writeHead(404);
      res.end();
    }
  });
  // db.all("select * from search_photos;", function(err, row){
  //   // console.log(row);
  //   result.push({
  //     "id": "test"
  //   });
  // });


})
server.listen(Number(process.argv[2]));
