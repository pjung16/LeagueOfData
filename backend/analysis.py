import pymysql.cursors
import json

DB_INFO = ''
with open('./DATA_CONSTRUCTION/DB_INFO.txt', 'r') as key:
    DB_INFO = [line.rstrip('\n') for line in key]

connection = pymysql.connect(host=DB_INFO[0],
                             port=int(DB_INFO[1]),
                             user=DB_INFO[2],
                             password=DB_INFO[3],
                             db=DB_INFO[4],
                             charset='utf8mb4')

def getChampionIdDict():
    champions = {}
    with open('championData.json') as json_file:
        data = json.load(json_file)
        for champ in data['data'].values():
            champions[champ['key']] = champ['name']
    return champions

def goThroughTeams(championIds):
    goThroughTeam1(championIds)
    # goThroughTeam2(championIds)


def goThroughTeam1(championIds):
    cursor = connection.cursor()
    # for champId in championIds:
    for champId in [1]:
        for team in [1, 2]:
            query = 'SELECT winningTeamId, champId{0}, champId{1}, champId{2}, champId{3}, champId{4} FROM GameData WHERE checked = 0 AND (champId{0} = "%s" OR champId{1}  = "%s" OR champId{2} = "%s" OR champId{3} = "%s" OR champId{4} = "%s");'.format(5 * (team - 1) + 1, 5 * (team - 1) + 2, 5 * (team - 1) + 3, 5 * (team - 1) + 4, 5 * (team - 1) + 5)
            cursor.execute(query, (champId, champId, champId, champId, champId))
            response = cursor.fetchall()
            wins = 0
            losses = 0
            for game in response:
                print(game)
                if game[0] == team * 100:
                    for teammateChamp in game[1:]:
                        print(teammateChamp)
                        updateQuery = 'UPDATE ChampionData SET {0}w = {0}w + 1 WHERE championId = "{1}";'.format(teammateChamp, champId)
                        cursor.execute(updateQuery)
                else:
                    for teammateChamp in game[1:]:
                        print(teammateChamp)
                        updateQuery = 'UPDATE ChampionData SET {0}l = {0}l + 1 WHERE championId = "{1}";'.format(teammateChamp, champId)
                        cursor.execute(updateQuery)

if __name__ == '__main__':
    championIds = getChampionIdDict()
    championIdsSorted = []
    for x in championIds.keys():
        championIdsSorted.append(int(x))
    championIdsSorted.sort()
    
    goThroughTeams(championIdsSorted)
    
    connection.commit()
    connection.close()