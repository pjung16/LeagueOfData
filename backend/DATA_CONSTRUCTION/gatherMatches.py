import urllib.request
import json
import time

API_KEY = ''
with open('API_KEY.txt', 'r') as key:
    API_KEY = key.read().replace('\n', '')
player_ids = []
encrypted_ids = []
account_ids = []

def findPlayers():
    CHALLENGER_PLAYERS = 'https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key={0}'.format(API_KEY)
    PLAYERS_API = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/{{0}}?api_key={0}'.format(API_KEY)

    with urllib.request.urlopen(CHALLENGER_PLAYERS) as url:
        players = json.loads(url.read().decode())['entries']
    
    for player in players:
        player_ids.append(player['summonerId'])
        time.sleep(1.2)
        with urllib.request.urlopen(PLAYERS_API.format(player['summonerId'])) as url:
            encrypted_ids.append(json.loads(url.read().decode()))
            account_ids.append(json.loads(url.read().decode())['accountId'])

def main():
    findPlayers()

if __name__ == '__main__':
    main()