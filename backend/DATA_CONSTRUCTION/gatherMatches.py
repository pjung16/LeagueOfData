import requests
import json
import time

API_KEY = ''
with open('API_KEY.txt', 'r') as key:
    API_KEY = key.read().replace('\n', '')
API_KEY_PARAM = {'api_key': API_KEY}
WAIT_TIME = 1.2

summoner_ids = []
account_ids = []
all_matches = []

def findPlayers():
    CHALLENGER_PLAYERS = 'https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5'
    PLAYERS_API = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/{0}'

    players = requests.get(url=CHALLENGER_PLAYERS, params=API_KEY_PARAM).json()['entries']

    for player in players:
        summoner_ids.append(player['summonerId'])
        account_ids.append(requests.get(url=PLAYERS_API.format(player['summonerId']), params=API_KEY_PARAM).json()['accountId'])
        time.sleep(WAIT_TIME)

    return account_ids

def findPlayerMatches(account_id):
    PLAYER_MATCHES_API = 'https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/{0}'
    matches = []
    matches_data = requests.get(url=PLAYER_MATCHES_API.format(account_id), params=API_KEY_PARAM).json()['matches']
    for m in matches_data:
        matches.append(m['gameId'])
    
    return matches

def findAllMatches():
    for ai in account_ids:
        player_matches = findPlayerMatches(ai)
        all_matches.extend(player_matches)
        time.sleep(WAIT_TIME)
    
    return all_matches

def main():
    findPlayers()

if __name__ == '__main__':
    main()