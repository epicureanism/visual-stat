# visual-stat
## About this project
Try some visualize statistics open source solution.
Implemnt these stuff while the August hackathon in GIS.FCU.

## How to use
### The db schema
  id text,
  url_l text,
  title  text,
  longitude real,
  latitude real,
  owner text,
  date_upload text,
  date_taken text

### About the json 
#### Interface
The format of criteria is like:
{ 
  "bbox": [20,-40,60,40], 
  "date_taken": "2008-02-15/2009-03-14"
}

#### The Photo in JSON
[{
  "id": "1234", 
  "url_l": "http://www.flickr.com/",
  "title": "this is a lovely photo",
  "longitude": 121.5,
  "latitude": 23.3,
  "owner": "Somebody",
  "date_taken": "2015-08-01T10:28:00+08:00"
}]

### to get photos
cd crawler/flickr_api

#### to get interesting photos
python geo_photos.py

#### to get photos with specific keywords
