"""
LeagueOfData backend using Flask and PyMySQL
"""
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import pymysql
import json
from analysis import getBestPairs, getChampionData, getBestTeamComp

app = Flask(__name__)
CORS(app)

champions_dict = {}
with open('championData.json') as json_file:
    data = json.load(json_file)
    for champ in data['data'].values():
        champions_dict[champ['key']]= {
            'name': champ['name'],
            'key': champ['key'],
            'hyperlink': '/pairs?champId={0}'.format(champ['key']),
            'imageLink': 'https://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/{0}'.format(champ['image']['full'])
        }

@app.route('/', methods=["GET"])
# @cross_origin(supports_credentials=True)
def hello():
    return "<h1>Welcome to the League of Data</h1>"

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
                'hyperLink': '/pairs?champId={0}'.format(champ['key']),
                'imageLink': 'https://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/{0}'.format(champ['image']['full']),
            })
    return jsonify(champions)

@app.route('/champion', methods=["GET"])
# @cross_origin(supports_credentials=True)
def getChampion():
    champId = request.args.get('champId')
    data = champions_dict[champId]
    return jsonify(data)

@app.route('/championData', methods=["GET"])
# @cross_origin(supports_credentials=True)
def getChampData():
    champId = request.args.get('champId')
    champData = champions_dict[champId]
    champNumbers = getChampionData(champId)
    champData['wins'] = champNumbers[0][0]
    champData['losses'] = champNumbers[0][1]
    champData['pickRate'] = champNumbers[1]
    print(champData)
    return jsonify(champData)

@app.route('/pairs', methods=["GET"])
# @cross_origin(supports_credentials=True)
def getAllPairs():
    champId = request.args.get('champId')
    bestPairs = getBestPairs(champId)
    return jsonify(bestPairs)

@app.route('/bestTeams', methods=["GET"])
# @cross_origin(supports_credentials=True)
def getBestTeams():
    bestTeams = getBestTeamComp()
    return jsonify(bestTeams)

if __name__ == '__main__':
    app.run(host='0.0.0.0', ssl_context=('cert.pem', 'key.pem'))
