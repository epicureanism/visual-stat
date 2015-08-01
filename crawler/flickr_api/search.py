# encoding=utf-8
# from flickr_api.api import flickr_api
import sys
import flickr_api
import sqlite3

reload(sys)
sys.setdefaultencoding('utf-8')
a = flickr_api.auth.AuthHandler()
perms = 'read'
url = a.get_authorization_url(perms)
# print url

# a.set_verifier("afe250dd8261ed2")

# username = 'epicureanism'
# user = flickr_api.Person.findByUserName(username)

photos = flickr_api.Photo.search(
    text="protest",
    has_geo="true",
    extras="geo,url_l,date_upload,date_taken,owner_name,tags",
    page=4,
    per_page=1000)
conn = sqlite3.connect("flickr.db")
sql = '''
        create table if not exists search_photos (
        id text,
        url_l text,
        title  text,
        longitude real,
        latitude real,
        owner text,
        date_upload text,
        date_taken text,
        tags
        );
        '''
conn.execute(sql)
sql = ""
cur = conn.cursor()
for photo in photos:
    if not hasattr(photo,"url_l"):
        continue
        # print photo.url_l
    # sql = '''insert into interesting_photos
    #             (id, url_l, title, longitude, latitude)
    #             values (?, ?, ?, ?, ?);
    #             '''
    sql = '''insert into search_photos
                (id, url_l, title, longitude, latitude,date_upload,date_taken,owner,tags)
                select ?, ?, ?, ?, ?,?,?,?,?
                where ? not in (select id from interesting_photos);
                '''
    # print sql
    conn.execute(sql, (photo.id, photo.url_l, photo.title, photo.longitude, photo.latitude, photo.dateupload,photo.datetaken,photo.ownername,photo.tags,photo.id))
conn.commit()

sql = "select * from search_photos;"
cur.execute(sql)
print cur.fetchone()
# print photos
# print user
