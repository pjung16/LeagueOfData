import time
import requests
import pymysql.cursors

API_KEY = ''
with open('API_KEY.txt', 'r') as key:
    API_KEY = key.read().replace('\n', '')
API_KEY_PARAM = {'api_key': API_KEY}
WAIT_TIME = 1.2

summoner_ids = []
account_ids = []
all_matches = []

connection = pymysql.connect(host='127.0.0.1',
                             port=3306,
                             user='root',
                             db='LeagueOfData',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

def findPlayers():
    global summoner_ids
    global account_ids
    CHALLENGER_PLAYERS = 'https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5'
    PLAYERS_API = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/{0}'

    players = requests.get(url=CHALLENGER_PLAYERS, params=API_KEY_PARAM).json()['entries']
    for index, player in enumerate(players):
        summoner_ids.append(player['summonerId'])
        account_ids.append(requests.get(url=PLAYERS_API.format(player['summonerId']),
                                        params=API_KEY_PARAM).json()['accountId'])
        print("Finding IDs for player:", index+1, "/", len(players)) # track progress
        time.sleep(WAIT_TIME)

    return account_ids

def findPlayerMatches(account_id):
    PLAYER_MATCHES_API = 'https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/{0}'
    matches = []
    matches_data = requests.get(url=PLAYER_MATCHES_API.format(account_id),
                                params=API_KEY_PARAM).json()['matches']
    for m in matches_data:
        matches.append(m['gameId'])

    return matches

def findAllMatches():
    global all_matches
    for index, ai in enumerate(account_ids):
        player_matches = findPlayerMatches(ai)
        all_matches.extend(player_matches)
        print("Finding all match data for player:", index+1, "/", len(account_ids)) # track progress
        time.sleep(WAIT_TIME)

    all_matches = list(set(all_matches))
    return all_matches

def insertMatchData(game_id):
    global connection
    cursor = connection.cursor()
    query = 'INSERT INTO Games VALUES (%s);'
    cursor.execute(query, (game_id))
    connection.commit()
    cursor.close()

def main():
    findPlayers()
    findAllMatches()
    for m in all_matches:
        insertMatchData(m)

if __name__ == '__main__':
    main()