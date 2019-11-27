import pymysql.cursors

DB_INFO = ''
with open('DB_INFO.txt', 'r') as key:
    DB_INFO = [line.rstrip('\n') for line in key]

connection = pymysql.connect(host=DB_INFO[0],
                             port=int(DB_INFO[1]),
                             user=DB_INFO[2],
                             password=DB_INFO[3],
                             db=DB_INFO[4],
                             charset='utf8mb4')