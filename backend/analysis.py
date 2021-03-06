import pymysql.cursors
import json
import itertools
import sys
from ast import literal_eval
import os

champions_dict = {}
with open('championData.json') as json_file:
    data = json.load(json_file)
    for champ in data['data'].values():
        champions_dict[champ['key']]= {
            'name': champ['name'],
            'key': champ['key'],
            'hyperlink': champ['name'].lower(),
            'imageLink': 'https://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/{0}'.format(champ['image']['full'])
        }

def getChampionIdDict():
    champions = {}
    with open('championData.json') as json_file:
        data = json.load(json_file)
        for champ in data['data'].values():
            champions[champ['key']] = champ['name']
    return champions

def goThroughMatches(connection):
    try:
        cursor = connection.cursor()
        query = 'SELECT * FROM GameData WHERE checked = 0;'
        cursor.execute(query)
        response = cursor.fetchall()
        count = 0
        for game in response:
            try:
                gameId = game[0]
                winner = game[1]
                team1 = game[2:7]
                team2 = game[7:12]
                # Champ id's are sorted as strings, not ints
                strTeam1 = str(sorted(team1))
                strTeam2 = str(sorted(team2))
                if winner == '100':
                    winningTeam = team1
                    strWinningTeam = strTeam1
                    losingTeam = team2
                    strLosingTeam = strTeam2
                else:
                    winningTeam = team2
                    strWinningTeam = strTeam2
                    losingTeam = team1
                    strLosingTeam = strTeam1
                
                # For champion pairs
                for base in winningTeam:
                    for teammate in winningTeam:
                        updateQuery = 'UPDATE ChampionData SET {0}w = {0}w + 1 WHERE championId = %s;'.format(teammate)
                        cursor.execute(updateQuery, (base))
                for base in losingTeam:
                    for teammate in losingTeam:
                        updateQuery = 'UPDATE ChampionData SET {0}l = {0}l + 1 WHERE championId = %s;'.format(teammate)
                        cursor.execute(updateQuery, (base))
                
                # For 5 champion teams
                for team in [(strWinningTeam, 'wins'), (strLosingTeam, 'losses')]:
                    query = 'SELECT * FROM FiveChampTeamData WHERE team = %s;'
                    cursor.execute(query, (team[0]))
                    fiveChampTeamRow = cursor.fetchall()
                    if (fiveChampTeamRow == ()):
                        updateQuery = 'INSERT INTO FiveChampTeamData (team, {0}) VALUES (%s, 1);'.format(team[1])
                        cursor.execute(updateQuery, (team[0]))
                    else:
                        updateQuery = 'UPDATE FiveChampTeamData SET {0} = {0} + 1 WHERE team = %s;'.format(team[1])
                        cursor.execute(updateQuery, (team[0]))

                # Update checked = 1 for the match that was just checked
                updateQuery = 'UPDATE GameData SET checked = 1 WHERE checked = 0 AND gameId = %s;'
                cursor.execute(updateQuery, gameId)
            except Exception as e:
                connection.rollback()
                print('Updating pairs has failed:')
                print(e)
                sys.exit(2)
            connection.commit()
            print('{0:.2f}% complete.'.format(count/len(response) * 100), end='\r')
            count += 1
        print('Finished updating pairs.')
    except Exception as e:
        connection.rollback()
        print('Updating pairs has failed:')
        print(e)
        sys.exit(2)
    connection.commit()

    # for champId in championIds:
    #     print(champId, end='\r')
    #     for team in [1, 2]:
    #         query = 'SELECT gameId, winningTeamId, champId{0}, champId{1}, champId{2}, champId{3}, champId{4} FROM GameData WHERE checked = 0 AND (champId{0} = "%s" OR champId{1}  = "%s" OR champId{2} = "%s" OR champId{3} = "%s" OR champId{4} = "%s");'.format(5 * (team - 1) + 1, 5 * (team - 1) + 2, 5 * (team - 1) + 3, 5 * (team - 1) + 4, 5 * (team - 1) + 5)
    #         cursor.execute(query, (champId, champId, champId, champId, champId))
    #         response = cursor.fetchall()
    #         for game in response:
    #             if game[1] == str(team * 100):
    #                 for teammateChamp in game[2:]:
    #                     updateQuery = 'UPDATE ChampionData SET {0}w = {0}w + 1 WHERE championId = "{1}";'.format(teammateChamp, champId)
    #                     cursor.execute(updateQuery)
    #             else:
    #                 for teammateChamp in game[2:]:
    #                     updateQuery = 'UPDATE ChampionData SET {0}l = {0}l + 1 WHERE championId = "{1}";'.format(teammateChamp, champId)
    #                     cursor.execute(updateQuery)
    #             updateQuery = 'UPDATE GameData SET checked = 1 WHERE checked = 0 AND gameId = %s;'
    
    # cursor.execute(updateQuery, game[0])

