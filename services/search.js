var http = require('http');
var url = require('url');
var sqlite3 = require('sqlite3').verbose();

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true);
  var body;
  //while reading the data
  req.on('data', function(data) {
    console.log(data);
    body += data.toString(); // convert data to string and append it to request body
  });
  //while the request is in the end
  req.on('end', function() {
      value = JSON.parse(body); // request is finished receiving data, parse it
      //init the sqlite db
      var db = new sqlite3.Database('../crawler/flickr_api/flickr.db');
      var result = [];
      var criteria = value;
      var minx,miny,maxx,maxy;
      var date_start, date_end;
      // console.log(criteria);
      if (criteria){
        // console.log(criteria.bbox);
        if (criteria.bbox){
            //minx,miny,maxx,maxy
            minx = criteria.bbox[0];
            miny = criteria.bbox[1];
            maxx = criteria.bbox[2];
            maxy = criteria.bbox[3];
        }
      }
      // var lon = parsedUrl.

      allProbes = function(callback) {
        var sql = "SELECT * FROM search_photos";
        var sql_where = "";
        var sql_params = {};
        if (minx){
          sql_where = (sql_where == "" ? " where " : sql_where + " and ") +
            " longitude >= $minx and latitude >= $miny and longitude <= $maxx and latitude <= $maxy ";
          sql_params.$minx = minx;
          sql_params.$maxx = maxx;
          sql_params.$miny = miny;
          sql_params.$maxy = maxy;
        }
        if (date_start){
          sql_where = (sql_where == "" ? " where " : sql_where + " and ") +
            " date_taken >= $date_start ";
          sql_params.$date_start = date_start;
        }
        if (date_end){
          sql_where = (sql_where == "" ? " where " : sql_where + " and ") +
            " date_taken <= $date_end ";
          sql_params.$date_end = date_end;
        }
        console.log("SELECT * FROM search_photos " + sql_where);
        console.log(sql_params);
        db.all("SELECT * FROM search_photos " + sql_where,
          sql_params,
          //{1: 120},
          function(err, all) {
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
  });

})
server.listen(Number(process.argv[2]));
