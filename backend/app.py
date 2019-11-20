"""
LeagueOfData backend using Flask and PyMySQL
"""
from flask import Flask
import pymysql

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello World"

if __name__ == '__main__':
    app.run()
