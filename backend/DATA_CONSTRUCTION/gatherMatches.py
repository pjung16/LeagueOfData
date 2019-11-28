import time
import requests
import pymysql.cursors

API_KEY = ''
with open('API_KEY.txt', 'r') as key:
    API_KEY = key.read().replace('\n', '')
API_KEY_PARAM = {'api_key': API_KEY}
DB_INFO = ''
with open('DB_INFO.txt', 'r') as key:
    DB_INFO = [line.rstrip('\n') for line in key]
WAIT_TIME = 1.2

summoner_ids = []
account_ids = []
all_matches = []

connection = pymysql.connect(host=DB_INFO[0],
                             port=int(DB_INFO[1]),
                             user=DB_INFO[2],
                             password=DB_INFO[3],
                             db=DB_INFO[4],
                             charset='utf8mb4')

def findPlayers():
    global summoner_ids
    global account_ids
    CHALLENGER_PLAYERS = 'https://kr.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5'
    PLAYERS_API = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/{0}'

    players = requests.get(url=CHALLENGER_PLAYERS, params=API_KEY_PARAM).json()['entries']
    for index, player in enumerate(players):
        summoner_ids.append(player['summonerId'])
        account_ids.append(requests.get(url=PLAYERS_API.format(player['summonerId']),
                                        params=API_KEY_PARAM).json()['accountId'])
        print("Finding IDs for player:", index+1, "/", len(players)) # track progress
        time.sleep(WAIT_TIME)
        insertSummonerData(account_ids[index])

    return account_ids

def findPlayerMatches(account_id):
    PLAYER_MATCHES_API = 'https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/{0}'
    matches = []
    matches_data = requests.get(url=PLAYER_MATCHES_API.format(account_id),
                                params=API_KEY_PARAM).json()['matches']
    print(matches_data)
    for m in matches_data:
        matches.append(m['gameId'])

    return matches

def findAllMatches(summoners):
    global all_matches
    for index, ai in enumerate(summoners):
        player_matches = findPlayerMatches(ai)
        all_matches.extend(player_matches)
        print("Finding all match data for player:", index+1, "/", len(summoners)) # track progress
        time.sleep(WAIT_TIME)

    all_matches = list(set(all_matches))
    return all_matches

def insertGameId(game_id):
    global connection
    cursor = connection.cursor()
    query = 'INSERT INTO Games VALUES (%s);'
    cursor.execute(query, (game_id))
    connection.commit()
    cursor.close()

def insertSummonerData(summoner_id):
    global connection
    cursor = connection.cursor()
    query = 'INSERT INTO Summoners VALUES (%s);'
    cursor.execute(query, (summoner_id))
    connection.commit()
    cursor.close()

def getSummoners():
    global connection
    cursor = connection.cursor()
    query = 'SELECT id FROM Summoners;'
    cursor.execute(query)
    summoners = cursor.fetchall()
    print(summoners[0][0])
    return summoners
    
def findGameData():
    global connection
    cursor = connection.cursor()
    # inserts 1000 games starting from index 2000
    query = 'SELECT id FROM Games LIMIT 2000, 1000;'
    cursor.execute(query)
    games = cursor.fetchall()
    MATCH_API = 'https://kr.api.riotgames.com/lol/match/v4/matches/{0}'
    game_data = []
    for index, game in enumerate(games):
        try:
            data = requests.get(url=MATCH_API.format(game[0]),
                                params=API_KEY_PARAM).json()
            insertGameData(data)
        except Exception as e:
            print("API Error:", e)
        print("Inserted data for game:", index+1, "/", len(games))
        time.sleep(WAIT_TIME)
    return game_data


def insertGameData(data):
    global connection
    cursor = connection.cursor()
    query = 'INSERT INTO GameData VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);'
    winning_team_id = 0
    if (data['teams'][0]['win'] == 'Win'):
        winning_team_id = 100
    else:
        winning_team_id = 200
    try:
        cursor.execute(query, (data['gameId'],
                            winning_team_id, 
                            data['participants'][0]['championId'],
                            data['participants'][1]['championId'],
                            data['participants'][2]['championId'],
                            data['participants'][3]['championId'],
                            data['participants'][4]['championId'],
                            data['participants'][5]['championId'],
                            data['participants'][6]['championId'],
                            data['participants'][7]['championId'],
                            data['participants'][8]['championId'],
                            data['participants'][9]['championId'],
                            '0'))
        connection.commit()
    except Exception as e:
        print("Insertion Error:", e)
    cursor.close()

def main():
    # Find accountIds
    # findPlayers()

    # Find gameIds
    # summoners = getSummoners()
    # findAllMatches(summoners)
    # for m in all_matches:
    #     insertGameId(m)

    # Find data from each game using their gameIds
    findGameData()

if __name__ == '__main__':
    main()