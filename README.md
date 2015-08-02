# visual-stat
## About this project
Try some visualize statistics open source solutions.
Implemnt these stuff while the August hackathon in GIS.FCU.

- Solutions we adopted
 - flickr_api
 - sqlite3: both in python and nodejs
 - json api inspired by [workshopper/learnyounode](https://github.com/workshopper/learnyounode/blob/master/exercises/http_json_api_server/solution/solution.js)

* How to use
```
cd crawler/flickr_api
```
  * if u want to get interesting photos

```
python geo_photos.py
```

 * to get photos with specific keywords
- The db schema
We extract the metadat of photos into the SQLite DB.
  The schema is as follows:
    * id text,
    * url_l text,
    * title  text,
    * longitude real,
    * latitude real,
    * owner text,
    * date_upload text,
    * date_taken text
  * About the json 
    * Interface
The format of criteria is like:
```javascript
{ 
  "bbox": [20,-40,60,40], //optional
  "date_taken": "2008-02-15/2009-03-14" //optional
}
```
    * The Photo in JSON
```javascript
[{
  "id": "1234", 
  "url_l": "http://www.flickr.com/",
  "title": "this is a lovely photo",
  "longitude": 121.5,
  "latitude": 23.3,
  "owner": "Somebody",
  "date_taken": "2015-08-01T10:28:00+08:00"
}]
```
