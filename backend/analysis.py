import pymysql.cursors
import json

def getChampionIdDict():
    champions = {}
    with open('championData.json') as json_file:
        data = json.load(json_file)
        for champ in data['data'].values():
            champions[champ['key']] = champ['name']
    return champions

def goThroughTeams(championIds, connection):
    cursor = connection.cursor()
    for champId in championIds:
        print(champId, end='\r')
        for team in [1, 2]:
            query = 'SELECT gameId, winningTeamId, champId{0}, champId{1}, champId{2}, champId{3}, champId{4} FROM GameData WHERE checked = 0 AND (champId{0} = "%s" OR champId{1}  = "%s" OR champId{2} = "%s" OR champId{3} = "%s" OR champId{4} = "%s");'.format(5 * (team - 1) + 1, 5 * (team - 1) + 2, 5 * (team - 1) + 3, 5 * (team - 1) + 4, 5 * (team - 1) + 5)
            cursor.execute(query, (champId, champId, champId, champId, champId))
            response = cursor.fetchall()
            wins = 0
            losses = 0
            for game in response:
                if game[1] == str(team * 100):
                    for teammateChamp in game[2:]:
                        updateQuery = 'UPDATE ChampionData SET {0}w = {0}w + 1 WHERE championId = "{1}";'.format(teammateChamp, champId)
                        cursor.execute(updateQuery)
                else:
                    for teammateChamp in game[2:]:
                        updateQuery = 'UPDATE ChampionData SET {0}l = {0}l + 1 WHERE championId = "{1}";'.format(teammateChamp, champId)
                        cursor.execute(updateQuery)
                updateQuery = 'UPDATE GameData SET checked = 1 WHERE checked = 0 AND gameId = %s;'
                cursor.execute(updateQuery, game[0])

def findBestPairs(champId, championIds, championIdsSorted, connection):
    cursor = connection.cursor()
    query = 'SELECT * FROM ChampionData WHERE championId = %s'
    cursor.execute(query, (champId))
    response = cursor.fetchall()[0][1:]
    winrates = []
    for i in range(0, len(response), 2):
        if response[i] + response[i + 1] == 0:
            winrates.append(None)
        elif response[i] + response[i + 1] < 10 or response[i]/(response[i] + response[i + 1]) < 0.5:
            winrates.append(None)
        else:
            winrates.append((response[i]/(response[i] + response[i + 1]), response[i] + response[i + 1], championIds[str(championIdsSorted[i // 2])]))
    print(winrates)
    for x in winrates:
        if x != None:
            print(x[2])

if __name__ == '__main__':
    DB_INFO = ''
    with open('./DATA_CONSTRUCTION/DB_INFO.txt', 'r') as key:
        DB_INFO = [line.rstrip('\n') for line in key]

    connection = pymysql.connect(host=DB_INFO[0],
                             port=int(DB_INFO[1]),
                             user=DB_INFO[2],
                             password=DB_INFO[3],
                             db=DB_INFO[4],
                             charset='utf8mb4')

    championIds = getChampionIdDict()
    championIdsSorted = []
    for x in championIds.keys():
        championIdsSorted.append(int(x))
    championIdsSorted.sort()
    try:
        goThroughTeams(championIdsSorted, connection)
        connection.commit()
        print('Finished updating pairs.')
    except:
        connection.rollback()
        print('Updating pairs has failed.')

    findBestPairs('421', championIds, championIdsSorted, connection)
    
    connection.close()

