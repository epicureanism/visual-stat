# visual-stat
## About this project
Try some visualize statistics open source solutions.
Implemnt these stuff while the August hackathon in GIS.FCU.

## Solutions we adopted
 - [flickr_api](https://github.com/alexis-mignon/python-flickr-api)
 - sqlite3: both in python and nodejs
 - json api based on nodejs with express/body-parser
 - vis, for timeline 

## How to use
- if u want to get the interesting photos
```
python crawler/flickr_api/geo_photos.py
```
- to get photos with specific keywords
```
python crawler/flickr_api/search.py
```
- Startup the JSON API, which the listening port can be specified as you like
```javascript
node services/express_search.js 1234
```
## The db schema
We extract the metadat of photos into the SQLite DB located at crawler/flickr_api/flickr.db.
The "interesting photos" will be stored in the table of "interesting_photo".
The photos searched by the specific keyword will be stored in the table of "search_photo".
  The schema of either table is as follows:
- id text,
- url_l text,
- title  text,
- longitude real,
- latitude real,
- owner text,
- date_upload text,
- date_taken text

## About the JSON API
- The format of criteria is like:
```javascript
{ 
  "bbox": [20,-40,60,40], //optional
  "date_taken": "2008-02-15/2009-03-14" //optional
}
```
- The "Photo" defined in JSON
```javascript
[{
  "id": "1234", 
  "url_l": "http://www.flickr.com/",
  "title": "this is a lovely photo",
  "longitude": 121.5,
  "latitude": 23.3,
  "owner": "Somebody",
  "date_taken": "2015-08-01T10:28:00+08:00",
  "tags": "tagA tagB"
}]
```
