"""
LeagueOfData backend using Flask and PyMySQL
"""
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import pymysql
import json
from analysis import getBestPairs

app = Flask(__name__)
CORS(app)

@app.route('/champions', methods=["GET"])
# @cross_origin(supports_credentials=True)
def getAllChampions():
    champions = []
    with open('championData.json') as json_file:
        data = json.load(json_file)
        for champ in data['data'].values():
            champions.append({
                'name': champ['name'],
                'key': champ['key'],
                'hyperlink': champ['name'].lower(),
                'imageLink': 'https://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/{0}'.format(champ['image']['full'])
            })
    return jsonify(champions)

@app.route('/pairs', methods=["GET"])
# @cross_origin(supports_credentials=True)
def getAllPairs():
    champId = request.args.get('champId')
    bestPairs = getBestPairs(champId)
    return jsonify(bestPairs)

if __name__ == '__main__':
    app.run()
