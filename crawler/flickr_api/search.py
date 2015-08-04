# encoding=utf-8
# from flickr_api.api import flickr_api
import sys, getopt, os, locale
import flickr_api
import sqlite3

reload(sys)
sys.setdefaultencoding('utf-8')
# a = flickr_api.auth.AuthHandler()
# perms = 'read'
# url = a.get_authorization_url(perms)
# print url

# a.set_verifier("afe250dd8261ed2")

# username = 'epicureanism'
# user = flickr_api.Person.findByUserName(username)

def main(argv):
    text = "protest"
    page = 1
    pagesize = 1000
    try:
      opts, args = getopt.getopt(argv, "t:p:s:",
                                   ['text=', 'page=', 'pagesize='])
    except getopt.GetoptError:
      print 'Ex: python {0} -i input.csv '.format(argv[0])
    for opt, arg in opts:
        if opt in ('-h', '--help'):
            print 'usage: {0} '.format(argv[0])
            print '-t --text keyword to be searched '
            print '-p --page page number to be returned from flickr api'
            print '-s --pagesize the records count of each page'        
            sys.exit()
        elif opt in ("-t", '--text'):
            text = arg
        elif opt in ("-p", '--page'):
            page = arg
        elif opt in ("-s", '--pagesize'):
            pagesize = arg
            
    if not text:
      print 'please specify -t or --text for the keyword '
      sys.exit()
    do_search(text, page, pagesize)

def do_search(keyword, page=1, page_size=500, has_geo=True):
    photos = flickr_api.Photo.search(
        text=keyword,
        has_geo=has_geo,
        extras="geo,url_l,date_upload,date_taken,owner_name,tags",
        page=page,
        per_page=page_size)
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
                    where ? not in (select id from search_photos);
                    '''
        # print sql
        conn.execute(sql, (photo.id, photo.url_l, photo.title, photo.longitude, photo.latitude, photo.dateupload,photo.datetaken,photo.ownername,photo.tags,photo.id))
    conn.commit()

    sql = "select count(*) from search_photos;"
    cur.execute(sql)
    print "Got {0} records of keyword {1}, total photos count is {2} ".format(len(photos), keyword, cur.fetchone())
# print photos
# print user
if __name__ == '__main__':
    main(sys.argv[1:])