def findBestPairs(champId, championIdsSorted, connection):
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
            winrates.append((response[i]/(response[i] + response[i + 1]), response[i] + response[i + 1], championIdsSorted[i // 2], response[i], response[i + 1], champions_dict[str(championIdsSorted[i // 2])]['name']))

    return [i for i in winrates if i]

def HARD_RESET(championIdsSorted):
    try:
        cancel = input('Running this function will reset the database. Enter \'y\' to continue. Any other input will cancel the reset: ')
        if cancel != 'y':
            raise Exception('Hard reset has been cancelled')
        cursor = connection.cursor()
        query = 'DELETE FROM ChampionData'
        cursor.execute(query)
        for champId in championIdsSorted:
            query = 'INSERT INTO ChampionData (championId) VALUES (%s)'
            cursor.execute(query, (champId))
        query = 'DELETE FROM FiveChampTeamData'
        cursor.execute(query)
        query = 'UPDATE GameData SET checked = 0;'
        cursor.execute(query)
    except Exception as e:
        connection.rollback()
        print('Hard reset failed:')
        print(e)
        sys.exit(2)
    connection.commit()
    print('Hard reset successful.')

def getBestPairs(champId):
    # DB_INFO = ''
    # with open('./DATA_CONSTRUCTION/DB_INFO.txt', 'r') as key:
    #     DB_INFO = [line.rstrip('\n') for line in key]

    connection = pymysql.connect(host=os.environ.get('DB_LINK'),
                             port=int(os.environ.get('DB_PORT')),
                             user=os.environ.get('DB_USER'),
                             password=os.environ.get('DB_PW'),
                             db=os.environ.get('DB_TABLE'),
                             charset='utf8mb4')

    championIds = getChampionIdDict()
    championIdsSorted = []
    for x in championIds.keys():
        championIdsSorted.append(int(x))
    championIdsSorted.sort()

    bestPairs = findBestPairs(champId, championIdsSorted, connection)
    
    connection.close()

    return bestPairs

def getChampionData(champId):
    # DB_INFO = ''
    # with open('./DATA_CONSTRUCTION/DB_INFO.txt', 'r') as key:
    #     DB_INFO = [line.rstrip('\n') for line in key]

    connection = pymysql.connect(host=os.environ.get('DB_LINK'),
                             port=int(os.environ.get('DB_PORT')),
                             user=os.environ.get('DB_USER'),
                             password=os.environ.get('DB_PW'),
                             db=os.environ.get('DB_TABLE'),
                             charset='utf8mb4')

    cursor = connection.cursor()
    columns = [f'{champId}w', f'{champId}l']
    query = 'SELECT ' + columns[0] + ', ' + columns[1] + ' FROM ChampionData WHERE championId = %s'
    cursor.execute(query, (champId))
    stats = cursor.fetchall()[0]
    query = 'SELECT count(*) FROM Games'
    cursor.execute(query)
    numGames = cursor.fetchall()[0][0]
    pickRate = (stats[0] + stats[1])/numGames
    print([stats, pickRate])
    return [stats, pickRate]

def getBestTeamComp():
    # DB_INFO = ''
    # with open('./DATA_CONSTRUCTION/DB_INFO.txt', 'r') as key:
    #     DB_INFO = [line.rstrip('\n') for line in key]

    connection = pymysql.connect(host=os.environ.get('DB_LINK'),
                             port=int(os.environ.get('DB_PORT')),
                             user=os.environ.get('DB_USER'),
                             password=os.environ.get('DB_PW'),
                             db=os.environ.get('DB_TABLE'),
                             charset='utf8mb4')

    cursor = connection.cursor()
    query = '''SELECT team, wins, losses, ROUND(( wins/(wins+losses) * 100 ),2) AS percentage 
               FROM FiveChampTeamData 
               ORDER BY percentage DESC, wins DESC
               LIMIT 1'''
    cursor.execute(query)
    response = cursor.fetchall()[0]
    query = 'SELECT team FROM FiveChampTeamData WHERE wins = %s AND losses = %s'
    cursor.execute(query, (response[1], response[2]))
    teams = cursor.fetchall()
    bestTeams = []
    for t in teams:
        bestTeams.append(literal_eval(t[0]))
    bestTeams_dict = {
        'teams': bestTeams,
        'wins': response[1],
        'losses': response[2],
    }
    return bestTeams_dict

if __name__ == '__main__':
    # DB_INFO = ''
    # with open('./DATA_CONSTRUCTION/DB_INFO.txt', 'r') as key:
    #     DB_INFO = [line.rstrip('\n') for line in key]

    connection = pymysql.connect(host=os.environ.get('DB_LINK'),
                             port=int(os.environ.get('DB_PORT')),
                             user=os.environ.get('DB_USER'),
                             password=os.environ.get('DB_PW'),
                             db=os.environ.get('DB_TABLE'),
                             charset='utf8mb4')

    championIds = getChampionIdDict()
    championIdsSorted = []
    for x in championIds.keys():
        championIdsSorted.append(int(x))
    championIdsSorted.sort()

    # goThroughMatches(connection)

    # findBestPairs('157', championIdsSorted, connection)
    # getChampionData('1', connection)

    getBestTeamComp()
    
    connection.close()

