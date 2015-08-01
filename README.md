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

### to get photos
cd crawler/flickr_api

#### to get interesting photos
python geo_photos.py

#### to get photos with specific keywords
