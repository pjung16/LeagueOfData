import requests
import json
import time

API_KEY = ''
with open('API_KEY.txt', 'r') as key:
    API_KEY = key.read().replace('\n', '')
API_KEY_PARAM = {'api_key': API_KEY}
player_ids = []
encrypted_ids = []
account_ids = []

def findPlayers():
    CHALLENGER_PLAYERS = 'https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5'
    PLAYERS_API = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/{{0}}'

    players = request.get(url=CHALLENGER_PLAYERS, params=API_KEY).json()['entries']
    
    for player in players:
        player_ids.append(player['summonerId'])
        time.sleep(1.2)
        with urllib.request.urlopen(PLAYERS_API.format(player['summonerId'])) as url:
            encrypted_ids.append(json.loads(url.read().decode()))
        
        encrypted_ids.append(request.get(url=PLAYERS_API.format(player['summonerId']), params=API_KEY_PARAM).json())
        account_ids.append(request.get(url=PLAYERS_API.format(player['summonerId']), params=API_KEY_PARAM).json()['accountId'])

    return (player_ids, encrypted_ids, account_ids)

def findPlayerMatches():
    PLAYER_MATCHES_API = 'https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/{{0}}?api_key={0}'.format(API_KEY)
    with urllib.request.urlopen(PLAYER_MATCHES_API.format(account_ids[0])) as url:
        matches = json.loads(url.read().decode())
    
    return matches

def main():
    findPlayers()
    findMatches()

if __name__ == '__main__':
    main()