var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var sqlite3 = require('sqlite3').verbose();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(jsonParser);
app.post('/', function (req, res) {

  var criteria = req.body;
  var minx,miny,maxx,maxy;
  var date_start, date_end;
  var result = []; //to store json response content
  // console.log(criteria);
  if (criteria){
    if (criteria["bbox[]"]){
        var bbox = criteria["bbox[]"];
        //minx,miny,maxx,maxy
        minx = bbox[0];
        miny = bbox[1];
        maxx = bbox[2];
        maxy = bbox[3];
    }
    if (criteria["date_taken"]){
      var dates = criteria["date_taken"].split('/');
      if (dates && dates.length > 0){
        date_start = dates[0];
        if (dates.length > 1)
          date_end = dates[1];
      }
    }
  }

  allProbes = function(callback) {
    /** compose sql command **/
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
    /** end of composing sql commands **/
    var db = new sqlite3.Database('../crawler/flickr_api/flickr.db');
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
      console.log(result);
      res.json(result);
    } else {
      res.writeHead(404);
      res.end();
    }
  });
});

var server = app.listen(Number(process.argv[2]), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
